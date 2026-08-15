import Player from "../models/Player.js";
import Match from "../models/Match.js";
import Attendance from "../models/Attendance.js";
import Fee from "../models/Fee.js";
import Event from "../models/Event.js";

export const academyReport = async (req, res) => {
  try {
    const [players, matches, attendanceSessions, fees, events] = await Promise.all([
      Player.countDocuments(),
      Match.countDocuments(),
      Attendance.countDocuments(),
      Fee.find().select("amount status dueDate"),
      Event.find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(5).select("title date type place"),
    ]);

    const playersByCategoryRows = await Player.aggregate([
      { $group: { _id: { $ifNull: ["$category", "Uncategorised"] }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const attendanceRows = await Attendance.aggregate([
      { $unwind: "$entries" },
      { $group: { _id: "$entries.status", count: { $sum: 1 } } },
    ]);

    const paid = fees.filter(f => f.status === "Paid").reduce((total, f) => total + Number(f.amount || 0), 0);
    const due = fees.filter(f => f.status !== "Paid").reduce((total, f) => total + Number(f.amount || 0), 0);

    const playersByCategory = Object.fromEntries(playersByCategoryRows.map(row => [row._id, row.count]));
    const attendanceBreakdown = Object.fromEntries(attendanceRows.map(row => [row._id, row.count]));

    return res.json({
      success: true,
      report: {
        players,
        matches,
        attendanceSessions,
        totalFees: fees.length,
        paid,
        due,
        playersByCategory,
        attendanceBreakdown,
        upcomingEvents: events,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
