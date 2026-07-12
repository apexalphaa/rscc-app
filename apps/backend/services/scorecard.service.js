import Scorecard from "../models/Scorecard.js";
import Innings from "../models/Innings.js";

class ScorecardService {

    /*
    |--------------------------------------------------------------------------
    | Get Scorecard
    |--------------------------------------------------------------------------
    */
    async getScorecard(inningsId) {
        const scorecard = await Scorecard.findOne({ innings: inningsId })
            .populate("batting.player")
            .populate("bowling.player");

        if (!scorecard) {
            throw new Error("Scorecard not found.");
        }

        return scorecard;
    }

    /*
    |--------------------------------------------------------------------------
    | Create Scorecard
    |--------------------------------------------------------------------------
    */
    async createScorecard(inningsId) {
        const innings = await Innings.findById(inningsId);

        if (!innings) {
            throw new Error("Innings not found.");
        }

        const exists = await Scorecard.findOne({ innings: inningsId });
        if (exists) return exists;

        const batting = innings.battingOrder.map((player, index) => ({
            player,
            battingPosition: index + 1,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            strikeRate: 0,
            isOut: false
        }));

        const bowling = innings.bowlersUsed.map(player => ({
            player,
            overs: 0,
            runs: 0,
            wickets: 0,
            maidens: 0,
            wides: 0,
            noBalls: 0,
            economy: 0
        }));

        return Scorecard.create({
            match: innings.match,
            innings: innings._id,
            battingTeam: innings.battingTeam,
            bowlingTeam: innings.bowlingTeam,
            batting,
            bowling,
            fallOfWickets: [],
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Find Batter
    |--------------------------------------------------------------------------
    */
    findBatter(scorecard, playerId) {
        const targetId = String(playerId);
        return scorecard.batting.find(
            batter => String(batter.player?._id || batter.player) === targetId
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Find Bowler
    |--------------------------------------------------------------------------
    */
    findBowler(scorecard, playerId) {
        const targetId = String(playerId);
        return scorecard.bowling.find(
            bowler => String(bowler.player?._id || bowler.player) === targetId
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Ensure Bowler Exists
    |--------------------------------------------------------------------------
    */
    ensureBowler(scorecard, playerId) {
        let bowler = this.findBowler(scorecard, playerId);

        if (!bowler) {
            scorecard.bowling.push({
                player: playerId,
                overs: 0,
                runs: 0,
                wickets: 0,
                maidens: 0,
                wides: 0,
                noBalls: 0,
                economy: 0
            });

            bowler = this.findBowler(scorecard, playerId);
        }

        return bowler;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Batter
    |--------------------------------------------------------------------------
    */
    async updateBatting(inningsId, playerId, payload) {
        const scorecard = await this.getScorecard(inningsId);
        const batter = this.findBatter(scorecard, playerId);

        if (!batter) {
            throw new Error("Batter not found.");
        }

        const {
            runs = 0,
            ballFaced = true,
            isFour = false,
            isSix = false,
        } = payload;

        batter.runs = (batter.runs || 0) + runs;

        if (ballFaced) {
            batter.balls = (batter.balls || 0) + 1;
        }

        if (isFour) batter.fours = (batter.fours || 0) + 1;
        if (isSix) batter.sixes = (batter.sixes || 0) + 1;

        batter.strikeRate = !batter.balls || batter.balls === 0
            ? 0
            : Number(((batter.runs * 100) / batter.balls).toFixed(2));

        await scorecard.save();
        return batter;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Bowler
    |--------------------------------------------------------------------------
    */
    async updateBowling(inningsId, playerId, payload) {
        const scorecard = await this.getScorecard(inningsId);
        const bowler = this.ensureBowler(scorecard, playerId);

        const {
            legalBall = true,
            runs = 0,
            wicket = false,
            wide = false,
            noBall = false,
        } = payload;

        bowler.runs = (bowler.runs || 0) + runs;

        if (wicket) bowler.wickets = (bowler.wickets || 0) + 1;
        if (wide) bowler.wides = (bowler.wides || 0) + 1;
        if (noBall) bowler.noBalls = (bowler.noBalls || 0) + 1;

        if (legalBall) {
            // Reconstruct absolute balls to fully avoid JS decimal point drift inaccuracies
            const currentOversInt = Math.floor(bowler.overs || 0);
            const currentBallsInt = Math.round(((bowler.overs || 0) - currentOversInt) * 6);
            
            let totalBalls = (currentOversInt * 6) + currentBallsInt + 1;
            
            const newOvers = Math.floor(totalBalls / 6);
            const newBalls = totalBalls % 6;
            
            // Stores as fractional format for exact internal mathematical modeling
            bowler.overs = newOvers + (newBalls / 6);
        }

        // Exact decimal translation calculation for accurate economy representation
        const completedOvers = Math.floor(bowler.overs || 0);
        const activeBalls = Math.round(((bowler.overs || 0) - completedOvers) * 6);
        const trueOversDuration = completedOvers + (activeBalls / 6);

        bowler.economy = trueOversDuration === 0
            ? 0
            : Number((bowler.runs / trueOversDuration).toFixed(2));

        await scorecard.save();
        return bowler;
    }

    /*
    |--------------------------------------------------------------------------
    | Record Wicket
    |--------------------------------------------------------------------------
    */
    async recordDismissal(inningsId, payload) {
        const scorecard = await this.getScorecard(inningsId);
        const {
            batsman,
            dismissal,
            bowler,
            assistedBy,
            score,
            wicket,
            over,
        } = payload;

        const batter = this.findBatter(scorecard, batsman);

        if (!batter) {
            throw new Error("Batter not found.");
        }

        batter.isOut = true;
        batter.dismissal = dismissal;
        batter.dismissedBy = bowler;
        batter.assistedBy = assistedBy;

        scorecard.fallOfWickets.push({
            wicket,
            score,
            over,
            batsman,
        });

        await scorecard.save();
        return batter;
    }

    /*
    |--------------------------------------------------------------------------
    | Add Maiden Over
    |--------------------------------------------------------------------------
    */
    async addMaiden(inningsId, bowlerId) {
        const scorecard = await this.getScorecard(inningsId);
        const bowler = this.findBowler(scorecard, bowlerId);

        if (!bowler) return;

        bowler.maidens = (bowler.maidens || 0) + 1;
        await scorecard.save();
    }

    /*
    |--------------------------------------------------------------------------
    | Score Summary
    |--------------------------------------------------------------------------
    */
    async summary(inningsId) {
        return this.getScorecard(inningsId);
    }
}

export default new ScorecardService();
