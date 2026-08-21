class MatchCompletion {

    /*
    |--------------------------------------------------------------------------
    | Target Chased
    |--------------------------------------------------------------------------
    */

    targetChased(innings){

        if(!innings.target)

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

    allOut(innings){

        return (

            innings.score.wickets >= 10

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Overs Finished
    |--------------------------------------------------------------------------
    */

    oversFinished(innings){

        return (

            innings.score.balls >=

            innings.maxBalls

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Completed
    |--------------------------------------------------------------------------
    */

    completed(innings){

        return (

            this.targetChased(innings) ||

            this.allOut(innings) ||

            this.oversFinished(innings)

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Reason
    |--------------------------------------------------------------------------
    */

    reason(innings){

        if(this.targetChased(innings))

            return "Target Chased";

        if(this.allOut(innings))

            return "All Out";

        if(this.oversFinished(innings))

            return "Overs Completed";

        return "";

    }

}

export default new MatchCompletion();
