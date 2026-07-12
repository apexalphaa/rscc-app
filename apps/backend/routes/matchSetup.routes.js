import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

import {

    createDraftMatch,
    updateMatchDetails,
    selectTeams,
    getDraftMatch,

} from "../controllers/matchSetup.controller.js";

const router = express.Router();

router.post(
    "/draft",
    auth,
    authorize("admin","coach"),
    createDraftMatch
);

router.patch(
    "/:id/details",
    auth,
    authorize("admin","coach"),
    updateMatchDetails
);

router.patch(
    "/:id/teams",
    auth,
    authorize("admin","coach"),
    selectTeams
);

router.get(
    "/:id",
    auth,
    getDraftMatch
);

export default router;
