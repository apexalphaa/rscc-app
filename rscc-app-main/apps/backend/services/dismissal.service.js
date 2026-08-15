import wicketProcessor from "../utils/wicketProcessor.js";

import scorecardService from "./scorecard.service.js";
import partnershipService from "./partnership.service.js";

class DismissalService {

    /*
    |--------------------------------------------------------------------------
    | Apply Dismissal
    |--------------------------------------------------------------------------
    */

    async applyDismissal({

        innings,

        ball

    }) {

        const wicket =
            wicketProcessor.process(ball);

        if (!wicket.isWicket) {

            return {

                dismissed: false

            };

        }

        /*
        |--------------------------------------------------------------------------
        | Scorecard
        |--------------------------------------------------------------------------
        */

        await scorecardService.setDismissal(

            innings._id,

            wicket.dismissedPlayer,

            {

                dismissal:

                    wicket.dismissalType,

                dismissedBy:

                    wicket.creditsBowler

                        ? ball.bowler

                        : null,

                assistedBy:

                    wicket.hasFielder

                        ? ball.wicket.fielder

                        : null

            }

        );

        /*
        |--------------------------------------------------------------------------
        | Partnership
        |--------------------------------------------------------------------------
        */

        await partnershipService.finishPartnership(

            innings._id,

            ball._id

        );

        /*
        |--------------------------------------------------------------------------
        | Innings
        |--------------------------------------------------------------------------
        */

        if (

            wicket.countsTeamWicket

        ) {

            innings.score.wickets++;

        }

        /*
        |--------------------------------------------------------------------------
        | Dismissed Players
        |--------------------------------------------------------------------------
        */

        if (

            wicket.dismissedPlayer

        ) {

            innings.dismissedPlayers.push(

                wicket.dismissedPlayer

            );

        }

        await innings.save();

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return {

            dismissed: true,

            wicket,

            innings

        };

    }

}

export default new DismissalService();
