import Partnership from "../models/Partnership.js";

class PartnershipService {

    /*
    |--------------------------------------------------------------------------
    | Current Partnership
    |--------------------------------------------------------------------------
    */

    async getCurrentPartnership(inningsId) {

        const partnership =
            await Partnership.findOne({

                innings: inningsId,

                ended: false

            });

        if (!partnership)
            throw new Error(
                "Active partnership not found."
            );

        return partnership;

    }

    /*
    |--------------------------------------------------------------------------
    | Start Partnership
    |--------------------------------------------------------------------------
    */

    async createPartnership({

        match,

        innings,

        striker,

        nonStriker

    }) {

        return await Partnership.create({

            match,

            innings,

            striker,

            nonStriker

        });

    }

    /*
    |--------------------------------------------------------------------------
    | Update Partnership
    |--------------------------------------------------------------------------
    */

    async updatePartnership(

        inningsId,

        payload

    ) {

        const partnership =
            await this.getCurrentPartnership(
                inningsId
            );

        const batterRuns =
            payload.batterRuns || 0;

        const teamRuns =
            payload.teamRuns || 0;

        const legalBall =
            payload.legalBall || false;

        partnership.runs += teamRuns;

        if (legalBall)
            partnership.balls++;

        /*
        |--------------------------------------------------------------------------
        | Batter Contribution
        |--------------------------------------------------------------------------
        */

        if (
            payload.striker.toString() ===
            partnership.striker.toString()
        ) {

            partnership.strikerRuns += batterRuns;

            if (legalBall)
                partnership.strikerBalls++;

        } else {

            partnership.nonStrikerRuns += batterRuns;

            if (legalBall)
                partnership.nonStrikerBalls++;

        }

        await partnership.save();

        return partnership;

    }

    /*
    |--------------------------------------------------------------------------
    | Rotate Strike
    |--------------------------------------------------------------------------
    */

    async rotateStrike(
        inningsId
    ) {

        const partnership =
            await this.getCurrentPartnership(
                inningsId
            );

        const temp =
            partnership.striker;

        partnership.striker =
            partnership.nonStriker;

        partnership.nonStriker =
            temp;

        await partnership.save();

        return partnership;

    }

    /*
    |--------------------------------------------------------------------------
    | Finish Partnership
    |--------------------------------------------------------------------------
    */

    async finishPartnership(

        inningsId,

        wicketBallId

    ) {

        const partnership =
            await this.getCurrentPartnership(
                inningsId
            );

        partnership.ended = true;

        partnership.wicket =
            wicketBallId;

        partnership.endedAt =
            new Date();

        await partnership.save();

        return partnership;

    }

    /*
    |--------------------------------------------------------------------------
    | New Partnership
    |--------------------------------------------------------------------------
    */

    async nextPartnership({

        match,

        innings,

        striker,

        nonStriker

    }) {

        return this.createPartnership({

            match,

            innings,

            striker,

            nonStriker

        });

    }

}

export default new PartnershipService();
