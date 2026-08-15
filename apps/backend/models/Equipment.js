import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, default: "General" },
  quantity: { type: Number, required: true, min: 0, default: 0 },
  available: { type: Number, min: 0, default: 0 },
  condition: { type: String, enum: ["Good", "Needs repair", "Retired"], default: "Good" },
  location: { type: String, default: "" },
  notes: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Equipment", equipmentSchema);
