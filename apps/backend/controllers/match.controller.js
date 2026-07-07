import Match from "../models/Match.js";

export const createMatch = async (req, res) => {
  try {
    import generateMatchNumber from "../utils/generateMatchNumber.js";

const data = {
  ...req.body,
  matchNumber: generateMatchNumber(),
  createdBy: req.user._id,
};

const match = await Match.create(data);

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

export const getAllMatches = async (req, res) => {
  try {

    const matches = await Match.find()
      .populate("teamA", "name shortName")
      .populate("teamB", "name shortName")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: matches.length,
      matches,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getMatchById = async (req, res) => {
  try {

    const match = await Match.findById(req.params.id)
      .populate("teamA")
      .populate("teamB")
      .populate("scorer", "name");

    if (!match) {

      return res.status(404).json({
        success: false,
        message: "Match not found",
      });

    }

    return res.json({
      success: true,
      match,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

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

    return res.json({
      success: true,
      message: "Status Updated",
      match,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const deleteMatch = async (req, res) => {

  try {

    await Match.findByIdAndDelete(
      req.params.id
    );

    return res.json({
      success: true,
      message: "Match Deleted",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
