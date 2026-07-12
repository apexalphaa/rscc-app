import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        phone: {
            type: String,
            default: "",
            trim: true,
        },

        role: {
            type: String,
            enum: [
                "admin",
                "coach",
                "player",
                "viewer",
            ],
            default: "viewer",
            index: true,
        },

        avatar: {
            type: String,
            default: "",
        },

        academy: {
            type: String,
            default: "Rising Star Cricket Club",
            index: true,
        },

        jerseyNumber: {
            type: Number,
            default: null,
            min: 0,
            max: 999,
        },

        status: {
            type: String,
            enum: [
                "active",
                "inactive",
                "suspended",
            ],
            default: "active",
            index: true,
        },

        isVerified: {
            type: Boolean,
            default: true,
        },

        lastLogin: {
            type: Date,
            default: null,
        },

        refreshToken: {
            type: String,
            default: "",
            select: false,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

userSchema.index({ email: 1 });

userSchema.index({ role: 1 });

userSchema.index({ academy: 1 });

userSchema.index({ status: 1 });

userSchema.index({
    academy: 1,
    role: 1,
});

userSchema.index({
    academy: 1,
    status: 1,
});

/*
|--------------------------------------------------------------------------
| Transform JSON
|--------------------------------------------------------------------------
*/

userSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    },
});

userSchema.set("toObject", {
    transform(doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    },
});

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
*/

userSchema.pre("save", function (next) {
    if (this.email) {
        this.email = this.email.toLowerCase().trim();
    }

    if (this.name) {
        this.name = this.name.trim();
    }

    next();
});

/*
|--------------------------------------------------------------------------
| Instance Methods
|--------------------------------------------------------------------------
*/

userSchema.methods.isAdmin = function () {
    return this.role === "admin";
};

userSchema.methods.isCoach = function () {
    return this.role === "coach";
};

userSchema.methods.isPlayer = function () {
    return this.role === "player";
};

userSchema.methods.isViewer = function () {
    return this.role === "viewer";
};

/*
|--------------------------------------------------------------------------
| Static Methods
|--------------------------------------------------------------------------
*/

userSchema.statics.findActiveUsers = function () {
    return this.find({
        status: "active",
    });
};

userSchema.statics.findByRole = function (role) {
    return this.find({
        role,
    });
};

const User = mongoose.model("User", userSchema);

export default User;
