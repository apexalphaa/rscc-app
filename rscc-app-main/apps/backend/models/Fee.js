import mongoose from "mongoose";
const feeSchema = new mongoose.Schema({ player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true }, amount: { type: Number, required: true, min: 0 }, dueDate: { type: Date, required: true }, status: { type: String, enum: ["Pending", "Paid", "Overdue"], default: "Pending" }, paidAt: Date, note: String }, { timestamps: true });
export default mongoose.model("Fee", feeSchema);
