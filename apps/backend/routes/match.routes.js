import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatchStatus,
  deleteMatch,
} from "../controllers/match.controller.js";

const router = express.Router();

router.post(
  "/",
  auth,
  authorize("admin", "coach"),
  createMatch
);

router.get(
  "/",
  auth,
  getAllMatches
);

router.get(
  "/:id",
  auth,
  getMatchById
);

router.patch(
  "/:id/status",
  auth,
  authorize("admin", "coach"),
  updateMatchStatus
);

router.delete(
  "/:id",
  auth,
  authorize("admin"),
  deleteMatch
);

export default router;
