class CricketMath {

    /*
    |--------------------------------------------------------------------------
    | Overs & Balls
    |--------------------------------------------------------------------------
    */

    overString(balls = 0) {

        const completedOvers = Math.floor(balls / 6);
        const remainingBalls = balls % 6;

        return Number(`${completedOvers}.${remainingBalls}`);

    }

    ballsToOvers(balls = 0) {

        return this.overString(balls);

    }

    oversToBalls(overs = 0) {

        const whole = Math.floor(overs);
        const balls = Math.round((overs - whole) * 10);

        return (whole * 6) + balls;

    }

    nextDisplayNumber(overNumber, legalBalls) {

        return `${overNumber}.${legalBalls + 1}`;

    }

    nextOverNumber(currentOver) {

        return currentOver + 1;

    }

    /*
    |--------------------------------------------------------------------------
    | Delivery Type
    |--------------------------------------------------------------------------
    */

    isLegalDelivery(extra = {}) {

        if (!extra || !extra.type)
            return true;

        return ![
            "Wide",
            "No Ball"
        ].includes(extra.type);

    }

    isBoundary(runs = 0) {

        return runs === 4 || runs === 6;

    }

    isOverComplete(legalBalls) {

        return legalBalls >= 6;

    }

    /*
    |--------------------------------------------------------------------------
    | Runs
    |--------------------------------------------------------------------------
    */

    batterRuns(ball) {

        if (!ball)
            return 0;

        const type =
            ball.extra?.type;

        if (
            type === "Bye" ||
            type === "Leg Bye"
        ) {

            return 0;

        }

        return ball.runs || 0;

    }

    bowlerRuns(ball) {

        if (!ball)
            return 0;

        const type =
            ball.extra?.type;

        switch (type) {

            case "Bye":
            case "Leg Bye":

                return 0;

            case "Wide":
            case "No Ball":

                return (
                    (ball.runs || 0) +
                    (ball.extra?.runs || 0)
                );

            default:

                return (
                    (ball.runs || 0) +
                    (ball.extra?.runs || 0)
                );

        }

    }

    teamRuns(ball) {

        if (!ball)
            return 0;

        return (
            (ball.runs || 0) +
            (ball.extra?.runs || 0)
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Strike Rotation
    |--------------------------------------------------------------------------
    */

    shouldRotateStrike(ball) {

        const total =
            this.teamRuns(ball);

        return total % 2 === 1;

    }

    shouldRotateEndOfOver() {

        return true;

    }

    /*
    |--------------------------------------------------------------------------
    | Run Rates
    |--------------------------------------------------------------------------
    */

    currentRunRate(runs, balls) {

        if (!balls)
            return 0;

        return (
            (runs * 6) /
            balls
        ).toFixed(2);

    }

    requiredRunRate(target, runs, ballsRemaining) {

        if (
            !target ||
            ballsRemaining <= 0
        )
            return 0;

        const required =
            target - runs;

        if (required <= 0)
            return 0;

        return (
            (required * 6) /
            ballsRemaining
        ).toFixed(2);

    }

    /*
    |--------------------------------------------------------------------------
    | Batter Stats
    |--------------------------------------------------------------------------
    */

    strikeRate(runs, balls) {

        if (!balls)
            return 0;

        return (
            (runs * 100) /
            balls
        ).toFixed(2);

    }

    battingAverage(runs, outs) {

        if (!outs)
            return runs;

        return (
            runs /
            outs
        ).toFixed(2);

    }

    /*
    |--------------------------------------------------------------------------
    | Bowling Stats
    |--------------------------------------------------------------------------
    */

    economyRate(runs, balls) {

        if (!balls)
            return 0;

        return (
            (runs * 6) /
            balls
        ).toFixed(2);

    }

    bowlingAverage(runs, wickets) {

        if (!wickets)
            return 0;

        return (
            runs /
            wickets
        ).toFixed(2);

    }

    bowlingStrikeRate(balls, wickets) {

        if (!wickets)
            return 0;

        return (
            balls /
            wickets
        ).toFixed(2);

    }

    /*
    |--------------------------------------------------------------------------
    | Match
    |--------------------------------------------------------------------------
    */

    requiredRuns(target, currentScore) {

        return Math.max(
            target - currentScore,
            0
        );

    }

    remainingBalls(totalOvers, ballsBowled) {

        return Math.max(
            (totalOvers * 6) - ballsBowled,
            0
        );

    }

    hasWon(target, score) {

        return score >= target;

    }

    isAllOut(wickets) {

        return wickets >= 10;

    }

    /*
    |--------------------------------------------------------------------------
    | Partnership
    |--------------------------------------------------------------------------
    */

    partnershipStrikeRate(runs, balls) {

        if (!balls)
            return 0;

        return (
            (runs * 100) /
            balls
        ).toFixed(2);

    }

    /*
    |--------------------------------------------------------------------------
    | Display Helpers
    |--------------------------------------------------------------------------
    */

    ballSymbol(ball) {

        if (!ball)
            return ".";

        if (
            ball.wicket?.isWicket
        )
            return "W";

        const extra =
            ball.extra?.type;

        switch (extra) {

            case "Wide":

                return `Wd${ball.extra.runs}`;

            case "No Ball":

                return `Nb${ball.extra.runs}`;

            case "Bye":

                return `B${ball.extra.runs}`;

            case "Leg Bye":

                return `Lb${ball.extra.runs}`;

            default:

                return `${ball.runs}`;

        }

    }

}

export default new CricketMath();
