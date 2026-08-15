import cricketMath from "./cricketMath.js";

class ScoreUpdater {

    /*
    |--------------------------------------------------------------------------
    | Update Innings
    |--------------------------------------------------------------------------
    */

    updateInnings(innings, ball) {

        if (!innings || !ball)
            return innings;

        const legal =
            cricketMath.isLegalDelivery(
                ball.extra
            );

        const teamRuns =
            cricketMath.teamRuns(ball);

        innings.score.runs += teamRuns;

        innings.score.extras +=
            ball.extra?.runs || 0;

        if (legal) {

            innings.score.balls++;

            innings.score.overs =
                cricketMath.overString(
                    innings.score.balls
                );

        }

        if (
            ball.wicket?.isWicket
        ) {

            innings.score.wickets++;

        }

        return innings;

    }

    /*
    |--------------------------------------------------------------------------
    | Chase Details
    |--------------------------------------------------------------------------
    */

    updateChase(innings) {

        if (
            !innings.target ||
            innings.target <= 0
        ) {

            return innings;

        }

        innings.requiredRuns =
            cricketMath.requiredRuns(

                innings.target,

                innings.score.runs

            );

        innings.remainingBalls =
            cricketMath.remainingBalls(

                innings.totalOvers,

                innings.score.balls

            );

        innings.currentRunRate =
            Number(

                cricketMath.currentRunRate(

                    innings.score.runs,

                    innings.score.balls

                )

            );

        innings.requiredRunRate =
            Number(

                cricketMath.requiredRunRate(

                    innings.target,

                    innings.score.runs,

                    innings.remainingBalls

                )

            );

        return innings;

    }

    /*
    |--------------------------------------------------------------------------
    | Match Status
    |--------------------------------------------------------------------------
    */

    updateStatus(innings) {

        if (
            cricketMath.hasWon(

                innings.target,

                innings.score.runs

            )
        ) {

            innings.status =
                "Completed";

            innings.result =
                "Won";

        }

        if (

            cricketMath.isAllOut(

                innings.score.wickets

            )

        ) {

            innings.status =
                "Completed";

            innings.result =
                "All Out";

        }

        if (

            innings.remainingBalls === 0

        ) {

            innings.status =
                "Completed";

        }

        return innings;

    }

    /*
    |--------------------------------------------------------------------------
    | Recent Deliveries
    |--------------------------------------------------------------------------
    */

    updateRecentBalls(

        innings,

        ball

    ) {

        if (
            !innings.recentBalls
        ) {

            innings.recentBalls = [];

        }

        innings.recentBalls.push(

            cricketMath.ballSymbol(ball)

        );

        if (

            innings.recentBalls.length > 6

        ) {

            innings.recentBalls.shift();

        }

        return innings;

    }

    /*
    |--------------------------------------------------------------------------
    | Timeline
    |--------------------------------------------------------------------------
    */

    updateTimeline(

        innings,

        ball

    ) {

        if (
            !innings.timeline
        ) {

            innings.timeline = [];

        }

        innings.timeline.push({

            over:
                ball.overNumber,

            ball:
                ball.displayNumber,

            symbol:
                cricketMath.ballSymbol(
                    ball
                ),

            runs:
                cricketMath.teamRuns(
                    ball
                ),

            wicket:
                ball.wicket?.isWicket || false,

            striker:
                ball.striker,

            bowler:
                ball.bowler,

            timestamp:
                new Date()

        });

        return innings;

    }

    /*
    |--------------------------------------------------------------------------
    | Master
    |--------------------------------------------------------------------------
    */

    process(

        innings,

        ball

    ) {

        this.updateInnings(
            innings,
            ball
        );

        this.updateChase(
            innings
        );

        this.updateStatus(
            innings
        );

        this.updateRecentBalls(
            innings,
            ball
        );

        this.updateTimeline(
            innings,
            ball
        );

        return innings;

    }

}

export default new ScoreUpdater();
