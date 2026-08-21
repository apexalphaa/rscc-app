class StrikeRotation {

    /*
    |--------------------------------------------------------------------------
    | Public
    |--------------------------------------------------------------------------
    */

    rotate(innings, ball, overCompleted = false) {

        if (!innings)
            return innings;

        const rotateAfterBall =
            this.shouldRotateAfterBall(ball);

        if (rotateAfterBall)
            this.swap(innings);

        if (overCompleted)
            this.swap(innings);

        return innings;

    }

    /*
    |--------------------------------------------------------------------------
    | Ball Rotation
    |--------------------------------------------------------------------------
    */

    shouldRotateAfterBall(ball) {

        if (!ball)
            return false;

        const extraType =
            ball.extra?.type;

        const batterRuns =
            this.getBatterRuns(ball);

        const extraRuns =
            ball.extra?.runs || 0;

        /*
        |--------------------------------------------------------------------------
        | Bye / Leg Bye
        |--------------------------------------------------------------------------
        */

        if (
            extraType === "Bye" ||
            extraType === "Leg Bye"
        ) {

            return extraRuns % 2 === 1;

        }

        /*
        |--------------------------------------------------------------------------
        | Wide
        |--------------------------------------------------------------------------
        */

        if (
            extraType === "Wide"
        ) {

            const total =
                1 + batterRuns + Math.max(extraRuns - 1, 0);

            return total % 2 === 1;

        }

        /*
        |--------------------------------------------------------------------------
        | No Ball
        |--------------------------------------------------------------------------
        */

        if (
            extraType === "No Ball"
        ) {

            const total =
                batterRuns + extraRuns;

            return total % 2 === 1;

        }

        /*
        |--------------------------------------------------------------------------
        | Normal Delivery
        |--------------------------------------------------------------------------
        */

        return batterRuns % 2 === 1;

    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    getBatterRuns(ball) {

        if (!ball)
            return 0;

        const extraType =
            ball.extra?.type;

        if (
            extraType === "Bye" ||
            extraType === "Leg Bye"
        )
            return 0;

        return ball.runs || 0;

    }

    swap(innings) {

        const striker =
            innings.striker;

        innings.striker =
            innings.nonStriker;

        innings.nonStriker =
            striker;

    }

}

export default new StrikeRotation();
