import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    shortName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "U14",
        "U16",
        "U19",
        "Senior",
        "Visitor",
      ],
    },

    logo: String,

    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    ],

    coaches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coach",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Team",
  teamSchema
);
