import express from "express";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
} from "../controllers/tournament.controller.js";

const router = express.Router();

router.post("/", auth, authorize("admin", "coach"), createTournament);
router.get("/", auth, getTournaments);
router.get("/:id", auth, getTournamentById);
router.put("/:id", auth, authorize("admin", "coach"), updateTournament);
router.delete("/:id", auth, authorize("admin"), deleteTournament);

export default router;

