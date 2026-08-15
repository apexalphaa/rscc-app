import mongoose from "mongoose";
const coachSchema = new mongoose.Schema({ name: { type: String, required: true }, specialty: { type: String, default: "Cricket coach" }, phone: String, email: String, status: { type: String, enum: ["Active", "Inactive"], default: "Active" } }, { timestamps: true });
export default mongoose.model("Coach", coachSchema);
