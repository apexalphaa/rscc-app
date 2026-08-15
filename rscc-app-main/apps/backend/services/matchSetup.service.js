import Match from "../models/Match.js";
import Team from "../models/Team.js";
import Player from "../models/Player.js";

class MatchSetupService {

    /*
    |--------------------------------------------------------------------------
    | Get Match
    |--------------------------------------------------------------------------
    */
    async getMatch(matchId) {
        const match = await Match.findById(matchId)
            .populate("teams.home")
            .populate("teams.away")
            .populate("playingXI.home")
            .populate("playingXI.away")
            .populate("captains.home")
            .populate("captains.away")
            .populate("viceCaptains.home")
            .populate("viceCaptains.away")
            .populate("wicketKeepers.home")
            .populate("wicketKeepers.away");

        if (!match) {
            throw new Error("Match not found.");
        }

        return match;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Match Details
    |--------------------------------------------------------------------------
    */
    async updateDetails(matchId, payload) {
        const match = await this.getMatch(matchId);

        match.details = {
            ...match.details,
            ...payload,
        };

        await match.save();
        return match;
    }

    /*
    |--------------------------------------------------------------------------
    | Assign Teams
    |--------------------------------------------------------------------------
    */
    async assignTeams(matchId, home, away) {
        if (String(home) === String(away)) {
            throw new Error("Home and Away team cannot be the same.");
        }

        const homeTeam = await Team.findById(home);
        const awayTeam = await Team.findById(away);

        if (!homeTeam) throw new Error("Home team not found.");
        if (!awayTeam) throw new Error("Away team not found.");

        const match = await this.getMatch(matchId);

        match.teams.home = home;
        match.teams.away = away;

        // Directly assign rather than spreading to retain Mongoose Array casting
        match.squad.home = homeTeam.players;
        match.squad.away = awayTeam.players;

        match.setupProgress = Math.max(match.setupProgress, 20);

        await match.save();
        return this.getMatch(matchId);
    }

    /*
    |--------------------------------------------------------------------------
    | Get Squad
    |--------------------------------------------------------------------------
    */
    async getSquad(matchId) {
        const match = await this.getMatch(matchId);
        return {
            home: match.squad.home,
            away: match.squad.away,
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Update Squad
    |--------------------------------------------------------------------------
    */
    async updateSquad(matchId, homeSquad, awaySquad) {
        const match = await this.getMatch(matchId);

        if (homeSquad.length < 11 || awaySquad.length < 11) {
            throw new Error("Minimum 11 players required.");
        }

        match.squad.home = homeSquad;
        match.squad.away = awaySquad;

        match.setupProgress = Math.max(match.setupProgress, 35);

        await match.save();
        return this.getMatch(matchId);
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Playing XI
    |--------------------------------------------------------------------------
    */
    validatePlayingXI(players) {
        if (!Array.isArray(players)) {
            throw new Error("Playing XI must be an array.");
        }

        if (players.length !== 11) {
            throw new Error("Playing XI must contain exactly 11 players.");
        }

        const unique = new Set(players.map(p => String(p._id || p)));

        if (unique.size !== 11) {
            throw new Error("Duplicate players found in Playing XI.");
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Assign Playing XI
    |--------------------------------------------------------------------------
    */
    async assignPlayingXI(matchId, homeXI, awayXI) {
        this.validatePlayingXI(homeXI);
        this.validatePlayingXI(awayXI);

        const match = await this.getMatch(matchId);

        const homeSquad = match.squad.home.map(p => String(p._id || p));
        const awaySquad = match.squad.away.map(p => String(p._id || p));

        homeXI.forEach(player => {
            const playerIdStr = String(player._id || player);
            if (!homeSquad.includes(playerIdStr)) {
                throw new Error("Invalid Home Playing XI player detected.");
            }
        });

        awayXI.forEach(player => {
            const playerIdStr = String(player._id || player);
            if (!awaySquad.includes(playerIdStr)) {
                throw new Error("Invalid Away Playing XI player detected.");
            }
        });

        match.playingXI.home = homeXI;
        match.playingXI.away = awayXI;

        match.setupProgress = Math.max(match.setupProgress, 55);

        await match.save();
        return this.getMatch(matchId);
    }

    /*
    |--------------------------------------------------------------------------
    | Leadership
    |--------------------------------------------------------------------------
    */
    async assignLeadership(matchId, data) {
        const {
            homeCaptain,
            awayCaptain,
            homeViceCaptain,
            awayViceCaptain,
            homeKeeper,
            awayKeeper,
        } = data;

        const match = await this.getMatch(matchId);

        const homeXI = match.playingXI.home.map(p => String(p._id || p));
        const awayXI = match.playingXI.away.map(p => String(p._id || p));

        const validate = (player, xiArray, role) => {
            const idStr = String(player?._id || player);
            if (!xiArray.includes(idStr)) {
                throw new Error(`${role} must belong to the Playing XI.`);
            }
        };

        validate(homeCaptain, homeXI, "Home Captain");
        validate(awayCaptain, awayXI, "Away Captain");
        validate(homeViceCaptain, homeXI, "Home Vice Captain");
        validate(awayViceCaptain, awayXI, "Away Vice Captain");
        validate(homeKeeper, homeXI, "Home Wicket Keeper");
        validate(awayKeeper, awayXI, "Away Wicket Keeper");

        match.captains.home = homeCaptain;
        match.captains.away = awayCaptain;
        match.viceCaptains.home = homeViceCaptain;
        match.viceCaptains.away = awayViceCaptain;
        match.wicketKeepers.home = homeKeeper;
        match.wicketKeepers.away = awayKeeper;

        match.setupProgress = Math.max(match.setupProgress, 70);

        await match.save();
        return this.getMatch(matchId);
    }

    /*
    |--------------------------------------------------------------------------
    | Toss
    |--------------------------------------------------------------------------
    */
    async recordToss(matchId, winner, decision) {
        const match = await this.getMatch(matchId);

        // Safeguard populated vs unpopulated documents securely
        const home = String(match.teams.home?._id || match.teams.home);
        const away = String(match.teams.away?._id || match.teams.away);
        const winnerStr = String(winner?._id || winner);

        if (winnerStr !== home && winnerStr !== away) {
            throw new Error("Invalid toss winner.");
        }

        if (!["bat", "bowl"].includes(decision)) {
            throw new Error("Invalid toss decision.");
        }

        match.toss.completed = true;
        match.toss.winner = winner;
        match.toss.decision = decision;

        match.setupProgress = Math.max(match.setupProgress, 80);

        await match.save();
        return this.getMatch(matchId);
    }

    /*
    |--------------------------------------------------------------------------
    | Opening Players
    |--------------------------------------------------------------------------
    */
    async assignOpeningPlayers(matchId, data) {
        const { striker, nonStriker, bowler } = data;
        const match = await this.getMatch(matchId);

        if (!match.toss.completed) {
            throw new Error("Complete toss before selecting opening players.");
        }

        if (String(striker) === String(nonStriker)) {
            throw new Error("Striker and Non-Striker cannot be the same player.");
        }

        const tossWinner = String(match.toss.winner?._id || match.toss.winner);
        const homeId = String(match.teams.home?._id || match.teams.home);

        const battingHome =
            (tossWinner === homeId && match.toss.decision === "bat") ||
            (tossWinner !== homeId && match.toss.decision === "bowl");

        const battingXI = battingHome
            ? match.playingXI.home.map(p => String(p._id || p))
            : match.playingXI.away.map(p => String(p._id || p));

        const bowlingXI = battingHome
            ? match.playingXI.away.map(p => String(p._id || p))
            : match.playingXI.home.map(p => String(p._id || p));

        if (!battingXI.includes(String(striker))) throw new Error("Invalid striker.");
        if (!battingXI.includes(String(nonStriker))) throw new Error("Invalid non-striker.");
        if (!bowlingXI.includes(String(bowler))) throw new Error("Opening bowler must belong to bowling side.");

        match.openingPlayers = { striker, nonStriker, bowler };
        match.setupProgress = Math.max(match.setupProgress, 90);

        await match.save();
        return this.getMatch(matchId);
    }

    /*
    |--------------------------------------------------------------------------
    | Match Officials
    |--------------------------------------------------------------------------
    */
    async assignOfficials(matchId, officials) {
        const match = await this.getMatch(matchId);

        match.officials = {
            ...match.officials,
            ...officials,
        };

        match.setupProgress = Math.max(match.setupProgress, 95);

        await match.save();
        return this.getMatch(matchId);
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Complete Setup
    |--------------------------------------------------------------------------
    */
    validateSetup(match) {
        if (!match.teams.home) throw new Error("Home team missing.");
        if (!match.teams.away) throw new Error("Away team missing.");
        if (match.playingXI.home.length !== 11) throw new Error("Home Playing XI incomplete.");
        if (match.playingXI.away.length !== 11) throw new Error("Away Playing XI incomplete.");
        if (!match.captains.home) throw new Error("Home captain missing.");
        if (!match.captains.away) throw new Error("Away captain missing.");
        if (!match.wicketKeepers.home) throw new Error("Home wicket keeper missing.");
        if (!match.wicketKeepers.away) throw new Error("Away wicket keeper missing.");
        if (!match.toss.completed) throw new Error("Toss not completed.");
        if (!match.openingPlayers.striker || !match.openingPlayers.nonStriker) {
            throw new Error("Opening batsmen not selected.");
        }
        if (!match.openingPlayers.bowler) throw new Error("Opening bowler not selected.");
    }

    /*
    |--------------------------------------------------------------------------
    | Complete Setup
    |--------------------------------------------------------------------------
    */
    async completeSetup(matchId) {
        const match = await this.getMatch(matchId);

        this.validateSetup(match);

        match.setupProgress = 100;
        match.isSetupComplete = true;
        match.status = "Ready";

        await match.save();
        return this.getMatch(matchId);
    }

    /*
    |--------------------------------------------------------------------------
    | Reset Setup
    |--------------------------------------------------------------------------
    */
    async resetSetup(matchId) {
        const match = await this.getMatch(matchId);

        if (match.isScoringStarted) {
            throw new Error("Cannot reset after scoring has started.");
        }

        match.playingXI = { home: [], away: [] };
        match.captains = {};
        match.viceCaptains = {};
        match.wicketKeepers = {};
        match.openingPlayers = {};
        match.toss = {
            completed: false,
            winner: null,
            decision: "",
        };

        match.setupProgress = 20;
        match.isSetupComplete = false;
        match.status = "Draft";

        await match.save();
        return this.getMatch(matchId);
    }

    /*
    |--------------------------------------------------------------------------
    | Setup Status
    |--------------------------------------------------------------------------
    */
    async getSetupStatus(matchId) {
        const match = await this.getMatch(matchId);

        return {
            progress: match.setupProgress,
            completed: match.isSetupComplete,
            status: match.status,
            tossCompleted: match.toss.completed,
            homeXI: match.playingXI.home.length,
            awayXI: match.playingXI.away.length,
        };
    }
}

export default new MatchSetupService();
