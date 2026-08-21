import Match from "../models/Match.js";
import generateMatchNumber from "../utils/generateMatchNumber.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

const notifyMatchChange = async (match, message) => {
  const users = await User.find({ status: "active" }).select("_id notificationPreferences");
  const notifications = users.filter(user => user.notificationPreferences?.matches !== false).map(user => ({ user: user._id, title: "Match update", body: message, type: "match", link: `/matches/${match._id}` }));
  if (notifications.length) await Notification.insertMany(notifications);
};

/*
|--------------------------------------------------------------------------
| Create Match
|--------------------------------------------------------------------------
*/

export const createMatch = async (req, res) => {
  try {
    const data = {
      ...req.body,
      matchNumber: generateMatchNumber(),
      createdBy: req.user._id,
    };

    const match = await Match.create(data);
    await notifyMatchChange(match, "A new fixture has been scheduled.");

    return res.status(201).json({
      success: true,
      message: "Match Created Successfully",
      match,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Matches
|--------------------------------------------------------------------------
*/

export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("teams.home", "name shortName")
      .populate("teams.away", "name shortName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Match By ID
|--------------------------------------------------------------------------
*/

export const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("teams.home")
      .populate("teams.away")
      .populate("scorer", "name");

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    return res.status(200).json({
      success: true,
      match,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Match Status
|--------------------------------------------------------------------------
*/

export const updateMatchStatus = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status Updated",
      match,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMatch = async (req, res) => {
  try { const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!match) return res.status(404).json({ success: false, message: "Match not found" }); await notifyMatchChange(match, "A fixture has been updated."); return res.json({ success: true, match }); } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
};

/*
|--------------------------------------------------------------------------
| Delete Match
|--------------------------------------------------------------------------
*/

export const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Match Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
