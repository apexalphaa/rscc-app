import Ball from "../models/Ball.js";
import Innings from "../models/Innings.js";

import overService from "./over.service.js";
import scorecardService from "./scorecard.service.js";
import partnershipService from "./partnership.service.js";

import cricketMath from "../utils/cricketMath.js";

class BallService {

    /*
    |--------------------------------------------------------------------------
    | Current Innings
    |--------------------------------------------------------------------------
    */

    async getInnings(inningsId) {

        const innings =
            await Innings.findById(inningsId);

        if (!innings)
            throw new Error(
                "Innings not found."
            );

        return innings;

    }

    /*
    |--------------------------------------------------------------------------
    | Current Over
    |--------------------------------------------------------------------------
    */

    async getCurrentOver(inningsId) {

        let over =
            await overService.getCurrentOver(
                inningsId
            );

        if (!over) {

            const innings =
                await this.getInnings(
                    inningsId
                );

            over =
                await overService.createOver(

                    inningsId,

                    innings.currentBowler

                );

        }

        return over;

    }

    /*
    |--------------------------------------------------------------------------
    | Ball Number
    |--------------------------------------------------------------------------
    */

    nextBallNumber(over) {

        return {

            overNumber:
                over.overNumber,

            ballNumber:
                over.statistics.legalBalls + 1,

            displayNumber:

                `${

                    over.overNumber

                }.${
                    over.statistics.legalBalls
                }`

        };

    }

    /*
    |--------------------------------------------------------------------------
    | Validate Delivery
    |--------------------------------------------------------------------------
    */

    validateDelivery(data) {

        if (
            data.runs < 0
        )
            throw new Error(
                "Invalid runs."
            );

        if (
            data.runs > 7
        )
            throw new Error(
                "Runs exceeded limit."
            );

        if (

            data.extra &&

            ![
                "",

                "Wide",

                "No Ball",

                "Bye",

                "Leg Bye",

                "Penalty",

            ].includes(
                data.extra.type
            )

        ) {

            throw new Error(
                "Invalid extra."
            );

        }

        return true;

    }

    /*
    |--------------------------------------------------------------------------
    | Record Ball
    |--------------------------------------------------------------------------
    */

    async recordBall(

        inningsId,

        payload,

        scorer

    ) {

        this.validateDelivery(
            payload
        );

        const innings =
            await this.getInnings(
                inningsId
            );

        const over =
            await this.getCurrentOver(
                inningsId
            );

        const ballInfo =
            this.nextBallNumber(
                over
            );

        const ball =
            await Ball.create({

                match:
                    innings.match,

                innings:
                    inningsId,

                over:
                    over._id,

                overNumber:
                    ballInfo.overNumber,

                ballNumber:
                    ballInfo.ballNumber,

                displayNumber:
                    ballInfo.displayNumber,

                striker:
                    innings.striker,

                nonStriker:
                    innings.nonStriker,

                bowler:
                    innings.currentBowler,

                ...payload,

                scorer,

            });

        return {

            innings,

            over,

            ball,

        };

    }
    /*
    |--------------------------------------------------------------------------
    | Update Innings Score
    |--------------------------------------------------------------------------
    */

    async updateInnings(inningsId, ball) {

        const innings =
            await this.getInnings(
                inningsId
            );

        const legalDelivery =
            ball.legalDelivery;

        const runs =
            ball.runs +
            (ball.extra?.runs || 0);

        innings.score.runs += runs;

        if (legalDelivery) {

            innings.score.balls++;

            innings.score.overs =
                cricketMath.overString(
                    innings.score.balls
                );

        }

        if (
            ball.wicket &&
            ball.wicket.isWicket
        ) {

            innings.score.wickets++;

        }

        innings.score.extras +=
            ball.extra?.runs || 0;

        if (
            innings.target > 0
        ) {

            innings.requiredRuns =
                Math.max(
                    innings.target -
                    innings.score.runs,
                    0
                );

        }

        innings.remainingBalls =
            Math.max(

                innings.remainingBalls -

                (legalDelivery ? 1 : 0),

                0

            );

        innings.currentRunRate =
            Number(
                cricketMath.currentRunRate(
                    innings.score.runs,
                    innings.score.balls
                )
            );

        innings.requiredRunRate =
            Number(
                cricketMath.requiredRunRate(
                    innings.target,
                    innings.score.runs,
                    innings.remainingBalls
                )
            );

        await innings.save();

        return innings;

    }

    /*
    |--------------------------------------------------------------------------
    | Update Over
    |--------------------------------------------------------------------------
    */

    async updateOver(
        over,
        ball
    ) {

        await overService.addBall(

            over._id,

            ball._id,

            {

                legalDelivery:
                    ball.legalDelivery,

                runs:
                    ball.runs +
                    (ball.extra?.runs || 0),

                wicket:
                    ball.wicket?.isWicket || false,

                wide:
                    ball.extra?.type ===
                    "Wide",

                noBall:
                    ball.extra?.type ===
                    "No Ball",

                bye:
                    ball.extra?.type ===
                    "Bye",

                legBye:
                    ball.extra?.type ===
                    "Leg Bye",

            }

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Update Batter
    |--------------------------------------------------------------------------
    */

    async updateBatter(
        innings,
        ball
    ) {

        await scorecardService.updateBatting(

            innings._id,

            innings.striker,

            {

                runs:
                    ball.runs,

                ballFaced:
                    ball.legalDelivery,

                isFour:
                    ball.runs === 4,

                isSix:
                    ball.runs === 6,

            }

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Update Bowler
    |--------------------------------------------------------------------------
    */

    async updateBowler(
        innings,
        ball
    ) {

        await scorecardService.updateBowling(

            innings._id,

            innings.currentBowler,

            {

                legalBall:
                    ball.legalDelivery,

                runs:
                    ball.runs +
                    (ball.extra?.runs || 0),

                wicket:
                    ball.wicket?.isWicket || false,

                wide:
                    ball.extra?.type ===
                    "Wide",

                noBall:
                    ball.extra?.type ===
                    "No Ball",

            }

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Update Partnership
    |--------------------------------------------------------------------------
    */

    async updatePartnership(
        innings,
        ball
    ) {

        await partnershipService.updatePartnership(

            innings._id,

            {

                striker:
                    innings.striker,

                runs:
                    ball.runs,

                legalBall:
                    ball.legalDelivery,

            }

        );

    }
}

export default new BallService();
