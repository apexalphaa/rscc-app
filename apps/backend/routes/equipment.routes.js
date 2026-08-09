import express from "express";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import {
  createEquipment,
  getEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipment.controller.js";

const router = express.Router();

router.post("/", auth, authorize("admin", "coach"), createEquipment);
router.get("/", auth, getEquipment);
router.get("/:id", auth, getEquipmentById);
router.put("/:id", auth, authorize("admin", "coach"), updateEquipment);
router.delete("/:id", auth, authorize("admin"), deleteEquipment);

export default router;

