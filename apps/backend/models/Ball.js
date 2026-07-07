import mongoose from "mongoose";

const ballSchema=new mongoose.Schema(
{

    innings:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Innings",
        required:true,
    },

    over:{
        type:Number,
        required:true,
    },

    ball:{
        type:Number,
        required:true,
    },

    batsman:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
    },

    bowler:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
    },

    runs:{
        type:Number,
        default:0,
    },

    extraType:{
        type:String,
        enum:[
            "",
            "Wide",
            "No Ball",
            "Bye",
            "Leg Bye"
        ],
        default:"",
    },

    extraRuns:{
        type:Number,
        default:0,
    },

    wicket:{
        type:Boolean,
        default:false,
    },

    wicketType:{
        type:String,
        default:"",
    },

    commentary:{
        type:String,
        default:"",
    },

    shotArea:{
        type:String,
        default:"",
    }

},
{
    timestamps:true,
});

export default mongoose.model(
    "Ball",
    ballSchema
);
