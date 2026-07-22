import Ball from "../models/Ball.js";
import Innings from "../models/Innings.js";

import overService from "./over.service.js";
import scorecardService from "./scorecard.service.js";
import partnershipService from "./partnership.service.js";

import cricketMath from "../utils/cricketMath.js";
import deliveryValidator from "../utils/deliveryValidator.js";
import strikeRotation from "../utils/strikeRotation.js";
import scoreUpdater from "../utils/scoreUpdater.js";
import overManager from "../utils/overManager.js";

class BallService {

    /*
    |--------------------------------------------------------------------------
    | Innings
    |--------------------------------------------------------------------------
    */

    async getInnings(inningsId) {

        const innings = await Innings.findById(inningsId);

        if (!innings)
            throw new Error("Innings not found.");

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

        if (over)
            return over;

        const innings =
            await this.getInnings(
                inningsId
            );

        return await overService.createOver(
            inningsId,
            innings.currentBowler
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Delivery Numbers
    |--------------------------------------------------------------------------
    */

    getBallMeta(over) {

        return {

            overNumber:
                over.overNumber,

            ballInOver:
                over.statistics.legalBalls + 1,

            displayNumber:
                cricketMath.nextDisplayNumber(

                    over.overNumber,

                    over.statistics.legalBalls

                )

        };

    }

    /*
    |--------------------------------------------------------------------------
    | Sanitize Payload
    |--------------------------------------------------------------------------
    */

    sanitizePayload(payload = {}) {

        return {

            runs:
                payload.runs || 0,

            extra:
                payload.extra || null,

            wicket:
                payload.wicket || null,

            shot:
                payload.shot || null,

            wagonZone:
                payload.wagonZone || null,

            notes:
                payload.notes || ""

        };

    }

    /*
    |--------------------------------------------------------------------------
    | Create Ball
    |--------------------------------------------------------------------------
    */

    async createBall(

        innings,
        over,
        payload,
        scorer

    ) {

        deliveryValidator.validate(
            payload
        );

        const data =
            this.sanitizePayload(
                payload
            );

        const meta =
            this.getBallMeta(
                over
            );

        const legalDelivery =
            cricketMath.isLegalDelivery(
                data.extra
            );

        const ball =
            await Ball.create({

                match:
                    innings.match,

                innings:
                    innings._id,

                over:
                    over._id,

                overNumber:
                    meta.overNumber,

                ballNumber:
                    meta.ballInOver,

                displayNumber:
                    meta.displayNumber,

                legalDelivery,

                striker:
                    innings.striker,

                nonStriker:
                    innings.nonStriker,

                bowler:
                    innings.currentBowler,

                runs:
                    data.runs,

                extra:
                    data.extra,

                wicket:
                    data.wicket,

                shot:
                    data.shot,

                wagonZone:
                    data.wagonZone,

                notes:
                    data.notes,

                scorer

            });

        return ball;

    }

    /*
    |--------------------------------------------------------------------------
    | Update Innings
    |--------------------------------------------------------------------------
    */

    async updateInnings(
        innings,
        ball
    ) {

        scoreUpdater.process(
            innings,
            ball
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
                    cricketMath.teamRuns(
                        ball
                    ),

                wicket:
                    ball.wicket?.isWicket || false,

                wide:
                    ball.extra?.type === "Wide",

                noBall:
                    ball.extra?.type === "No Ball",

                bye:
                    ball.extra?.type === "Bye",

                legBye:
                    ball.extra?.type === "Leg Bye"

            }

        );

        return over;

    }
}

export default new BallService();
