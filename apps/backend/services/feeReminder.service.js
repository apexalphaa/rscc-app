import Fee from "../models/Fee.js";
import Player from "../models/Player.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const sendFeeReminders = async () => {
  const now = new Date();
  const soon = new Date(now);
  soon.setDate(soon.getDate() + 7);

  const fees = await Fee.find({ status: { $ne: "Paid" }, dueDate: { $lte: soon } }).lean();
  for (const fee of fees) {
    const player = await Player.findById(fee.player).select("user fullName");
    if (!player?.user) continue;
    const user = await User.findById(player.user).select("notificationPreferences");
    if (!user || user.notificationPreferences?.fees === false) continue;

    const due = new Date(fee.dueDate);
    const overdue = due < now;
    const title = overdue ? "Fee overdue" : "Fee due soon";
    const body = overdue
      ? `Your ₹${Number(fee.amount).toLocaleString("en-IN")} academy fee was due on ${due.toLocaleDateString("en-IN")}.`
      : `Your ₹${Number(fee.amount).toLocaleString("en-IN")} academy fee is due on ${due.toLocaleDateString("en-IN")}.`;

    if (overdue && fee.status !== "Overdue") await Fee.updateOne({ _id: fee._id }, { $set: { status: "Overdue" } });

    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const exists = await Notification.findOne({
      user: user._id, title, link: "/fees", createdAt: { $gte: dayStart }
    });
    if (!exists) {
      await Notification.create({ user: user._id, title, body, type: "system", link: "/fees" });
    }
  }
};
