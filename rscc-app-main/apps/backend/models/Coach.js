import mongoose from "mongoose";
const coachSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, sparse: true }, name: { type: String, required: true }, specialty: { type: String, default: "Cricket coach" }, phone: String, email: String, status: { type: String, enum: ["Active", "Inactive"], default: "Active" } }, { timestamps: true });
export default mongoose.model("Coach", coachSchema);
