import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
{
    /*
    |--------------------------------------------------------------------------
    | Basic Information
    |--------------------------------------------------------------------------
    */

    matchNumber:{
        type:String,
        unique:true,
        index:true,
    },

    setupProgress:{
        type:Number,
        default:0,
        min:0,
        max:100,
    },

    scoringMode:{
        type:String,
        enum:[
            "offline",
            "online",
        ],
        default:"offline",
    },

    matchType:{
        type:String,
        enum:[
            "Friendly",
            "Practice",
            "Tournament",
            "League",
            "Knockout",
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
            "Abandoned",
        ],
        default:"Draft",
        index:true,
    },

    /*
    |--------------------------------------------------------------------------
    | Match Details
    |--------------------------------------------------------------------------
    */

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

        ballPerOver:{
            type:Number,
            default:6,
        },

        matchDate:{
            type:Date,
            default:Date.now,
        },

        startTime:Date,

        endTime:Date,

        weather:{
            type:String,
            default:"",
        },

    },

    /*
    |--------------------------------------------------------------------------
    | Teams
    |--------------------------------------------------------------------------
    */

    teams:{

        home:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Team",
            required:true,
        },

        away:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Team",
            required:true,
        },

    },

    /*
    |--------------------------------------------------------------------------
    | Squad
    |--------------------------------------------------------------------------
    */

    squad:{

        home:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Player",
            }
        ],

        away:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Player",
            }
        ],

    },

    /*
    |--------------------------------------------------------------------------
    | Playing XI
    |--------------------------------------------------------------------------
    */

    playingXI:{

        home:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Player",
            }
        ],

        away:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Player",
            }
        ],

    },

    /*
    |--------------------------------------------------------------------------
    | Bench
    |--------------------------------------------------------------------------
    */

    substitutes:{

        home:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Player",
            }
        ],

        away:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Player",
            }
        ],

    },

    /*
    |--------------------------------------------------------------------------
    | Captain
    |--------------------------------------------------------------------------
    */

    captains:{

        home:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        },

        away:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        },

    },

    viceCaptains:{

        home:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        },

        away:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        },

    },

    wicketKeepers:{

        home:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        },

        away:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        },

    },

    /*
    |--------------------------------------------------------------------------
    | Toss
    |--------------------------------------------------------------------------
    */

    toss:{

        completed:{
            type:Boolean,
            default:false,
        },

        winner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Team",
        },

        decision:{
            type:String,
            enum:[
                "",
                "bat",
                "bowl",
            ],
            default:"",
        },

    },

    /*
    |--------------------------------------------------------------------------
    | Opening Players
    |--------------------------------------------------------------------------
    */

    openingPlayers:{

        striker:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        },

        nonStriker:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        },

        bowler:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
        },

    },

    /*
    |--------------------------------------------------------------------------
    | Match Officials
    |--------------------------------------------------------------------------
    */

    officials:{

        scorer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },

        umpire1:{
            type:String,
            default:"",
        },

        umpire2:{
            type:String,
            default:"",
        },

        referee:{
            type:String,
            default:"",
        },

    },

    /*
    |--------------------------------------------------------------------------
    | Innings
    |--------------------------------------------------------------------------
    */

    currentInnings:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Innings",
    },

    innings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Innings",
        }
    ],

    /*
    |--------------------------------------------------------------------------
    | Result
    |--------------------------------------------------------------------------
    */

    winner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
    },

    result:{

        type:String,

        default:"",

    },

    margin:{

        type:String,

        default:"",

    },

    /*
    |--------------------------------------------------------------------------
    | Flags
    |--------------------------------------------------------------------------
    */

    isSetupComplete:{
        type:Boolean,
        default:false,
    },

    isScoringStarted:{
        type:Boolean,
        default:false,
    },

    isArchived:{
        type:Boolean,
        default:false,
    },

    /*
    |--------------------------------------------------------------------------
    | Audit
    |--------------------------------------------------------------------------
    */

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

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

matchSchema.index({
    status:1,
});

matchSchema.index({
    matchType:1,
});

matchSchema.index({
    "details.matchDate":-1,
});

matchSchema.index({
    "teams.home":1,
    "teams.away":1,
});

matchSchema.index({
    matchNumber:1,
});

export default mongoose.model(
    "Match",
    matchSchema
);
