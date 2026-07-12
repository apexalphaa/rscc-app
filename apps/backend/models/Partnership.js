import mongoose from "mongoose";

const partnershipSchema = new mongoose.Schema(
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
    | Batsmen
    |--------------------------------------------------------------------------
    */

    striker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
        required:true,
    },

    nonStriker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
        required:true,
    },

    /*
    |--------------------------------------------------------------------------
    | Partnership Score
    |--------------------------------------------------------------------------
    */

    runs:{
        type:Number,
        default:0,
    },

    balls:{
        type:Number,
        default:0,
    },

    /*
    |--------------------------------------------------------------------------
    | Individual Contribution
    |--------------------------------------------------------------------------
    */

    strikerRuns:{
        type:Number,
        default:0,
    },

    strikerBalls:{
        type:Number,
        default:0,
    },

    nonStrikerRuns:{
        type:Number,
        default:0,
    },

    nonStrikerBalls:{
        type:Number,
        default:0,
    },

    /*
    |--------------------------------------------------------------------------
    | Wicket
    |--------------------------------------------------------------------------
    */

    wicket:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ball",
        default:null,
    },

    ended:{
        type:Boolean,
        default:false,
    },

    /*
    |--------------------------------------------------------------------------
    | Timing
    |--------------------------------------------------------------------------
    */

    startedAt:{
        type:Date,
        default:Date.now,
    },

    endedAt:Date,

},
{
    timestamps:true,
    versionKey:false,
}
);

partnershipSchema.index({
    innings:1,
    ended:1,
});

export default mongoose.model(
    "Partnership",
    partnershipSchema
);
