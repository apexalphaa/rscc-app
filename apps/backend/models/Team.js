import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({

    teamCode:{

        type:String,

        unique:true,

    },

    name:{

        type:String,

        required:true,

        unique:true,

    },

    shortName:{

        type:String,

        required:true,

    },

    category:{

        type:String,

        enum:[
            "U14",
            "U16",
            "U19",
            "Senior",
            "Visitor",
        ],

        required:true,

    },

    logo:{

        type:String,

        default:"",

    },

    players:[{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Player",

    }],

    coaches:[{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Coach",

    }]

},
{
    timestamps:true,
});

export default mongoose.model(
    "Team",
    teamSchema
);
