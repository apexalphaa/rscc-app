import Innings from "../models/Innings.js";
import cricketMath from "../utils/cricketMath.js";

class InningsService {

    /*
    |--------------------------------------------------------------------------
    | Get Innings
    |--------------------------------------------------------------------------
    */

    async getById(inningsId) {

        const innings =
            await Innings.findById(inningsId);

        if (!innings)
            throw new Error("Innings not found.");

        return innings;

    }

    /*
    |--------------------------------------------------------------------------
    | Live Score
    |--------------------------------------------------------------------------
    */

    updateScore(innings, ball) {

        innings.score.runs +=
            cricketMath.teamRuns(ball);

        if (ball.legalDelivery) {

            innings.score.balls++;

            innings.score.overs =
                cricketMath.overString(
                    innings.score.balls
                );

        }

        innings.extras.total =
            innings.extras.wides +
            innings.extras.noBalls +
            innings.extras.byes +
            innings.extras.legByes +
            innings.extras.penalties;

        innings.currentRunRate =
            cricketMath.currentRunRate(

                innings.score.runs,

                innings.score.balls

            );

    }

    /*
    |--------------------------------------------------------------------------
    | Chase
    |--------------------------------------------------------------------------
    */

    updateChase(innings) {

        if (!innings.target)
            return;

        innings.requiredRuns =
            Math.max(

                innings.target -

                innings.score.runs,

                0

            );

        innings.remainingBalls =
            Math.max(

                innings.maxBalls -

                innings.score.balls,

                0

            );

        innings.requiredRunRate =
            cricketMath.requiredRunRate(

                innings.requiredRuns,

                innings.remainingBalls

            );

    }

    /*
    |--------------------------------------------------------------------------
    | Match Result
    |--------------------------------------------------------------------------
    */

    hasChasedTarget(innings) {

        if (!innings.target)
            return false;

        return (

            innings.score.runs >=

            innings.target

        );

    }

    /*
    |--------------------------------------------------------------------------
    | All Out
    |--------------------------------------------------------------------------
    */

    isAllOut(innings) {

        return (

            innings.score.wickets >= 10

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Overs Complete
    |--------------------------------------------------------------------------
    */

    oversCompleted(innings) {

        return (

            innings.score.balls >=

            innings.maxBalls

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Complete Innings
    |--------------------------------------------------------------------------
    */

    finish(innings) {

        innings.status =
            "Completed";

        innings.completedAt =
            new Date();

    }

}

export default new InningsService();
