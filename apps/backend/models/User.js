import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
    },

    avatar: {
      type: String,
      default: "",
    },

    academy: {
      type: String,
      default: "Rising Star Cricket Club",
    },

    jerseyNumber: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
        "suspended",
      ],
      default: "active",
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },

    refreshToken: {
      type: String,
      default: "",
      select: false,
    },

    notificationPreferences: {
      announcements: { type: Boolean, default: true },
      events: { type: Boolean, default: true },
      matches: { type: Boolean, default: true },
      fees: { type: Boolean, default: true },
    },

    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "User",
  userSchema
);
