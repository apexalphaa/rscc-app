import partnershipService from "./partnership.service.js";

class BatterService {

    /*
    |--------------------------------------------------------------------------
    | Next Batter
    |--------------------------------------------------------------------------
    */

    getNextBatter(innings) {

        if (
            innings.nextBatterIndex >=
            innings.battingOrder.length
        ) {
            return null;
        }

        return innings.battingOrder[
            innings.nextBatterIndex
        ];

    }

    /*
    |--------------------------------------------------------------------------
    | Has Batter Remaining
    |--------------------------------------------------------------------------
    */

    hasNextBatter(innings) {

        return this.getNextBatter(
            innings
        ) !== null;

    }

    /*
    |--------------------------------------------------------------------------
    | Incoming Batter
    |--------------------------------------------------------------------------
    */

    async sendNextBatter({

        innings,

        dismissedPlayer

    }) {

        const nextBatter =
            this.getNextBatter(
                innings
            );

        if (!nextBatter) {

            return {

                allOut: true,

                batter: null

            };

        }

        /*
        |--------------------------------------------------------------------------
        | Advance Index
        |--------------------------------------------------------------------------
        */

        innings.nextBatterIndex++;

        /*
        |--------------------------------------------------------------------------
        | Replace Batter
        |--------------------------------------------------------------------------
        */

        if (

            innings.striker.toString() ===

            dismissedPlayer.toString()

        ) {

            innings.striker = nextBatter;

        }

        else {

            innings.nonStriker = nextBatter;

        }

        await innings.save();

        /*
        |--------------------------------------------------------------------------
        | Partnership
        |--------------------------------------------------------------------------
        */

        await partnershipService.nextPartnership({

            match:

                innings.match,

            innings:

                innings._id,

            striker:

                innings.striker,

            nonStriker:

                innings.nonStriker

        });

        return {

            allOut: false,

            batter: nextBatter

        };

    }

    /*
    |--------------------------------------------------------------------------
    | Is All Out
    |--------------------------------------------------------------------------
    */

    isAllOut(innings) {

        return (

            innings.score.wickets >= 10 ||

            !this.hasNextBatter(
                innings
            )

        );

    }

}

export default new BatterService();
