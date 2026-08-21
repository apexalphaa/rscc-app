import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

import {
    createDraftMatch,
    updateMatchDetails,
    selectTeams,
    selectPlayingXI,
    getDraftMatch
} from "../controllers/matchSetup.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create Draft Match
|--------------------------------------------------------------------------
*/

router.post(
    "/draft",
    auth,
    authorize("admin", "coach"),
    createDraftMatch
);

/*
|--------------------------------------------------------------------------
| Update Match Details
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/details",
    auth,
    authorize("admin", "coach"),
    updateMatchDetails
);

/*
|--------------------------------------------------------------------------
| Select Teams
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/teams",
    auth,
    authorize("admin", "coach"),
    selectTeams
);

/*
|--------------------------------------------------------------------------
| Select Playing XI
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/playing-xi",
    auth,
    authorize("admin", "coach"),
    selectPlayingXI
);

/*
|--------------------------------------------------------------------------
| Get Draft Match
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    auth,
    getDraftMatch
);

export default router;
