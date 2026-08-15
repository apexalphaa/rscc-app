import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res) => {
  try {
    const { sessionDate, sessionName, entries } = req.body;
    if (!sessionDate || !Array.isArray(entries)) {
      return res.status(400).json({ success: false, message: "sessionDate and entries are required" });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { sessionDate },
      { sessionDate, sessionName, entries, markedBy: req.user._id },
      { new: true, upsert: true, runValidators: true }
    ).populate("entries.player", "fullName role jerseyNumber");

    return res.status(200).json({ success: true, message: "Attendance saved", attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().sort({ sessionDate: -1 }).populate("entries.player", "fullName role jerseyNumber");
    return res.json({ success: true, attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAttendanceByDate = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ sessionDate: req.params.date }).populate("entries.player", "fullName role jerseyNumber");
    return res.json({ success: true, attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
