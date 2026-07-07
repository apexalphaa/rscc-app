import mongoose from "mongoose";

const coachSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    qualification: String,

    experience: Number,

    specialization: String,

    assignedBatches: [
      {
        type: String,
      },
    ],

    phone: String,

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Coach",
  coachSchema
);
