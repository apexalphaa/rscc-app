import Ball from "../models/Ball.js";

import inningsService from "./innings.service.js";
import overService from "./over.service.js";
import scorecardService from "./scorecard.service.js";
import partnershipService from "./partnership.service.js";

class UndoService {

    /*
    |--------------------------------------------------------------------------
    | Last Ball
    |--------------------------------------------------------------------------
    */

    async getLastBall(inningsId) {

        const ball =
            await Ball.findOne({

                innings: inningsId

            })
            .sort({

                createdAt: -1

            });

        if (!ball)
            throw new Error(
                "No delivery available to undo."
            );

        return ball;

    }

    /*
    |--------------------------------------------------------------------------
    | Undo Delivery
    |--------------------------------------------------------------------------
    */

    async undoLastDelivery(

        innings

    ) {

        const ball =
            await this.getLastBall(
                innings._id
            );

        /*
        |--------------------------------------------------------------------------
        | Reverse updates
        |--------------------------------------------------------------------------
        */

        await inningsService.undoScore(

            innings,

            ball

        );

        await scorecardService.undoBatting(

            innings._id,

            ball

        );

        await scorecardService.undoBowling(

            innings._id,

            ball

        );

        await partnershipService.undo(

            innings._id,

            ball

        );

        await overService.undo(

            innings._id,

            ball

        );

        /*
        |--------------------------------------------------------------------------
        | Remove Ball
        |--------------------------------------------------------------------------
        */

        await ball.deleteOne();

        return {

            success: true,

            ball

        };

    }

}

export default new UndoService();
