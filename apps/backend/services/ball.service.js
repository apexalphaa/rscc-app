import Ball from "../models/Ball.js";
import Innings from "../models/Innings.js";

import overService from "./over.service.js";
import scorecardService from "./scorecard.service.js";
import partnershipService from "./partnership.service.js";

import cricketMath from "../utils/cricketMath.js";
import deliveryValidator from "../utils/deliveryValidator.js";
import strikeRotation from "../utils/strikeRotation.js";
import scoreUpdater from "../utils/scoreUpdater.js";
import overManager from "../utils/overManager.js";

class BallService {

    /*
    |--------------------------------------------------------------------------
    | Innings
    |--------------------------------------------------------------------------
    */
    async getInnings(inningsId) {
        const innings = await Innings.findById(inningsId);

        if (!innings) {
            throw new Error("Innings not found.");
        }

        return innings;
    }

    /*
    |--------------------------------------------------------------------------
    | Current Over
    |--------------------------------------------------------------------------
    */
    async getCurrentOver(inningsId) {
        let over = await overService.getCurrentOver(inningsId);

        if (over) return over;

        const innings = await this.getInnings(inningsId);

        return await overService.createOver(
            inningsId,
            innings.currentBowler
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Delivery Numbers
    |--------------------------------------------------------------------------
    */
    getBallMeta(over) {
        const legalBalls = over?.statistics?.legalBalls || 0;
        const overNumber = over?.overNumber || 1;

        return {
            overNumber,
            ballInOver: legalBalls + 1,
            displayNumber: cricketMath.nextDisplayNumber(
                overNumber,
                legalBalls
            )
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Sanitize Payload
    |--------------------------------------------------------------------------
    */
    sanitizePayload(payload = {}) {
        return {
            runs: payload.runs || 0,
            extra: payload.extra || null,
            wicket: payload.wicket || null,
            shot: payload.shot || null,
            wagonZone: payload.wagonZone || null,
            notes: payload.notes || ""
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Create Ball
    |--------------------------------------------------------------------------
    */
    async createBall(innings, over, payload, scorer) {
        deliveryValidator.validate(payload);

        const data = this.sanitizePayload(payload);
        const meta = this.getBallMeta(over);
        const legalDelivery = cricketMath.isLegalDelivery(data.extra);

        const ball = await Ball.create({
            match: innings.match,
            innings: innings._id,
            over: over._id,
            overNumber: meta.overNumber,
            ballNumber: meta.ballInOver,
            displayNumber: meta.displayNumber,
            legalDelivery,
            striker: innings.striker,
            nonStriker: innings.nonStriker,
            bowler: innings.currentBowler,
            runs: data.runs,
            extra: data.extra,
            wicket: data.wicket,
            shot: data.shot,
            wagonZone: data.wagonZone,
            notes: data.notes,
            scorer
        });

        return ball;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Innings
    |--------------------------------------------------------------------------
    */
    async updateInnings(innings, ball) {
        await scoreUpdater.process(innings, ball);
        await innings.save();

        return innings;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Over
    |--------------------------------------------------------------------------
    */
    async updateOver(over, ball) {
        return await overService.addBall(
            over._id,
            ball._id,
            {
                legalDelivery: ball.legalDelivery,
                runs: cricketMath.teamRuns(ball),
                wicket: ball.wicket?.isWicket || false,
                wide: ball.extra?.type === "Wide",
                noBall: ball.extra?.type === "No Ball",
                bye: ball.extra?.type === "Bye",
                legBye: ball.extra?.type === "Leg Bye"
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Update Batter
    |--------------------------------------------------------------------------
    */
    async updateBatter(innings, ball) {
        const runsScored = cricketMath.batterRuns(ball);

        await scorecardService.updateBatting(
            innings._id,
            innings.striker,
            {
                runs: runsScored,
                ballFaced: ball.legalDelivery,
                isFour: runsScored === 4,
                isSix: runsScored === 6
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Update Bowler
    |--------------------------------------------------------------------------
    */
    async updateBowler(innings, ball) {
        await scorecardService.updateBowling(
            innings._id,
            innings.currentBowler,
            {
                legalBall: ball.legalDelivery,
                runs: cricketMath.bowlerRuns(ball),
                wicket: ball.wicket?.isWicket || false,
                wide: ball.extra?.type === "Wide",
                noBall: ball.extra?.type === "No Ball"
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Update Partnership
    |--------------------------------------------------------------------------
    */
    async updatePartnership(innings, ball) {
        await partnershipService.updatePartnership(
            innings._id,
            {
                striker: innings.striker,
                runs: cricketMath.teamRuns(ball),
                legalBall: ball.legalDelivery
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Rotate Strike
    |--------------------------------------------------------------------------
    */
    async rotateStrike(innings, ball, overCompleted = false) {
        await strikeRotation.rotate(
            innings,
            ball,
            overCompleted
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Complete Over
    |--------------------------------------------------------------------------
    */
    async completeOver(innings, over) {
        if (!overManager.shouldCreateNextOver(over)) {
            return null;
        }

        await innings.save();

        return {
            completed: true,
            nextOver: overManager.nextOverNumber(over)
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Process Delivery
    |--------------------------------------------------------------------------
    */
    async processDelivery(inningsId, payload, scorer) {
        const innings = await this.getInnings(inningsId);
        const over = await this.getCurrentOver(inningsId);

        // 1. Create Ball
        const ball = await this.createBall(innings, over, payload, scorer);

        // 2. Update Over first to refresh statistics
        const updatedOver = await this.updateOver(over, ball);

        // 3. Update Innings, Batter, Bowler & Partnership
        await this.updateInnings(innings, ball);
        await this.updateBatter(innings, ball);
        await this.updateBowler(innings, ball);
        await this.updatePartnership(innings, ball);

        // 4. Strike Rotation (Checked against fresh updated over state)
        const overCompleted = overManager.isComplete(updatedOver);
        await this.rotateStrike(innings, ball, overCompleted);

        // 5. Persist Strike Changes
        await innings.save();

        // 6. Complete Over State
        const overState = await this.completeOver(innings, updatedOver);

        return {
            success: true,
            ball,
            innings,
            over: updatedOver,
            overCompleted,
            nextOver: overState?.nextOver || null,
            scoreboard: {
                score: innings.score.runs,
                wickets: innings.score.wickets,
                overs: innings.score.overs,
                currentRunRate: innings.currentRunRate,
                requiredRunRate: innings.requiredRunRate,
                requiredRuns: innings.requiredRuns,
                remainingBalls: innings.remainingBalls,
                striker: innings.striker,
                nonStriker: innings.nonStriker,
                bowler: innings.currentBowler,
                recentBalls: innings.recentBalls
            }
        };
    }
}

export default new BallService();
