import Equipment from "../models/Equipment.js";

export const createEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.create({ ...req.body, available: req.body.available ?? req.body.quantity, createdBy: req.user._id });
    return res.status(201).json({ success: true, equipment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getEquipment = async (req, res) => {
  try {
    return res.json({ success: true, equipment: await Equipment.find().sort({ createdAt: -1 }) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ success: false, message: "Equipment not found" });
    return res.json({ success: true, equipment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!equipment) return res.status(404).json({ success: false, message: "Equipment not found" });
    return res.json({ success: true, equipment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) return res.status(404).json({ success: false, message: "Equipment not found" });
    return res.json({ success: true, message: "Equipment deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
