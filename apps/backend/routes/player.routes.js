import express from "express";

import auth from "../middleware/auth.js";
import roles from "../middleware/roles.js";
import validateObjectId from "../middleware/validateObjectId.js";

import {
    createPlayer,
    getPlayers,
    getPlayer,
    updatePlayer,
    deletePlayer,
    getStatistics,
    getActivePlayers,
    getPlayersByRole,
    searchPlayers,
    updatePlayerStatus,
    updateCareerStatistics,
    dashboardSummary,
} from "../controllers/player.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard",
    auth,
    dashboardSummary
);

router.get(
    "/statistics",
    auth,
    getStatistics
);

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

router.get(
    "/search",
    auth,
    searchPlayers
);

router.get(
    "/active",
    auth,
    getActivePlayers
);

router.get(
    "/role/:role",
    auth,
    getPlayersByRole
);

/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    auth,
    roles("admin", "coach"),
    createPlayer
);

router.get(
    "/",
    auth,
    getPlayers
);

router.get(
    "/:id",
    auth,
    validateObjectId("id"),
    getPlayer
);

router.put(
    "/:id",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    updatePlayer
);

router.delete(
    "/:id",
    auth,
    roles("admin"),
    validateObjectId("id"),
    deletePlayer
);

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/status",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    updatePlayerStatus
);

/*
|--------------------------------------------------------------------------
| Career
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/career",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    updateCareerStatistics
);

export default router;
