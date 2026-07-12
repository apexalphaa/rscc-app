import Over from "../models/Over.js";
import Innings from "../models/Innings.js";

class OverService {

    /*
    |--------------------------------------------------------------------------
    | Get Current Over
    |--------------------------------------------------------------------------
    */
    async getCurrentOver(inningsId) {
        const innings = await Innings.findById(inningsId);

        if (!innings) {
            throw new Error("Innings not found.");
        }

        if (!innings.currentOver) return null;

        return Over.findById(innings.currentOver)
            .populate("bowler")
            .populate("balls");
    }

    /*
    |--------------------------------------------------------------------------
    | Create Over
    |--------------------------------------------------------------------------
    */
    async createOver(inningsId, bowlerId) {
        const innings = await Innings.findById(inningsId);

        if (!innings) {
            throw new Error("Innings not found.");
        }

        const overNumber = await Over.countDocuments({ innings: inningsId });

        const over = await Over.create({
            match: innings.match,
            innings: inningsId,
            overNumber: overNumber + 1,
            bowler: bowlerId,
            balls: [],
            completed: false,
            maiden: false,
            economy: 0,
            statistics: {
                runs: 0,
                legalBalls: 0,
                wickets: 0,
                wides: 0,
                noBalls: 0,
                byes: 0,
                legByes: 0,
                dots: 0,
                fours: 0,
                sixes: 0
            }
        });

        innings.currentOver = over._id;
        innings.currentBowler = bowlerId;
        await innings.save();

        return over;
    }

    /*
    |--------------------------------------------------------------------------
    | Add Ball
    |--------------------------------------------------------------------------
    */
    async addBall(overId, ballId, payload) {
        const over = await Over.findById(overId);

        if (!over) {
            throw new Error("Over not found.");
        }

        over.balls.push(ballId);

        // Enforce hard fallback defaults to secure calculations against NaN values
        const {
            legalDelivery = true,
            runs = 0,
            wicket = false,
            wide = false,
            noBall = false,
            bye = false,
            legBye = false,
        } = payload;

        over.statistics.runs = (over.statistics.runs || 0) + runs;

        if (legalDelivery) over.statistics.legalBalls = (over.statistics.legalBalls || 0) + 1;
        if (wicket) over.statistics.wickets = (over.statistics.wickets || 0) + 1;
        if (wide) over.statistics.wides = (over.statistics.wides || 0) + 1;
        if (noBall) over.statistics.noBalls = (over.statistics.noBalls || 0) + 1;
        if (bye) over.statistics.byes = (over.statistics.byes || 0) + 1;
        if (legBye) over.statistics.legByes = (over.statistics.legByes || 0) + 1;

        // In cricket, dots are legal deliveries where no runs come off the bat or extras
        if (legalDelivery && runs === 0 && !bye && !legBye) {
            over.statistics.dots = (over.statistics.dots || 0) + 1;
        }

        if (runs === 4 && !bye && !legBye) over.statistics.fours = (over.statistics.fours || 0) + 1;
        if (runs === 6 && !bye && !legBye) over.statistics.sixes = (over.statistics.sixes || 0) + 1;

        await over.save();
        return over;
    }

    /*
    |--------------------------------------------------------------------------
    | Complete Over
    |--------------------------------------------------------------------------
    */
    async completeOver(overId) {
        const over = await Over.findById(overId);

        if (!over) {
            throw new Error("Over not found.");
        }

        over.completed = true;

        // Cricket Rule: Byes/Legbyes do not count against bowler runs. Wides/NoBalls do.
        const bowlerRunsConceded = over.statistics.runs - (over.statistics.byes + over.statistics.legByes);
        
        if (bowlerRunsConceded === 0) {
            over.maiden = true;
        }

        const oversBowled = over.statistics.legalBalls / 6;
        over.economy = oversBowled === 0
            ? 0
            : Number((over.statistics.runs / oversBowled).toFixed(2));

        await over.save();
        return over;
    }

    /*
    |--------------------------------------------------------------------------
    | Is Over Complete
    |--------------------------------------------------------------------------
    */
    isOverComplete(over) {
        return (over?.statistics?.legalBalls >= 6);
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Bowler
    |--------------------------------------------------------------------------
    */
    async validateBowler(innings, bowlerId) {
        if (String(innings.currentBowler) === String(bowlerId)) {
            throw new Error("Same bowler cannot bowl consecutive overs.");
        }
        return true;
    }

    /*
    |--------------------------------------------------------------------------
    | Start Next Over
    |--------------------------------------------------------------------------
    */
    async nextOver(inningsId, bowlerId) {
        const innings = await Innings.findById(inningsId);

        if (!innings) {
            throw new Error("Innings not found.");
        }

        await this.validateBowler(innings, bowlerId);
        return this.createOver(inningsId, bowlerId);
    }

    /*
    |--------------------------------------------------------------------------
    | Over Summary
    |--------------------------------------------------------------------------
    */
    async summary(overId) {
        return Over.findById(overId)
            .populate("bowler", "fullName playerId")
            .populate("balls");
    }

    /*
    |--------------------------------------------------------------------------
    | Remove Last Ball (Fully Supported Reversal)
    |--------------------------------------------------------------------------
    */
    async removeLastBall(overId, ballPayload) {
        const over = await Over.findById(overId);

        if (!over) {
            throw new Error("Over not found.");
        }

        if (over.balls.length === 0) return null;

        const removedBallId = over.balls.pop();

        // Destructure configuration variables of the undone ball to safely scrub the over model state
        const {
            legalDelivery = true,
            runs = 0,
            wicket = false,
            wide = false,
            noBall = false,
            bye = false,
            legBye = false,
        } = ballPayload;

        over.statistics.runs = Math.max(0, (over.statistics.runs || 0) - runs);

        if (legalDelivery) over.statistics.legalBalls = Math.max(0, (over.statistics.legalBalls || 0) - 1);
        if (wicket) over.statistics.wickets = Math.max(0, (over.statistics.wickets || 0) - 1);
        if (wide) over.statistics.wides = Math.max(0, (over.statistics.wides || 0) - 1);
        if (noBall) over.statistics.noBalls = Math.max(0, (over.statistics.noBalls || 0) - 1);
        if (bye) over.statistics.byes = Math.max(0, (over.statistics.byes || 0) - 1);
        if (legBye) over.statistics.legByes = Math.max(0, (over.statistics.legByes || 0) - 1);

        if (legalDelivery && runs === 0 && !bye && !legBye) {
            over.statistics.dots = Math.max(0, (over.statistics.dots || 0) - 1);
        }

        if (runs === 4 && !bye && !legBye) over.statistics.fours = Math.max(0, (over.statistics.fours || 0) - 1);
        if (runs === 6 && !bye && !legBye) over.statistics.sixes = Math.max(0, (over.statistics.sixes || 0) - 1);

        // Reset completion statuses if undo is executed post-over ending cycle
        over.completed = false;
        over.maiden = false;

        await over.save();
        return removedBallId;
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Empty Over
    |--------------------------------------------------------------------------
    */
    async deleteIfEmpty(overId) {
        const over = await Over.findById(overId);
        if (!over) return;

        if (over.balls.length === 0) {
            const innings = await Innings.findById(over.innings);
            if (innings) {
                innings.currentOver = null;
                await innings.save();
            }
            await over.deleteOne();
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Over Exists
    |--------------------------------------------------------------------------
    */
    async exists(inningsId, overNumber) {
        return Over.exists({
            innings: inningsId,
            overNumber,
        });
    }
}

export default new OverService();
