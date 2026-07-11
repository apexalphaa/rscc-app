import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
{
    matchNumber:{
        type:String,
        unique:true,
    },

    setupProgress:{
        type:Number,
        default:0,
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
            "Tournament",
            "League",
            "Knockout"
        ],
        default:"Friendly",
    },

    status:{
        type:String,
        enum:[
            "Draft",
            "Ready",
            "Live",
            "Completed",
            "Processing",
            "Synced",
            "Abandoned"
        ],
        default:"Draft",
    },

    details:{
        venue:{
            type:String,
            default:"",
        },

        ground:{
            type:String,
            default:"",
        },

        city:{
            type:String,
            default:"",
        },

        overs:{
            type:Number,
            default:20,
        },

        matchDate:{
            type:Date,
            default:Date.now,
        }
    },

    teams:{
        home:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Team",
        },

        away:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Team",
        }
    },

    toss:{
        winner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Team",
        },

        decision:{
            type:String,
            enum:["bat","bowl",""],
            default:"",
        }
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
