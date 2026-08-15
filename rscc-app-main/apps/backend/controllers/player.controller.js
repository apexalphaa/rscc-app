import Player from "../models/Player.js";

export const createPlayer = async (req, res) => {
  try {
    const { fullName, ...details } = req.body;
    if (!fullName?.trim()) {
      return res.status(400).json({ success: false, message: "Player name is required" });
    }
    const player = await Player.create({ fullName: fullName.trim(), ...details });
    return res.status(201).json({ success: true, player });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: players.length, players });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ success: false, message: "Player not found" });
    }
    return res.json({ success: true, player });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!player) {
      return res.status(404).json({ success: false, message: "Player not found" });
    }
    return res.json({ success: true, player });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ success: false, message: "Player not found" });
    }
    return res.json({ success: true, message: "Player deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
