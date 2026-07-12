import express from "express";

import auth from "../middleware/auth.js";
import roles from "../middleware/roles.js";
import validateObjectId from "../middleware/validateObjectId.js";

import {

    getMatchSetup,

    getSetupStatus,

    updateMatchDetails,

    assignTeams,

    getSquad,

    updateSquad,

    assignPlayingXI,

    assignLeadership,

    recordToss,

    assignOpeningPlayers,

    assignOfficials,

    completeSetup,

    resetSetup,

    dashboardSummary,

} from "../controllers/matchSetup.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(
    "/:id/dashboard",
    auth,
    validateObjectId("id"),
    dashboardSummary
);

router.get(
    "/:id/status",
    auth,
    validateObjectId("id"),
    getSetupStatus
);

/*
|--------------------------------------------------------------------------
| Match Setup
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    auth,
    validateObjectId("id"),
    getMatchSetup
);

router.patch(
    "/:id/details",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    updateMatchDetails
);

/*
|--------------------------------------------------------------------------
| Team Selection
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/teams",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    assignTeams
);

/*
|--------------------------------------------------------------------------
| Squad
|--------------------------------------------------------------------------
*/

router.get(
    "/:id/squad",
    auth,
    validateObjectId("id"),
    getSquad
);

router.patch(
    "/:id/squad",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    updateSquad
);

/*
|--------------------------------------------------------------------------
| Playing XI
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/playing-xi",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    assignPlayingXI
);

/*
|--------------------------------------------------------------------------
| Leadership
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/leadership",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    assignLeadership
);

/*
|--------------------------------------------------------------------------
| Toss
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/toss",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    recordToss
);

/*
|--------------------------------------------------------------------------
| Opening Players
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/opening",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    assignOpeningPlayers
);

/*
|--------------------------------------------------------------------------
| Match Officials
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/officials",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    assignOfficials
);

/*
|--------------------------------------------------------------------------
| Complete Setup
|--------------------------------------------------------------------------
*/

router.post(
    "/:id/complete",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    completeSetup
);

/*
|--------------------------------------------------------------------------
| Reset Setup
|--------------------------------------------------------------------------
*/

router.post(
    "/:id/reset",
    auth,
    roles("admin"),
    validateObjectId("id"),
    resetSetup
);

export default router;
