import cricketMath from "./cricketMath.js";

class OverManager {

    /*
    |--------------------------------------------------------------------------
    | Is Over Complete
    |--------------------------------------------------------------------------
    */

    isComplete(over) {

        if (!over)
            return false;

        return cricketMath.isOverComplete(
            over.statistics.legalBalls
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Next Over Number
    |--------------------------------------------------------------------------
    */

    nextOverNumber(over) {

        return cricketMath.nextOverNumber(
            over.overNumber
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Need New Over
    |--------------------------------------------------------------------------
    */

    shouldCreateNextOver(over) {

        return this.isComplete(over);

    }

    /*
    |--------------------------------------------------------------------------
    | Rotate Strike
    |--------------------------------------------------------------------------
    */

    shouldRotateAtEnd(over) {

        return this.isComplete(over);

    }

    /*
    |--------------------------------------------------------------------------
    | Maiden Over
    |--------------------------------------------------------------------------
    */

    isMaiden(over) {

        if (!over)
            return false;

        return over.statistics.runs === 0;

    }

    /*
    |--------------------------------------------------------------------------
    | Over Summary
    |--------------------------------------------------------------------------
    */

    summary(over, balls = []) {

        const symbols = balls.map(ball =>
            cricketMath.ballSymbol(ball)
        );

        return {

            overNumber:
                over.overNumber,

            runs:
                over.statistics.runs,

            wickets:
                over.statistics.wickets,

            legalBalls:
                over.statistics.legalBalls,

            wides:
                over.statistics.wides,

            noBalls:
                over.statistics.noBalls,

            byes:
                over.statistics.byes,

            legByes:
                over.statistics.legByes,

            maiden:
                this.isMaiden(over),

            completed:
                this.isComplete(over),

            deliveries:
                symbols

        };

    }

    /*
    |--------------------------------------------------------------------------
    | Current Over Display
    |--------------------------------------------------------------------------
    */

    currentDisplay(over) {

        return `${

            over.overNumber

        }.${

            over.statistics.legalBalls

        }`;

    }

    /*
    |--------------------------------------------------------------------------
    | New Over State
    |--------------------------------------------------------------------------
    */

    createState(currentOver) {

        return {

            overNumber:
                this.nextOverNumber(
                    currentOver
                ),

            legalBalls: 0,

            runs: 0,

            wickets: 0,

            wides: 0,

            noBalls: 0,

            byes: 0,

            legByes: 0

        };

    }

}

export default new OverManager();
