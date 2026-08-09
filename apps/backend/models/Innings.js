import mongoose from "mongoose";

const inningsSchema = new mongoose.Schema(
{
    match:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Match",
        required:true,
    },

    inningsNumber:{
        type:Number,
        enum:[1,2],
        required:true,
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

    totalRuns:{
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
        }
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
