import Player from "../models/Player.js";
import Notification from "../models/Notification.js";
import Fee from "../models/Fee.js";
export const listFees = async (req,res) => {
  try {
    const fees = await Fee.find().populate("player","fullName category").sort({dueDate:1});
    res.json({success:true,fees});
  } catch(e) { res.status(500).json({success:false,message:e.message}); }
};
export const createFee = async (req,res) => { try { res.status(201).json({success:true,fee:await Fee.create(req.body)}); }catch(e){res.status(400).json({success:false,message:e.message});} };
export const updateFee = async (req,res) => { try { const values={...req.body}; if(values.status==="Paid"&&!values.paidAt)values.paidAt=new Date(); const fee=await Fee.findByIdAndUpdate(req.params.id,values,{new:true,runValidators:true}).populate("player","fullName category"); if(!fee)return res.status(404).json({success:false,message:"Fee not found"});res.json({success:true,fee});}catch(e){res.status(400).json({success:false,message:e.message});} };
export const deleteFee = async (req,res) => { try { const fee=await Fee.findByIdAndDelete(req.params.id);if(!fee)return res.status(404).json({success:false,message:"Fee not found"});res.json({success:true});}catch(e){res.status(400).json({success:false,message:e.message});} };


export const listMyFees = async (req, res) => {
  try {
    const player = await Player.findOne({ user: req.user._id }).select("_id fullName category");
    if (!player) return res.json({ success: true, fees: [] });

    const fees = await Fee.find({ player: player._id })
      .populate("player", "fullName category")
      .sort({ dueDate: 1 });

    const now = new Date();
    const soonLimit = new Date(now);
    soonLimit.setDate(soonLimit.getDate() + 7);

    for (const fee of fees) {
      if (fee.status !== "Paid") {
        const due = new Date(fee.dueDate);
        const nextStatus = due < now ? "Overdue" : fee.status;
        if (nextStatus !== fee.status && fee.status !== "Overdue") {
          fee.status = "Overdue";
          await fee.save();
        }

        const title = nextStatus === "Overdue" ? "Fee overdue" : "Fee due soon";
        const body = nextStatus === "Overdue"
          ? `Your ₹${Number(fee.amount).toLocaleString("en-IN")} academy fee was due on ${due.toLocaleDateString("en-IN")}.`
          : `Your ₹${Number(fee.amount).toLocaleString("en-IN")} academy fee is due on ${due.toLocaleDateString("en-IN")}.`;

        if (due <= soonLimit) {
          const link = `/fees`;
          const exists = await Notification.findOne({
            user: req.user._id,
            type: "system",
            link,
            title,
            createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) },
          });
          if (!exists) {
            await Notification.create({
              user: req.user._id,
              title,
              body,
              type: "system",
              link,
            });
          }
        }
      }
    }

    const refreshedFees = await Fee.find({ player: player._id })
      .populate("player", "fullName category")
      .sort({ dueDate: 1 });

    return res.json({ success: true, fees: refreshedFees });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
