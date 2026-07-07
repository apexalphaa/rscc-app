import mongoose from "mongoose";

const inningsSchema=new mongoose.Schema(
{

    match:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Match",
        required:true,
    },

    inningsNumber:{
        type:Number,
        required:true,
    },

    battingTeam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
    },

    bowlingTeam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
    },

    score:{
        type:Number,
        default:0,
    },

    wickets:{
        type:Number,
        default:0,
    },

    legalBalls:{
        type:Number,
        default:0,
    },

    target:{
        type:Number,
        default:0,
    },

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

    isCompleted:{
        type:Boolean,
        default:false,
    }

},
{
    timestamps:true,
});

export default mongoose.model(
    "Innings",
    inningsSchema
);
