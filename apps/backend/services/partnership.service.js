import Partnership from "../models/Partnership.js";
import Innings from "../models/Innings.js";

class PartnershipService {

    /*
    |--------------------------------------------------------------------------
    | Current Partnership
    |--------------------------------------------------------------------------
    */
    async getCurrentPartnership(inningsId) {
        const partnership = await Partnership.findOne({
            innings: inningsId,
            ended: false,
        })
        .populate("striker")
        .populate("nonStriker");

        return partnership;
    }

    /*
    |--------------------------------------------------------------------------
    | Create Partnership
    |--------------------------------------------------------------------------
    */
    async createPartnership(inningsId) {
        const innings = await Innings.findById(inningsId);

        if (!innings) {
            throw new Error("Innings not found.");
        }

        const current = await this.getCurrentPartnership(inningsId);
        if (current) return current;

        const partnership = await Partnership.create({
            match: innings.match,
            innings: innings._id,
            striker: innings.striker,
            nonStriker: innings.nonStriker,
            runs: 0,
            balls: 0,
            strikerRuns: 0,
            strikerBalls: 0,
            nonStrikerRuns: 0,
            nonStrikerBalls: 0,
            ended: false
        });

        innings.currentPartnership = partnership._id;
        await innings.save();

        return partnership;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Partnership
    |--------------------------------------------------------------------------
    */
    async updatePartnership(inningsId, payload) {
        const partnership = await this.getCurrentPartnership(inningsId);

        if (!partnership) {
            throw new Error("Partnership not found.");
        }

        const { striker, runs, legalBall } = payload;

        partnership.runs = (partnership.runs || 0) + runs;

        if (legalBall) {
            partnership.balls = (partnership.balls || 0) + 1;
        }

        // Target the inner ID to circumvent breaking populated Object issues
        const currentStrikerId = String(partnership.striker?._id || partnership.striker);

        if (String(striker) === currentStrikerId) {
            partnership.strikerRuns = (partnership.strikerRuns || 0) + runs;
            if (legalBall) {
                partnership.strikerBalls = (partnership.strikerBalls || 0) + 1;
            }
        } else {
            partnership.nonStrikerRuns = (partnership.nonStrikerRuns || 0) + runs;
            if (legalBall) {
                partnership.nonStrikerBalls = (partnership.nonStrikerBalls || 0) + 1;
            }
        }

        await partnership.save();
        return partnership;
    }

    /*
    |--------------------------------------------------------------------------
    | End Partnership
    |--------------------------------------------------------------------------
    */
    async endPartnership(inningsId, wicketBallId) {
        const innings = await Innings.findById(inningsId);
        const partnership = await this.getCurrentPartnership(inningsId);

        if (!partnership) return null;

        partnership.ended = true;
        partnership.endedAt = new Date();
        partnership.wicket = wicketBallId;
        await partnership.save();

        if (innings) {
            innings.currentPartnership = null;
            await innings.save();
        }

        return partnership;
    }

    /*
    |--------------------------------------------------------------------------
    | Get Partnership History
    |--------------------------------------------------------------------------
    */
    async getPartnerships(inningsId) {
        return Partnership.find({ innings: inningsId })
            .populate("striker", "fullName playerId")
            .populate("nonStriker", "fullName playerId")
            .sort({ createdAt: 1 });
    }

    /*
    |--------------------------------------------------------------------------
    | Highest Partnership
    |--------------------------------------------------------------------------
    */
    async getHighestPartnership(inningsId) {
        return Partnership.findOne({ innings: inningsId })
            .populate("striker")
            .populate("nonStriker")
            .sort({ runs: -1 });
    }

    /*
    |--------------------------------------------------------------------------
    | Current Partnership Summary
    |--------------------------------------------------------------------------
    */
    async currentSummary(inningsId) {
        const partnership = await this.getCurrentPartnership(inningsId);
        if (!partnership) return null;

        const runRate = !partnership.balls || partnership.balls === 0
            ? 0
            : Number(((partnership.runs * 6) / partnership.balls).toFixed(2));

        return {
            runs: partnership.runs,
            balls: partnership.balls,
            striker: partnership.striker,
            nonStriker: partnership.nonStriker,
            strikerRuns: partnership.strikerRuns,
            strikerBalls: partnership.strikerBalls,
            nonStrikerRuns: partnership.nonStrikerRuns,
            nonStrikerBalls: partnership.nonStrikerBalls,
            runRate,
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Partnership Percentage
    |--------------------------------------------------------------------------
    */
    partnershipPercentage(partnershipRuns, inningsRuns) {
        if (!inningsRuns || inningsRuns === 0) return 0;
        return Number(((partnershipRuns * 100) / inningsRuns).toFixed(2));
    }

    /*
    |--------------------------------------------------------------------------
    | Partnership Contribution
    |--------------------------------------------------------------------------
    */
    contribution(partnership) {
        return {
            strikerPercentage: this.partnershipPercentage(
                partnership.strikerRuns,
                partnership.runs
            ),
            nonStrikerPercentage: this.partnershipPercentage(
                partnership.nonStrikerRuns,
                partnership.runs
            ),
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Innings Summary
    |--------------------------------------------------------------------------
    */
    async inningsSummary(inningsId) {
        const partnerships = await this.getPartnerships(inningsId);

        let totalRuns = 0;
        let totalBalls = 0;

        partnerships.forEach(p => {
            totalRuns += p.runs || 0;
            totalBalls += p.balls || 0;
        });

        return {
            totalPartnerships: partnerships.length,
            totalRuns,
            totalBalls,
            highest: partnerships.length
                ? partnerships.reduce((best, current) => (current.runs || 0) > (best.runs || 0) ? current : best)
                : null,
            partnerships,
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Reset Innings Partnerships
    |--------------------------------------------------------------------------
    */
    async resetInnings(inningsId) {
        await Partnership.deleteMany({ innings: inningsId });
        return true;
    }
}

export default new PartnershipService();
