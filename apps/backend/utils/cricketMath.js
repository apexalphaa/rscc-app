class StatisticsService {

    /*
    |--------------------------------------------------------------------------
    | Batting
    |--------------------------------------------------------------------------
    */

    strikeRate(runs, balls) {

        if (balls === 0)
            return 0;

        return Number(

            (
                runs * 100
            ) / balls

        ).toFixed(2);

    }

    battingAverage(runs, inningsOut) {

        if (inningsOut === 0)
            return runs;

        return Number(

            runs / inningsOut

        ).toFixed(2);

    }

    boundaryPercentage(

        fours,

        sixes,

        balls

    ) {

        if (balls === 0)
            return 0;

        return Number(

            (

                (fours + sixes)

                * 100

            ) / balls

        ).toFixed(2);

    }

    /*
    |--------------------------------------------------------------------------
    | Bowling
    |--------------------------------------------------------------------------
    */

    economy(runs, balls) {

        if (balls === 0)
            return 0;

        return Number(

            (

                runs

                /

                (balls / 6)

            )

        ).toFixed(2);

    }

    bowlingAverage(

        runs,

        wickets

    ) {

        if (wickets === 0)
            return runs;

        return Number(

            runs / wickets

        ).toFixed(2);

    }

    bowlingStrikeRate(

        balls,

        wickets

    ) {

        if (wickets === 0)
            return balls;

        return Number(

            balls / wickets

        ).toFixed(2);

    }

    dotBallPercentage(

        dots,

        balls

    ) {

        if (balls === 0)
            return 0;

        return Number(

            (

                dots

                * 100

            ) / balls

        ).toFixed(2);

    }

    /*
    |--------------------------------------------------------------------------
    | Innings
    |--------------------------------------------------------------------------
    */

    currentRunRate(

        runs,

        balls

    ) {

        if (balls === 0)
            return 0;

        return Number(

            (

                runs

                /

                (balls / 6)

            )

        ).toFixed(2);

    }

    requiredRunRate(

        target,

        runs,

        remainingBalls

    ) {

        if (remainingBalls === 0)
            return 0;

        return Number(

            (

                (target - runs)

                /

                (remainingBalls / 6)

            )

        ).toFixed(2);

    }

    /*
    |--------------------------------------------------------------------------
    | Match
    |--------------------------------------------------------------------------
    */

    matchWinner(

        firstRuns,

        secondRuns,

        wicketsLeft

    ) {

        if (

            secondRuns >

            firstRuns

        ) {

            return {

                result:

                    "Won by Wickets",

                margin:

                    `${wicketsLeft} Wickets`,

            };

        }

        if (

            firstRuns >

            secondRuns

        ) {

            return {

                result:

                    "Won by Runs",

                margin:

                    `${

                        firstRuns -

                        secondRuns

                    } Runs`,

            };

        }

        return {

            result:"Tie",

            margin:"",

        };

    }

    /*
    |--------------------------------------------------------------------------
    | Overs
    |--------------------------------------------------------------------------
    */

    overString(

        balls

    ) {

        const overs =

            Math.floor(

                balls / 6

            );

        const rem =

            balls % 6;

        return `${overs}.${rem}`;

    }

    /*
    |--------------------------------------------------------------------------
    | Projection
    |--------------------------------------------------------------------------
    */

    projectedScore(

        currentRuns,

        currentBalls,

        totalOvers

    ) {

        if (

            currentBalls === 0

        )

            return 0;

        const rpo =

            currentRuns

            /

            (currentBalls / 6);

        return Math.round(

            rpo *

            totalOvers

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Partnership
    |--------------------------------------------------------------------------
    */

    partnershipRunRate(

        runs,

        balls

    ) {

        return this.currentRunRate(

            runs,

            balls

        );

    }

}

export default new StatisticsService();
