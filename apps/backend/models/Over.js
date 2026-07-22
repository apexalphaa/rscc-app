import mongoose from "mongoose";

const overSchema = new mongoose.Schema(
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

    innings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Innings",
        required: true,
        index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Over Details
    |--------------------------------------------------------------------------
    */

    overNumber: {
        type: Number,
        required: true,
    },

    bowler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true,
        index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Balls & Display Summary
    |--------------------------------------------------------------------------
    */

    balls: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ball",
        }
    ],

    summary: {
        type: String,
        default: "", // Example: "1 4 . W 2 6"
    },

    /*
    |--------------------------------------------------------------------------
    | Over Statistics
    |--------------------------------------------------------------------------
    */

    statistics: {
        legalBalls: {
            type: Number,
            default: 0,
        },
        totalBalls: {
            type: Number,
            default: 0,
        },
        runs: {
            type: Number,
            default: 0,
        },
        wickets: {
            type: Number,
            default: 0,
        },
        dots: {
            type: Number,
            default: 0,
        },
        singles: {
            type: Number,
            default: 0,
        },
        doubles: {
            type: Number,
            default: 0,
        },
        triples: {
            type: Number,
            default: 0,
        },
        fours: {
            type: Number,
            default: 0,
        },
        sixes: {
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
    | Status
    |--------------------------------------------------------------------------
    */

    completed: {
        type: Boolean,
        default: false,
    },

    maiden: {
        type: Boolean,
        default: false,
    },

    economy: {
        type: Number,
        default: 0,
    }
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

overSchema.index(
    { innings: 1, overNumber: 1 },
    { unique: true }
);

export default mongoose.model("Over", overSchema);
