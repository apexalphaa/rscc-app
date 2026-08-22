import express from "express";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from "../controllers/player.controller.js";

const router = express.Router();

router.post("/", auth, authorize("admin", "coach"), createPlayer);
router.get("/", auth, getPlayers);
router.get("/:id", auth, authorize("admin", "coach"), getPlayerById);
router.put("/:id", auth, authorize("admin", "coach"), updatePlayer);
router.delete("/:id", auth, authorize("admin"), deletePlayer);

export default router;

