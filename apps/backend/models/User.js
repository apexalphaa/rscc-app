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
      default: "player",
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
        "pending",
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

    // Player information submitted during registration is kept here until an
    // administrator or coach approves the membership. A Player document is
    // created only after approval.
    pendingPlayerProfile: {
      fullName: { type: String, default: "" },
      dateOfBirth: { type: Date, default: null },
      age: { type: Number, default: null },
      gender: { type: String, enum: ["Male", "Female"], default: "Male" },
      battingStyle: { type: String, default: "" },
      bowlingStyle: { type: String, default: "" },
      role: { type: String, enum: ["Batsman", "Bowler", "All Rounder", "Wicket Keeper"], default: "Batsman" },
      jerseyNumber: { type: Number, default: null },
      category: { type: String, enum: ["U12", "U14", "U16", "U19", "Senior"], default: "U12" },
      parentName: { type: String, default: "" },
      parentPhone: { type: String, default: "" },
      address: { type: String, default: "" },
    },

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
