export const createEquipment = async (req, res) => {
  try {
    return res.status(201).json({ success: true, message: "Equipment created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getEquipment = async (req, res) => {
  try {
    return res.json({ success: true, equipment: [] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getEquipmentById = async (req, res) => {
  try {
    return res.json({ success: true, equipment: null });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEquipment = async (req, res) => {
  try {
    return res.json({ success: true, message: "Equipment updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    return res.json({ success: true, message: "Equipment deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

