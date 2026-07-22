import mongoose from "mongoose";

const ballSchema = new mongoose.Schema(
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

    over: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Over",
        index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Sequence & Numbers
    |--------------------------------------------------------------------------
    */

    ballSequence: {
        type: Number,
        required: true,
        index: true,
    },

    overNumber: {
        type: Number,
        required: true,
    },

    ballInOver: {
        type: Number,
        required: true,
    },

    displayNumber: {
        type: String,
        default: "0.0",
    },

    /*
    |--------------------------------------------------------------------------
    | Match Phase & State
    |--------------------------------------------------------------------------
    */

    phase: {
        type: String,
        enum: ["Powerplay", "Middle", "Death", "Super Over"],
        default: "Middle",
    },

    powerplay: {
        type: Boolean,
        default: false,
    },

    /*
    |--------------------------------------------------------------------------
    | Players
    |--------------------------------------------------------------------------
    */

    striker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true,
        index: true,
    },

    nonStriker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
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
    | Runs & Extras
    |--------------------------------------------------------------------------
    */

    runs: {
        type: Number,
        default: 0,
        min: 0,
        max: 6,
    },

    extra: {
        type: {
            type: String,
            enum: [
                "",
                "Wide",
                "No Ball",
                "Bye",
                "Leg Bye",
                "Penalty",
            ],
            default: "",
        },
        runs: {
            type: Number,
            default: 0,
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Wicket
    |--------------------------------------------------------------------------
    */

    wicket: {
        isWicket: {
            type: Boolean,
            default: false,
        },
        batsman: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
        bowler: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
        fielder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
        dismissalType: {
            type: String,
            enum: [
                "",
                "Bowled",
                "Caught",
                "LBW",
                "Run Out",
                "Stumped",
                "Hit Wicket",
                "Retired Out",
                "Obstructing Field",
                "Timed Out",
            ],
            default: "",
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Flags
    |--------------------------------------------------------------------------
    */

    legalDelivery: {
        type: Boolean,
        default: true,
    },

    freeHit: {
        type: Boolean,
        default: false,
    },

    reviewTaken: {
        type: Boolean,
        default: false,
    },

    overturned: {
        type: Boolean,
        default: false,
    },

    /*
    |--------------------------------------------------------------------------
    | Commentary
    |--------------------------------------------------------------------------
    */

    commentary: {
        auto: {
            type: String,
            default: "",
        },
        manual: {
            type: String,
            default: "",
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Audit
    |--------------------------------------------------------------------------
    */

    scorer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

ballSchema.index({
    innings: 1,
    overNumber: 1,
    ballInOver: 1,
});

ballSchema.index({
    innings: 1,
    ballSequence: 1,
});

export default mongoose.model("Ball", ballSchema);
