import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    sessionDate: { type: String, required: true, index: true },
    sessionName: { type: String, default: "Training session" },
    entries: [{
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
      status: { type: String, enum: ["Present", "Late", "Absent"], default: "Present" },
      note: { type: String, default: "" },
    }],
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

attendanceSchema.index({ sessionDate: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
