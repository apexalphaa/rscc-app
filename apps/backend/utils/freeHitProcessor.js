class FreeHitProcessor {

    /*
    |--------------------------------------------------------------------------
    | Earn Free Hit
    |--------------------------------------------------------------------------
    */

    shouldAward(ball){

        return (

            ball.extra?.type ===

            "No Ball"

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Consume Free Hit
    |--------------------------------------------------------------------------
    */

    shouldConsume(ball){

        return ball.legalDelivery;

    }

    /*
    |--------------------------------------------------------------------------
    | Illegal Dismissals
    |--------------------------------------------------------------------------
    */

    blockedDismissals(){

        return [

            "Bowled",

            "Caught",

            "LBW",

            "Hit Wicket"

        ];

    }

    /*
    |--------------------------------------------------------------------------
    | Valid On Free Hit
    |--------------------------------------------------------------------------
    */

    dismissalAllowed(ball){

        if(!ball.freeHit)

            return true;

        if(

            !ball.wicket?.isWicket

        )

            return true;

        return !(

            this.blockedDismissals()

            .includes(

                ball.wicket.dismissalType

            )

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Apply
    |--------------------------------------------------------------------------
    */

    process(

        innings,

        currentBall,

        previousBall

    ){

        /*
        ----------------------------------
        Was this delivery Free Hit?
        ----------------------------------
        */

        currentBall.freeHit =

            innings.freeHit.active;

        /*
        ----------------------------------
        Consume?
        ----------------------------------
        */

        if(

            innings.freeHit.active &&

            this.shouldConsume(

                currentBall

            )

        ){

            innings.freeHit.active=false;

            innings.freeHit.earnedFrom=null;

        }

        /*
        ----------------------------------
        Award next one?
        ----------------------------------
        */

        if(

            this.shouldAward(

                currentBall

            )

        ){

            innings.freeHit.active=true;

            innings.freeHit.earnedFrom=

                currentBall._id;

        }

        return currentBall;

    }

}

export default new FreeHitProcessor();
