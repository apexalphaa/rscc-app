import mongoose from "mongoose";

const ballSchema = new mongoose.Schema(
{
    match:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Match",
        required:true,
    },

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
        required:true,
    },

    bowler:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
        required:true,
    },

    nonStriker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
        required:true,
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
        enum:[
            "",
            "Bowled",
            "Caught",
            "LBW",
            "Run Out",
            "Stumped",
            "Hit Wicket",
            "Retired Out"
        ],
        default:"",
    },

    commentary:{
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
