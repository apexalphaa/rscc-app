import mongoose from "mongoose";

const ballSchema = new mongoose.Schema(
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

    over:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Over",

    },

    /*
    |--------------------------------------------------------------------------
    | Ball Number
    |--------------------------------------------------------------------------
    */

    overNumber:{

        type:Number,

        required:true,

    },

    ballNumber:{

        type:Number,

        required:true,

    },

    displayNumber:{

        type:String,

        default:"0.0",

    },

    /*
    |--------------------------------------------------------------------------
    | Players
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

    bowler:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Player",

        required:true,

    },

    /*
    |--------------------------------------------------------------------------
    | Runs
    |--------------------------------------------------------------------------
    */

    runs:{

        type:Number,

        default:0,

        min:0,

        max:6,

    },

    /*
    |--------------------------------------------------------------------------
    | Extras
    |--------------------------------------------------------------------------
    */

    extra:{

        type:{

            type:String,

            enum:[
                "",
                "Wide",
                "No Ball",
                "Bye",
                "Leg Bye",
                "Penalty",
            ],

            default:"",

        },

        runs:{

            type:Number,

            default:0,

        }

    },

    /*
    |--------------------------------------------------------------------------
    | Wicket
    |--------------------------------------------------------------------------
    */

    wicket:{

        isWicket:{

            type:Boolean,

            default:false,

        },

        batsman:{

            type:mongoose.Schema.Types.ObjectId,

            ref:"Player",

        },

        bowler:{

            type:mongoose.Schema.Types.ObjectId,

            ref:"Player",

        },

        fielder:{

            type:mongoose.Schema.Types.ObjectId,

            ref:"Player",

        },

        dismissalType:{

            type:String,

            enum:[

                "",

                "Bowled",

                "Caught",

                "LBW",

                "Run Out",

                "Stumped",

                "Hit Wicket",

                "Retired Out",

                "Obstructing Field",

                "Timed Out",

            ],

            default:"",

        }

    },

    /*
    |--------------------------------------------------------------------------
    | Flags
    |--------------------------------------------------------------------------
    */

    legalDelivery:{

        type:Boolean,

        default:true,

    },

    freeHit:{

        type:Boolean,

        default:false,

    },

    reviewTaken:{

        type:Boolean,

        default:false,

    },

    overturned:{

        type:Boolean,

        default:false,

    },

    /*
    |--------------------------------------------------------------------------
    | Commentary
    |--------------------------------------------------------------------------
    */

    commentary:{

        type:String,

        default:"",

    },

    /*
    |--------------------------------------------------------------------------
    | Audit
    |--------------------------------------------------------------------------
    */

    scorer:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

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

ballSchema.index({

    innings:1,

    overNumber:1,

    ballNumber:1,

});

ballSchema.index({

    striker:1,

});

ballSchema.index({

    bowler:1,

});

export default mongoose.model(

    "Ball",

    ballSchema

);
