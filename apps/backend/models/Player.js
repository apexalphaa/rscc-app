import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },

        playerId: {
            type: String,
            unique: true,
            index: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
            index: true,
        },

        dateOfBirth: {
            type: Date,
            default: null,
        },

        age: {
            type: Number,
            default: null,
        },

        gender: {
            type: String,
            enum: [
                "Male",
                "Female",
            ],
            default: "Male",
            index: true,
        },

        battingStyle: {
            type: String,
            enum: [
                "Right Hand Bat",
                "Left Hand Bat",
            ],
            default: "",
        },

        bowlingStyle: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: [
                "Batsman",
                "Bowler",
                "All Rounder",
                "Wicket Keeper",
            ],
            index: true,
        },

        jerseyNumber: {
            type: Number,
            unique: true,
            sparse: true,
            min: 1,
            max: 999,
        },

        phone: {
            type: String,
            default: "",
        },

        parentName: {
            type: String,
            default: "",
        },

        parentPhone: {
            type: String,
            default: "",
        },

        address: {
            type: String,
            default: "",
        },

        joiningDate: {
            type: Date,
            default: Date.now,
        },

        academyStatus: {
            type: String,
            enum: [
                "Active",
                "Inactive",
            ],
            default: "Active",
            index: true,
        },

        career: {
            matches: {
                type: Number,
                default: 0,
            },

            innings: {
                type: Number,
                default: 0,
            },

            runs: {
                type: Number,
                default: 0,
            },

            wickets: {
                type: Number,
                default: 0,
            },

            catches: {
                type: Number,
                default: 0,
            },

            highestScore: {
                type: Number,
                default: 0,
            },

            battingAverage: {
                type: Number,
                default: 0,
            },

            strikeRate: {
                type: Number,
                default: 0,
            },
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
|--------------------------------------------------------------------------
| Compound Indexes
|--------------------------------------------------------------------------
*/

playerSchema.index({
    academyStatus: 1,
    role: 1,
});

playerSchema.index({
    fullName: "text",
    playerId: "text",
});

/*
|--------------------------------------------------------------------------
| Auto Player ID
|--------------------------------------------------------------------------
*/

playerSchema.pre("save", async function (next) {

    if (!this.playerId) {

        const total =
            await mongoose
                .model("Player")
                .countDocuments();

        const year =
            new Date()
                .getFullYear()
                .toString()
                .slice(-2);

        this.playerId =
            `RSCC-${year}-${String(total + 1).padStart(4, "0")}`;

    }

    next();

});

/*
|--------------------------------------------------------------------------
| Calculate Age
|--------------------------------------------------------------------------
*/

playerSchema.pre("save", function (next) {

    if (this.dateOfBirth) {

        this.age = Math.floor(

            (Date.now() - this.dateOfBirth.getTime()) /

            (365.25 * 24 * 60 * 60 * 1000)

        );

    }

    next();

});

/*
|--------------------------------------------------------------------------
| Normalize Name
|--------------------------------------------------------------------------
*/

playerSchema.pre("save", function (next) {

    if (this.fullName) {

        this.fullName = this.fullName

            .trim()

            .replace(/\s+/g, " ");

    }

    next();

});

/*
|--------------------------------------------------------------------------
| Hide Internal Fields
|--------------------------------------------------------------------------
*/

playerSchema.set("toJSON", {

    virtuals: true,

    transform(doc, ret) {

        delete ret.__v;

        return ret;

    },

});

playerSchema.set("toObject", {

    virtuals: true,

});

/*
|--------------------------------------------------------------------------
| Instance Methods
|--------------------------------------------------------------------------
*/

playerSchema.methods.isActive = function () {

    return this.academyStatus === "Active";

};

/*
|--------------------------------------------------------------------------
| Static Methods
|--------------------------------------------------------------------------
*/

playerSchema.statics.getActivePlayers = function () {

    return this.find({

        academyStatus: "Active",

    });

};

playerSchema.statics.getPlayersByRole = function (role) {

    return this.find({

        role,

    });

};

const Player = mongoose.model(
    "Player",
    playerSchema
);

export default Player;
