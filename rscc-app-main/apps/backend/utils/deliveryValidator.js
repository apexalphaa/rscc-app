class DeliveryValidator {

    /*
    |--------------------------------------------------------------------------
    | Public
    |--------------------------------------------------------------------------
    */

    validate(payload = {}) {

        this.validateRuns(payload);
        this.validateExtra(payload);
        this.validateWicket(payload);
        this.validateCombination(payload);

        return true;

    }

    /*
    |--------------------------------------------------------------------------
    | Runs
    |--------------------------------------------------------------------------
    */

    validateRuns(payload) {

        const runs = payload.runs ?? 0;

        if (!Number.isInteger(runs))
            throw new Error("Runs must be an integer.");

        if (runs < 0)
            throw new Error("Runs cannot be negative.");

        if (runs > 6)
            throw new Error("Runs cannot exceed 6.");

    }

    /*
    |--------------------------------------------------------------------------
    | Extras
    |--------------------------------------------------------------------------
    */

    validateExtra(payload) {

        if (!payload.extra)
            return;

        const allowedExtras = [

            "Wide",

            "No Ball",

            "Bye",

            "Leg Bye",

            "Penalty"

        ];

        if (!allowedExtras.includes(payload.extra.type))
            throw new Error("Invalid extra type.");

        if (
            payload.extra.runs === undefined ||
            payload.extra.runs === null
        )
            payload.extra.runs = 1;

        if (!Number.isInteger(payload.extra.runs))
            throw new Error("Extra runs must be an integer.");

        if (payload.extra.runs < 0)
            throw new Error("Extra runs cannot be negative.");

    }

    /*
    |--------------------------------------------------------------------------
    | Wicket
    |--------------------------------------------------------------------------
    */

    validateWicket(payload) {

        if (!payload.wicket)
            return;

        if (!payload.wicket.isWicket)
            return;

        const dismissalTypes = [

            "Bowled",

            "Caught",

            "LBW",

            "Run Out",

            "Stumped",

            "Hit Wicket",

            "Retired Hurt",

            "Timed Out",

            "Handled Ball",

            "Hit Ball Twice",

            "Obstructing The Field"

        ];

        if (
            !dismissalTypes.includes(
                payload.wicket.type
            )
        ) {

            throw new Error(
                "Invalid dismissal type."
            );

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Cricket Laws
    |--------------------------------------------------------------------------
    */

    validateCombination(payload) {

        const extra =
            payload.extra?.type;

        const runs =
            payload.runs || 0;

        /*
        |--------------------------------------------------------------------------
        | Bye
        |--------------------------------------------------------------------------
        */

        if (
            extra === "Bye" &&
            runs > 0
        ) {

            throw new Error(
                "Byes cannot contain batter runs."
            );

        }

        /*
        |--------------------------------------------------------------------------
        | Leg Bye
        |--------------------------------------------------------------------------
        */

        if (
            extra === "Leg Bye" &&
            runs > 0
        ) {

            throw new Error(
                "Leg Byes cannot contain batter runs."
            );

        }

        /*
        |--------------------------------------------------------------------------
        | Penalty
        |--------------------------------------------------------------------------
        */

        if (
            extra === "Penalty" &&
            payload.legalDelivery === true
        ) {

            throw new Error(
                "Penalty runs are not legal deliveries."
            );

        }

        /*
        |--------------------------------------------------------------------------
        | Wide
        |--------------------------------------------------------------------------
        */

        if (
            extra === "Wide" &&
            payload.legalDelivery === true
        ) {

            throw new Error(
                "Wide is not a legal delivery."
            );

        }

        /*
        |--------------------------------------------------------------------------
        | No Ball
        |--------------------------------------------------------------------------
        */

        if (
            extra === "No Ball" &&
            payload.legalDelivery === true
        ) {

            throw new Error(
                "No Ball is not a legal delivery."
            );

        }

        /*
        |--------------------------------------------------------------------------
        | Wicket + Bye
        |--------------------------------------------------------------------------
        */

        if (
            payload.wicket?.type === "Bowled" &&
            (
                extra === "Bye" ||
                extra === "Leg Bye"
            )
        ) {

            throw new Error(
                "Bowled cannot occur on Bye or Leg Bye."
            );

        }

        /*
        |--------------------------------------------------------------------------
        | Wicket + Wide
        |--------------------------------------------------------------------------
        */

        if (
            payload.wicket?.type === "Bowled" &&
            extra === "Wide"
        ) {

            throw new Error(
                "Bowled cannot occur on Wide."
            );

        }

    }

}

export default new DeliveryValidator();
