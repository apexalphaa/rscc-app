import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

import {

    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,

} from "../controllers/team.controller.js";

const router = express.Router();

router.post(
    "/",
    auth,
    authorize("admin", "coach"),
    createTeam
);

router.get(
    "/",
    auth,
    getAllTeams
);

router.get(
    "/:id",
    auth,
    getTeamById
);

router.put(
    "/:id",
    auth,
    authorize("admin", "coach"),
    updateTeam
);

router.delete(
    "/:id",
    auth,
    authorize("admin"),
    deleteTeam
);

export default router;
