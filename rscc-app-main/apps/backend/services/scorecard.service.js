import Scorecard from "../models/Scorecard.js";
import cricketMath from "../utils/cricketMath.js";

class ScorecardService {

    /*
    |--------------------------------------------------------------------------
    | Get Scorecard
    |--------------------------------------------------------------------------
    */

    async getScorecard(inningsId) {

        const scorecard =
            await Scorecard.findOne({
                innings: inningsId
            });

        if (!scorecard)
            throw new Error("Scorecard not found.");

        return scorecard;

    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    getBattingFigure(scorecard, playerId) {

        return scorecard.batting.find(
            player =>
                player.player.toString() === playerId.toString()
        );

    }

    getBowlingFigure(scorecard, playerId) {

        return scorecard.bowling.find(
            player =>
                player.player.toString() === playerId.toString()
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Batting
    |--------------------------------------------------------------------------
    */

    async updateBatting(
        inningsId,
        playerId,
        payload
    ) {

        const scorecard =
            await this.getScorecard(
                inningsId
            );

        const batter =
            this.getBattingFigure(
                scorecard,
                playerId
            );

        if (!batter)
            throw new Error("Batting figure not found.");

        const runs =
            payload.runs || 0;

        batter.runs += runs;

        if (payload.ballFaced)
            batter.balls++;

        if (payload.four)
            batter.fours++;

        if (payload.six)
            batter.sixes++;

        batter.strikeRate =
            Number(
                cricketMath.strikeRate(
                    batter.runs,
                    batter.balls
                )
            );

        await scorecard.save();

        return batter;

    }

    /*
    |--------------------------------------------------------------------------
    | Bowling
    |--------------------------------------------------------------------------
    */

    async updateBowling(
        inningsId,
        playerId,
        payload
    ) {

        const scorecard =
            await this.getScorecard(
                inningsId
            );

        const bowler =
            this.getBowlingFigure(
                scorecard,
                playerId
            );

        if (!bowler)
            throw new Error("Bowling figure not found.");

        const runs =
            payload.runs || 0;

        bowler.runs += runs;

        if (payload.legalBall) {

            const currentBalls =
                cricketMath.oversToBalls(
                    bowler.overs
                ) + 1;

            bowler.overs =
                cricketMath.overString(
                    currentBalls
                );

        }

        if (payload.wicket)
            bowler.wickets++;

        if (payload.wide)
            bowler.wides++;

        if (payload.noBall)
            bowler.noBalls++;

        const totalBalls =
            cricketMath.oversToBalls(
                bowler.overs
            );

        bowler.economy =
            Number(
                cricketMath.economyRate(
                    bowler.runs,
                    totalBalls
                )
            );

        await scorecard.save();

        return bowler;

    }

    /*
    |--------------------------------------------------------------------------
    | Dismissal
    |--------------------------------------------------------------------------
    */

    async setDismissal(
        inningsId,
        batterId,
        dismissal
    ) {

        const scorecard =
            await this.getScorecard(
                inningsId
            );

        const batter =
            this.getBattingFigure(
                scorecard,
                batterId
            );

        if (!batter)
            throw new Error("Batting figure not found.");

        batter.isOut = true;

        batter.dismissal =
            dismissal.dismissal;

        batter.dismissedBy =
            dismissal.dismissedBy || null;

        batter.assistedBy =
            dismissal.assistedBy || null;

        await scorecard.save();

        return batter;

    }

}

export default new ScorecardService();
