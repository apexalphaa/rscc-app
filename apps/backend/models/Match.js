import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
{
    matchNumber:{
        type:String,
        unique:true,
    },

    scoringMode:{
        type:String,
        enum:["offline","online"],
        default:"offline",
    },

    matchType:{
        type:String,
        enum:[
            "Friendly",
            "Practice",
            "Tournament"
        ],
        default:"Friendly",
    },

    overs:{
        type:Number,
        required:true,
    },

    venue:{
        type:String,
        default:"",
    },

    matchDate:{
        type:Date,
        default:Date.now,
    },

    teamA:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true,
    },

    teamB:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true,
    },

    tossWinner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
    },

    tossDecision:{
        type:String,
        enum:["bat","bowl"],
    },

    battingFirst:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
    },

    bowlingFirst:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
    },

    status:{
        type:String,
        enum:[
            "Upcoming",
            "Live",
            "Completed",
            "Abandoned"
        ],
        default:"Upcoming",
    },

    winner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
    },

    result:{
        type:String,
        default:"",
    },

    scorer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

},
{
    timestamps:true,
});

export default mongoose.model(
    "Match",
    matchSchema
);
