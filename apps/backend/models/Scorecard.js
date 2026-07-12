import mongoose from "mongoose";

const battingFigureSchema = new mongoose.Schema(
{
    player:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
        required:true,
    },

    battingPosition:Number,

    runs:{
        type:Number,
        default:0,
    },

    balls:{
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
    },

    strikeRate:{
        type:Number,
        default:0,
    },

    dismissal:{
        type:String,
        default:"Not Out",
    },

    dismissedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
    },

    assistedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
    },

    isOut:{
        type:Boolean,
        default:false,
    }

},
{
    _id:false,
});

const bowlingFigureSchema = new mongoose.Schema(
{
    player:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
        required:true,
    },

    overs:{
        type:Number,
        default:0,
    },

    maidens:{
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

    economy:{
        type:Number,
        default:0,
    }

},
{
    _id:false,
});

const scorecardSchema = new mongoose.Schema(
{

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
        unique:true,
        index:true,
    },

    battingTeam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
    },

    bowlingTeam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
    },

    batting:[

        battingFigureSchema

    ],

    bowling:[

        bowlingFigureSchema

    ],

    fallOfWickets:[
        {

            wicket:Number,

            score:Number,

            over:String,

            batsman:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Player",
            }

        }
    ]

},
{
    timestamps:true,
    versionKey:false,
});

export default mongoose.model(
    "Scorecard",
    scorecardSchema
);
