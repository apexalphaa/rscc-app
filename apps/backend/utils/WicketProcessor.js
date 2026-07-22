class WicketProcessor {

    /*
    |--------------------------------------------------------------------------
    | Is Wicket
    |--------------------------------------------------------------------------
    */

    isWicket(ball) {

        return Boolean(
            ball?.wicket?.isWicket
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Batter Out
    |--------------------------------------------------------------------------
    */

    dismissedPlayer(ball) {

        if (!this.isWicket(ball))
            return null;

        return ball.wicket.batsman;

    }

    /*
    |--------------------------------------------------------------------------
    | Bowler Gets Wicket
    |--------------------------------------------------------------------------
    */

    creditsBowler(ball) {

        if (!this.isWicket(ball))
            return false;

        return [

            "Bowled",

            "Caught",

            "LBW",

            "Stumped",

            "Hit Wicket"

        ].includes(
            ball.wicket.dismissalType
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Fielder Gets Assist
    |--------------------------------------------------------------------------
    */

    hasFielder(ball) {

        if (!this.isWicket(ball))
            return false;

        return [

            "Caught",

            "Run Out",

            "Stumped"

        ].includes(
            ball.wicket.dismissalType
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Counts As Ball Faced
    |--------------------------------------------------------------------------
    */

    countsBallFaced(ball) {

        if (!ball.legalDelivery)
            return false;

        return true;

    }

    /*
    |--------------------------------------------------------------------------
    | Counts As Team Wicket
    |--------------------------------------------------------------------------
    */

    countsTeamWicket(ball) {

        if (!this.isWicket(ball))
            return false;

        return ball.wicket.dismissalType !==
            "Retired Out";

    }

    /*
    |--------------------------------------------------------------------------
    | Summary
    |--------------------------------------------------------------------------
    */

    process(ball) {

        return {

            isWicket:
                this.isWicket(ball),

            dismissedPlayer:
                this.dismissedPlayer(ball),

            creditsBowler:
                this.creditsBowler(ball),

            hasFielder:
                this.hasFielder(ball),

            countsBallFaced:
                this.countsBallFaced(ball),

            countsTeamWicket:
                this.countsTeamWicket(ball),

            dismissalType:
                ball?.wicket?.dismissalType || ""

        };

    }

}

export default new WicketProcessor();
