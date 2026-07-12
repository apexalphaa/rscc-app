import Innings from "../models/Innings.js";
import Match from "../models/Match.js";

class InningsService {

    /*
    |--------------------------------------------------------------------------
    | Get Innings
    |--------------------------------------------------------------------------
    */
    async getInnings(id) {
        const innings = await Innings.findById(id)
            .populate("battingTeam")
            .populate("bowlingTeam")
            .populate("striker")
            .populate("nonStriker")
            .populate("currentBowler");

        if (!innings) {
            throw new Error("Innings not found.");
        }

        return innings;
    }

    /*
    |--------------------------------------------------------------------------
    | Create First Innings
    |--------------------------------------------------------------------------
    */
    async createFirstInnings(matchId) {
        const match = await Match.findById(matchId)
            .populate("teams.home")
            .populate("teams.away");

        if (!match) {
            throw new Error("Match not found.");
        }

        if (!match.isSetupComplete) {
            throw new Error("Complete match setup first.");
        }

        if (match.currentInnings) {
            throw new Error("Innings already created.");
        }

        const tossWinner = String(match.toss.winner._id || match.toss.winner);
        const home = String(match.teams.home._id || match.teams.home);

        let battingTeam;
        let bowlingTeam;

        if (tossWinner === home) {
            if (match.toss.decision === "bat") {
                battingTeam = match.teams.home;
                bowlingTeam = match.teams.away;
            } else {
                battingTeam = match.teams.away;
                bowlingTeam = match.teams.home;
            }
        } else {
            if (match.toss.decision === "bat") {
                battingTeam = match.teams.away;
                bowlingTeam = match.teams.home;
            } else {
                battingTeam = match.teams.home;
                bowlingTeam = match.teams.away;
            }
        }

        const battingXI = String(battingTeam._id || battingTeam) === home
            ? match.playingXI.home
            : match.playingXI.away;

        const innings = await Innings.create({
            match: match._id,
            inningsNumber: 1,
            battingTeam: battingTeam._id || battingTeam,
            bowlingTeam: bowlingTeam._id || bowlingTeam,
            striker: match.openingPlayers.striker,
            nonStriker: match.openingPlayers.nonStriker,
            currentBowler: match.openingPlayers.bowler,
            battingOrder: battingXI,
            yetToBat: battingXI.filter(
                player =>
                    String(player) !== String(match.openingPlayers.striker) &&
                    String(player) !== String(match.openingPlayers.nonStriker)
            ),
            bowlersUsed: [match.openingPlayers.bowler],
            status: "Live",
        });

        match.currentInnings = innings._id;
        match.innings.push(innings._id);
        match.status = "Live";
        match.isScoringStarted = true;

        await match.save();

        return this.getInnings(innings._id);
    }

    /*
    |--------------------------------------------------------------------------
    | Get Current Innings
    |--------------------------------------------------------------------------
    */
    async getCurrentInnings(matchId) {
        const match = await Match.findById(matchId);

        if (!match) {
            throw new Error("Match not found.");
        }

        if (!match.currentInnings) {
            throw new Error("No active innings.");
        }

        return this.getInnings(match.currentInnings);
    }

    /*
    |--------------------------------------------------------------------------
    | End Current Innings
    |--------------------------------------------------------------------------
    */
    async endCurrentInnings(matchId) {
        const match = await Match.findById(matchId);

        if (!match) {
            throw new Error("Match not found.");
        }

        if (!match.currentInnings) {
            throw new Error("No active innings.");
        }

        const innings = await Innings.findById(match.currentInnings);
        innings.status = "Completed";
        innings.completedAt = new Date();

        await innings.save();
        return innings;
    }

    /*
    |--------------------------------------------------------------------------
    | Create Second Innings
    |--------------------------------------------------------------------------
    */
    async createSecondInnings(matchId) {
        const match = await Match.findById(matchId);

        if (!match) {
            throw new Error("Match not found.");
        }

        if (!match.currentInnings) {
            throw new Error("First innings not found.");
        }

        const first = await Innings.findById(match.currentInnings);

        if (first.status !== "Completed") {
            throw new Error("First innings must be completed.");
        }

        let battingTeam;
        let bowlingTeam;
        let battingXI;

        const firstBattingTeamId = String(first.battingTeam._id || first.battingTeam);
        const matchHomeTeamId = String(match.teams.home._id || match.teams.home);

        if (firstBattingTeamId === matchHomeTeamId) {
            battingTeam = match.teams.away;
            bowlingTeam = match.teams.home;
            battingXI = match.playingXI.away;
        } else {
            battingTeam = match.teams.home;
            bowlingTeam = match.teams.away;
            battingXI = match.playingXI.home;
        }

        const striker = battingXI[0];
        const nonStriker = battingXI[1];

        const bowlingTeamId = String(bowlingTeam._id || bowlingTeam);
        const bowlingXI = bowlingTeamId === matchHomeTeamId
            ? match.playingXI.home
            : match.playingXI.away;

        const bowler = bowlingXI[0];

        const totalOvers = match.details.overs;

        const innings = await Innings.create({
            match: match._id,
            inningsNumber: 2,
            battingTeam: battingTeam._id || battingTeam,
            bowlingTeam: bowlingTeam._id || bowlingTeam,
            striker,
            nonStriker,
            currentBowler: bowler,
            battingOrder: battingXI,
            yetToBat: battingXI.slice(2),
            bowlersUsed: [bowler],
            target: first.score.runs + 1,
            requiredRuns: first.score.runs + 1,
            remainingBalls: totalOvers * 6,
            currentRunRate: 0,
            requiredRunRate: ((first.score.runs + 1) / totalOvers).toFixed(2),
            status: "Live",
        });

        match.currentInnings = innings._id;
        match.innings.push(innings._id);

        await match.save();

        return this.getInnings(innings._id);
    }

    /*
    |--------------------------------------------------------------------------
    | Switch Strike
    |--------------------------------------------------------------------------
    */
    async switchStrike(inningsId) {
        const innings = await Innings.findById(inningsId);

        if (!innings) {
            throw new Error("Innings not found.");
        }

        const oldStriker = innings.striker;
        innings.striker = innings.nonStriker;
        innings.nonStriker = oldStriker;

        await innings.save();
        return innings;
    }

    /*
    |--------------------------------------------------------------------------
    | Change Bowler
    |--------------------------------------------------------------------------
    */
    async changeBowler(inningsId, bowler) {
        const innings = await Innings.findById(inningsId);

        if (!innings) {
            throw new Error("Innings not found.");
        }

        innings.currentBowler = bowler;

        const bowlerStr = String(bowler._id || bowler);
        const hasBowled = innings.bowlersUsed.some(id => String(id) === bowlerStr);

        if (!hasBowled) {
            innings.bowlersUsed.push(bowler);
        }

        await innings.save();
        return innings;
    }

    /*
    |--------------------------------------------------------------------------
    | Current Run Rate
    |--------------------------------------------------------------------------
    */
    calculateRunRate(innings) {
        const balls = innings.score.balls;
        if (balls === 0) return 0;

        return Number((innings.score.runs / (balls / 6)).toFixed(2));
    }

    /*
    |--------------------------------------------------------------------------
    | Required Run Rate
    |--------------------------------------------------------------------------
    */
    calculateRequiredRunRate(innings) {
        if (!innings.target || innings.target === 0) return 0;

        const remainingRuns = innings.target - innings.score.runs;
        if (innings.remainingBalls <= 0) return 0;

        return Number((remainingRuns / (innings.remainingBalls / 6)).toFixed(2));
    }

    /*
    |--------------------------------------------------------------------------
    | Refresh Match Metrics
    |--------------------------------------------------------------------------
    */
    async refreshMetrics(inningsId) {
        const innings = await Innings.findById(inningsId);

        if (!innings) {
            throw new Error("Innings not found.");
        }

        innings.currentRunRate = this.calculateRunRate(innings);
        innings.requiredRunRate = this.calculateRequiredRunRate(innings);

        await innings.save();
        return innings;
    }

    /*
    |--------------------------------------------------------------------------
    | Check Innings End
    |--------------------------------------------------------------------------
    */
    async checkInningsEnd(matchId) {
        const match = await Match.findById(matchId);
        if (!match || !match.currentInnings) return false;

        const innings = await Innings.findById(match.currentInnings);
        const totalBalls = match.details.overs * (match.details.ballPerOver || 6);

        // All Out
        if (innings.score.wickets >= 10) {
            await this.endCurrentInnings(matchId);
            return true;
        }

        // Overs Completed
        if (innings.score.balls >= totalBalls) {
            await this.endCurrentInnings(matchId);
            return true;
        }

        // Successful Chase (2nd Innings)
        if (innings.inningsNumber === 2 && innings.score.runs >= innings.target) {
            await this.endCurrentInnings(matchId);
            return true;
        }

        return false;
    }

    /*
    |--------------------------------------------------------------------------
    | Check Match Completion
    |--------------------------------------------------------------------------
    */
    async checkMatchCompletion(matchId) {
        const match = await Match.findById(matchId);
        if (!match || match.innings.length < 2) return false;

        const innings = await Innings.find({ match: matchId }).sort({ inningsNumber: 1 });

        if (innings.length < 2) return false;
        if (innings[0].status !== "Completed" || innings[1].status !== "Completed") return false;

        await this.declareWinner(matchId);
        return true;
    }

    /*
    |--------------------------------------------------------------------------
    | Declare Winner
    |--------------------------------------------------------------------------
    */
    async declareWinner(matchId) {
        const match = await Match.findById(matchId);
        const innings = await Innings.find({ match: matchId }).sort({ inningsNumber: 1 });

        const first = innings[0];
        const second = innings[1];

        let winner = null;
        let result = "";
        let margin = "";

        if (second.score.runs >= second.target) {
            winner = second.battingTeam;
            const wicketsLeft = 10 - second.score.wickets;
            result = "Won by Wickets";
            margin = `${wicketsLeft} Wickets`;
        } else if (first.score.runs > second.score.runs) {
            winner = first.battingTeam;
            const runMargin = first.score.runs - second.score.runs;
            result = "Won by Runs";
            margin = `${runMargin} Runs`;
        } else {
            result = "Tie";
        }

        match.winner = winner;
        match.result = result;
        match.margin = margin;
        match.status = "Completed";
        match.currentInnings = null;

        await match.save();
        return match;
    }

    /*
    |--------------------------------------------------------------------------
    | Complete Match Flow
    |--------------------------------------------------------------------------
    */
    async processMatchState(matchId) {
        const inningsEnded = await this.checkInningsEnd(matchId);
        if (!inningsEnded) return;

        // Fetch fresh match details to see changes applied by checkInningsEnd -> endCurrentInnings
        const match = await Match.findById(matchId);

        if (match.innings.length === 1) {
            await this.createSecondInnings(matchId);
            return;
        }

        await this.checkMatchCompletion(matchId);
    }
}

export default new InningsService();
