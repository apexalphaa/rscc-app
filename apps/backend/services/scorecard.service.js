import Scorecard from "../models/Scorecard.js";
import Innings from "../models/Innings.js";

class ScorecardService {

    /*
    |--------------------------------------------------------------------------
    | Get Scorecard
    |--------------------------------------------------------------------------
    */

    async getScorecard(inningsId) {

        const scorecard =
            await Scorecard.findOne({
                innings: inningsId,
            })

            .populate("batting.player")

            .populate("bowling.player");

        if (!scorecard)
            throw new Error(
                "Scorecard not found."
            );

        return scorecard;

    }

    /*
    |--------------------------------------------------------------------------
    | Create Scorecard
    |--------------------------------------------------------------------------
    */

    async createScorecard(inningsId) {

        const innings =
            await Innings.findById(inningsId);

        if (!innings)
            throw new Error(
                "Innings not found."
            );

        const exists =
            await Scorecard.findOne({
                innings: inningsId,
            });

        if (exists)
            return exists;

        const batting = innings.battingOrder.map(
            (player, index) => ({

                player,

                battingPosition:
                    index + 1,

            })
        );

        const bowling = innings.bowlersUsed.map(
            player => ({
                player,
            })
        );

        return Scorecard.create({

            match:
                innings.match,

            innings:
                innings._id,

            battingTeam:
                innings.battingTeam,

            bowlingTeam:
                innings.bowlingTeam,

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

        return scorecard.batting.find(

            batter =>

                String(batter.player) ===
                String(playerId)

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Find Bowler
    |--------------------------------------------------------------------------
    */

    findBowler(scorecard, playerId) {

        return scorecard.bowling.find(

            bowler =>

                String(bowler.player) ===
                String(playerId)

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Ensure Bowler Exists
    |--------------------------------------------------------------------------
    */

    ensureBowler(scorecard, playerId) {

        let bowler =
            this.findBowler(
                scorecard,
                playerId
            );

        if (!bowler) {

            scorecard.bowling.push({

                player: playerId,

            });

            bowler =
                this.findBowler(
                    scorecard,
                    playerId
                );

        }

        return bowler;

    }

}

export default new ScorecardService();
