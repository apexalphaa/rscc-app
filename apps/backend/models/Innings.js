import mongoose from "mongoose";

const inningsSchema = new mongoose.Schema(
{
    /*
    |--------------------------------------------------------------------------
    | References
    |--------------------------------------------------------------------------
    */

    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
        required: true,
        index: true,
    },

    inningsNumber: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4],
    },

    battingTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
        index: true,
    },

    bowlingTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
        index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Current Players
    |--------------------------------------------------------------------------
    */

    striker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
    },

    nonStriker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
    },

    currentBowler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
    },

    /*
    |--------------------------------------------------------------------------
    | Score
    |--------------------------------------------------------------------------
    */

    score: {
        runs: {
            type: Number,
            default: 0,
        },
        wickets: {
            type: Number,
            default: 0,
        },
        overs: {
            type: Number,
            default: 0,
        },
        balls: {
            type: Number,
            default: 0,
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Extras (Single Unified Source of Truth)
    |--------------------------------------------------------------------------
    */

    extras: {
        total: {
            type: Number,
            default: 0,
        },
        wides: {
            type: Number,
            default: 0,
        },
        noBalls: {
            type: Number,
            default: 0,
        },
        byes: {
            type: Number,
            default: 0,
        },
        legByes: {
            type: Number,
            default: 0,
        },
        penalties: {
            type: Number,
            default: 0,
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Batting & Bowling Lineups
    |--------------------------------------------------------------------------
    */

    battingOrder: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        }
    ],

    yetToBat: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        }
    ],

    dismissedPlayers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        }
    ],

    bowlersUsed: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        }
    ],

    /*
    |--------------------------------------------------------------------------
    | Live Feed Telemetry
    |--------------------------------------------------------------------------
    */

    recentBalls: [
        {
            type: String, // Stores last 6 delivery descriptions, e.g., ["1", "W", "4"]
        }
    ],

    lastBall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ball",
        default: null,
    },

    /*
    |--------------------------------------------------------------------------
    | Match State & Target Metrics
    |--------------------------------------------------------------------------
    */

    target: {
        type: Number,
        default: 0,
    },

    requiredRuns: {
        type: Number,
        default: 0,
    },

    remainingBalls: {
        type: Number,
        default: 0,
    },

    currentRunRate: {
        type: Number,
        default: 0,
    },

    requiredRunRate: {
        type: Number,
        default: 0,
    },

    /*
    |--------------------------------------------------------------------------
    | References
    |--------------------------------------------------------------------------
    */

    currentPartnership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partnership",
    },

    currentOver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Over",
    },

    /*
    |--------------------------------------------------------------------------
    | Match Flags & Status
    |--------------------------------------------------------------------------
    */

    isDeclared: {
        type: Boolean,
        default: false,
    },

    followOn: {
        type: Boolean,
        default: false,
    },

    superOver: {
        type: Boolean,
        default: false,
    },

    status: {
        type: String,
        enum: ["Not Started", "Live", "Completed"],
        default: "Not Started",
        index: true,
    },

    completedAt: Date,
},
{
    timestamps: true,
    versionKey: false,
}
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

inningsSchema.index(
    { match: 1, inningsNumber: 1 },
    { unique: true }
);

export default mongoose.model("Innings", inningsSchema);
