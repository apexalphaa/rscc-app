import mongoose from "mongoose";

const overSchema = new mongoose.Schema(
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

    innings:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Innings",

        required:true,

        index:true,

    },

    /*
    |--------------------------------------------------------------------------
    | Over Details
    |--------------------------------------------------------------------------
    */

    overNumber:{

        type:Number,

        required:true,

    },

    bowler:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Player",

        required:true,

    },

    /*
    |--------------------------------------------------------------------------
    | Balls
    |--------------------------------------------------------------------------
    */

    balls:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Ball",
        }
    ],

    /*
    |--------------------------------------------------------------------------
    | Over Statistics
    |--------------------------------------------------------------------------
    */

    statistics:{

        legalBalls:{
            type:Number,
            default:0,
        },

        runs:{
            type:Number,
            default:0,
        },

        wickets:{
            type:Number,
            default:0,
        },

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

        dots:{
            type:Number,
            default:0,
        },

        fours:{
            type:Number,
            default:0,
        },

        sixes:{
            type:Number,
            default:0,
        }

    },

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    completed:{

        type:Boolean,

        default:false,

    }

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

overSchema.index({

    innings:1,

    overNumber:1,

},
{
    unique:true,
});

overSchema.index({

    bowler:1,

});

export default mongoose.model(
    "Over",
    overSchema
);
