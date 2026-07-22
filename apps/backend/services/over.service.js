import Over from "../models/Over.js";
import cricketMath from "../utils/cricketMath.js";

class OverService {

    /*
    |--------------------------------------------------------------------------
    | Get Current Over
    |--------------------------------------------------------------------------
    */

    async getCurrentOver(inningsId) {

        const over =
            await Over.findOne({

                innings: inningsId,

                completed: false

            });

        if (!over)
            throw new Error(
                "Current over not found."
            );

        return over;

    }

    /*
    |--------------------------------------------------------------------------
    | Create Over
    |--------------------------------------------------------------------------
    */

    async createOver({

        match,

        innings,

        overNumber,

        bowler

    }) {

        return await Over.create({

            match,

            innings,

            overNumber,

            bowler

        });

    }

    /*
    |--------------------------------------------------------------------------
    | Update Over
    |--------------------------------------------------------------------------
    */

    async updateOver(

        inningsId,

        ball

    ) {

        const over =
            await this.getCurrentOver(
                inningsId
            );

        over.balls.push(
            ball._id
        );

        over.statistics.runs +=
            cricketMath.teamRuns(ball);

        if (ball.legalDelivery)
            over.statistics.legalBalls++;

        if (ball.wicket?.isWicket)
            over.statistics.wickets++;

        switch (ball.extra?.type) {

            case "Wide":
                over.statistics.wides +=
                    ball.extra.runs;
                break;

            case "No Ball":
                over.statistics.noBalls +=
                    ball.extra.runs;
                break;

            case "Bye":
                over.statistics.byes +=
                    ball.extra.runs;
                break;

            case "Leg Bye":
                over.statistics.legByes +=
                    ball.extra.runs;
                break;

        }

        /*
        |--------------------------------------------------------------------------
        | Boundary Statistics
        |--------------------------------------------------------------------------
        */

        if (
            !ball.extra?.type &&
            ball.runs === 4
        ) {
            over.statistics.fours++;
        }

        if (
            !ball.extra?.type &&
            ball.runs === 6
        ) {
            over.statistics.sixes++;
        }

        /*
        |--------------------------------------------------------------------------
        | Dot Ball
        |--------------------------------------------------------------------------
        */

        if (
            ball.legalDelivery &&
            cricketMath.teamRuns(ball) === 0
        ) {
            over.statistics.dots++;
        }

        /*
        |--------------------------------------------------------------------------
        | Over Completion
        |--------------------------------------------------------------------------
        */

        if (
            cricketMath.isOverComplete(
                over.statistics.legalBalls
            )
        ) {

            over.completed = true;

        }

        await over.save();

        return over;

    }

    /*
    |--------------------------------------------------------------------------
    | Maiden Over
    |--------------------------------------------------------------------------
    */

    isMaiden(over) {

        return (

            over.statistics.runs === 0 &&

            over.statistics.legalBalls === 6

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Next Over
    |--------------------------------------------------------------------------
    */

    async startNextOver({

        match,

        innings,

        currentOver,

        bowler

    }) {

        return this.createOver({

            match,

            innings,

            overNumber:
                currentOver.overNumber + 1,

            bowler

        });

    }

}

export default new OverService();
