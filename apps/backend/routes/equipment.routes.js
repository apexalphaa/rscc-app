import express from "express";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import {
  createEquipment,
  getEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  issueEquipment,
  returnEquipment,
  sendEquipmentToRepair,
  completeEquipmentRepair,
} from "../controllers/equipment.controller.js";

const router = express.Router();

router.post("/", auth, authorize("admin", "coach"), createEquipment);
router.get("/", auth, getEquipment);
router.get("/:id", auth, getEquipmentById);
router.put("/:id", auth, authorize("admin", "coach"), updateEquipment);
router.post("/:id/issue", auth, authorize("admin", "coach"), issueEquipment);
router.post("/:id/return", auth, authorize("admin", "coach"), returnEquipment);
router.post("/:id/repair", auth, authorize("admin", "coach"), sendEquipmentToRepair);
router.post("/:id/repair/complete", auth, authorize("admin", "coach"), completeEquipmentRepair);
router.delete("/:id", auth, authorize("admin"), deleteEquipment);

export default router;

