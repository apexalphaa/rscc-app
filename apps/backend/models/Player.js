import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    playerId: {
      type: String,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    dateOfBirth: Date,

    age: Number,

    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },

    battingStyle: {
      type: String,
      enum: [
        "Right Hand Bat",
        "Left Hand Bat",
      ],
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
    },

    jerseyNumber: Number,

    phone: String,

    parentName: String,

    parentPhone: String,

    address: String,

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
  }
);

export default mongoose.model(
  "Player",
  playerSchema
);
