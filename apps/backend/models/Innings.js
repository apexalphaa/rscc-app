import mongoose from "mongoose";

const inningsSchema = new mongoose.Schema(
{
    /*
    |--------------------------------------------------------------------------
    | References
    |--------------------------------------------------------------------------
    */

    match:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Match",

        required:true,

        index:true,

    },

    inningsNumber:{

        type:Number,

        required:true,

        enum:[1,2,3,4],

    },

    battingTeam:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Team",

        required:true,

    },

    bowlingTeam:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Team",

        required:true,

    },

    /*
    |--------------------------------------------------------------------------
    | Current Players
    |--------------------------------------------------------------------------
    */

    striker:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Player",

    },

    nonStriker:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Player",

    },

    currentBowler:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Player",

    },

    /*
    |--------------------------------------------------------------------------
    | Score
    |--------------------------------------------------------------------------
    */

    score:{

        runs:{
            type:Number,
            default:0,
        },

        wickets:{
            type:Number,
            default:0,
        },

        overs:{
            type:Number,
            default:0,
        },

        balls:{
            type:Number,
            default:0,
        },

        extras:{
            type:Number,
            default:0,
        },

    },

    /*
    |--------------------------------------------------------------------------
    | Extras
    |--------------------------------------------------------------------------
    */

    extras:{

        wides:{
            type:Number,
            default:0,
        },

        noBalls:{
            type:Number,
            default:0,
        },

        byes:{
            type:Number,
            default:0,
        },

        legByes:{
            type:Number,
            default:0,
        },

        penalties:{
            type:Number,
            default:0,
        },

    },

    /*
    |--------------------------------------------------------------------------
    | Batting
    |--------------------------------------------------------------------------
    */

    battingOrder:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        }
    ],

    yetToBat:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        }
    ],

    dismissedPlayers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        }
    ],

    /*
    |--------------------------------------------------------------------------
    | Bowling
    |--------------------------------------------------------------------------
    */

    bowlersUsed:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        }
    ],

    /*
    |--------------------------------------------------------------------------
    | Match State
    |--------------------------------------------------------------------------
    */

    target:{

        type:Number,

        default:0,

    },

    requiredRuns:{

        type:Number,

        default:0,

    },

    remainingBalls:{

        type:Number,

        default:0,

    },

    currentRunRate:{

        type:Number,

        default:0,

    },

    requiredRunRate:{

        type:Number,

        default:0,

    },

    /*
    |--------------------------------------------------------------------------
    | References
    |--------------------------------------------------------------------------
    */

    currentPartnership:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Partnership",

    },

    currentOver:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Over",

    },

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    status:{

        type:String,

        enum:[
            "Not Started",
            "Live",
            "Completed",
        ],

        default:"Not Started",

    },

    completedAt:Date,

},
{
    timestamps:true,

    versionKey:false,

}
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

inningsSchema.index({

    match:1,

    inningsNumber:1,

},
{
    unique:true,
});

inningsSchema.index({

    battingTeam:1,

});

inningsSchema.index({

    bowlingTeam:1,

});

inningsSchema.index({

    status:1,

});

export default mongoose.model(

    "Innings",

    inningsSchema

);
