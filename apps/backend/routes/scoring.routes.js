import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

import {
    startMatch,
    scoreBall,
    endInnings,
    finishMatch
} from "../controllers/scoring.controller.js";

const router=express.Router();

router.post(
    "/:matchId/start",
    auth,
    authorize("admin","coach"),
    startMatch
);

router.post(
    "/:matchId/ball",
    auth,
    authorize("admin","coach"),
    scoreBall
);

router.post(
    "/:matchId/end-innings",
    auth,
    authorize("admin","coach"),
    endInnings
);

router.post(
    "/:matchId/finish",
    auth,
    authorize("admin","coach"),
    finishMatch
);

export default router;
