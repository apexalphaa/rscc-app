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


export const issueEquipment = async (req, res) => {
  try {
    const { assignedTo, quantity = 1 } = req.body || {};
    const item = await Equipment.findById(req.params.id);
    const count = Math.max(1, Number(quantity));
    if (!item) return res.status(404).json({ success: false, message: "Equipment not found" });
    if (!assignedTo) return res.status(400).json({ success: false, message: "Assigned to is required" });
    if (Number(item.available) < count) return res.status(400).json({ success: false, message: "Not enough available units" });
    item.available -= count;
    item.status = "Assigned";
    item.assignedTo = assignedTo;
    await item.save();
    return res.json({ success: true, equipment: item });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const returnEquipment = async (req, res) => {
  try {
    const { quantity = 1 } = req.body || {};
    const item = await Equipment.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Equipment not found" });
    item.available = Math.min(Number(item.quantity), Number(item.available) + Math.max(1, Number(quantity)));
    if (item.available >= item.quantity) {
      item.status = "Available";
      item.assignedTo = "";
    }
    await item.save();
    return res.json({ success: true, equipment: item });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const sendEquipmentToRepair = async (req, res) => {
  try {
    const item = await Equipment.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Equipment not found" });
    item.status = "Under Repair";
    item.condition = "Needs repair";
    await item.save();
    return res.json({ success: true, equipment: item });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const completeEquipmentRepair = async (req, res) => {
  try {
    const item = await Equipment.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Equipment not found" });
    item.status = "Available";
    item.condition = "Good";
    item.available = Math.max(Number(item.available), 1);
    await item.save();
    return res.json({ success: true, equipment: item });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
