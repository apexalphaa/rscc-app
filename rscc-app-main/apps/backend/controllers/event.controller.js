import Event from "../models/Event.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

const notify = async (title, body, type, link = "") => {
  const users = await User.find({ status: "active" }).select("_id notificationPreferences");
  const key = type === "event" ? "events" : "announcements";
  const notifications = users.filter(user => user.notificationPreferences?.[key] !== false).map(user => ({ user: user._id, title, body, type, link }));
  if (notifications.length) await Notification.insertMany(notifications);
};

export const listEvents = async (req, res) => {
  try { res.json({ success: true, events: await Event.find().sort({ date: 1 }).populate("createdBy", "name") }); }
  catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
export const createEvent = async (req, res) => {
  try { const event = await Event.create({ ...req.body, createdBy: req.user._id }); await notify("New event: " + event.title, event.description || event.place || "A new academy event was added.", "event", "/calendar"); res.status(201).json({ success: true, event }); }
  catch (error) { res.status(400).json({ success: false, message: error.message }); }
};
export const updateEvent = async (req, res) => { try { const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!event) return res.status(404).json({ success: false, message: "Event not found" }); res.json({ success: true, event }); } catch (error) { res.status(400).json({ success: false, message: error.message }); } };
export const deleteEvent = async (req, res) => { try { const event = await Event.findByIdAndDelete(req.params.id); if (!event) return res.status(404).json({ success: false, message: "Event not found" }); res.json({ success: true, message: "Event deleted" }); } catch (error) { res.status(400).json({ success: false, message: error.message }); } };
