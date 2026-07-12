import express from "express";

import auth from "../middleware/auth.js";
import roles from "../middleware/roles.js";

import validateObjectId from "../middleware/validateObjectId.js";
import validateRequest from "../middleware/validateRequest.js";

import {

    markAttendance,

    bulkAttendance,

    getAttendance,

    playerHistory,

    updateAttendance,

    deleteAttendance,

    getStatistics,

    attendancePercentage,

    todayAttendance,

    dashboardSummary,

    playerAttendanceSummary,

} from "../controllers/attendance.controller.js";

import {

    markAttendanceSchema,

    bulkAttendanceSchema,

} from "../validations/attendance.validation.js";

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

router.get(
    "/today",
    auth,
    todayAttendance
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
    validateRequest(markAttendanceSchema),
    markAttendance
);

router.post(
    "/bulk",
    auth,
    roles("admin", "coach"),
    validateRequest(bulkAttendanceSchema),
    bulkAttendance
);

router.get(
    "/",
    auth,
    getAttendance
);

router.put(
    "/:id",
    auth,
    roles("admin", "coach"),
    validateObjectId("id"),
    updateAttendance
);

router.delete(
    "/:id",
    auth,
    roles("admin"),
    validateObjectId("id"),
    deleteAttendance
);

/*
|--------------------------------------------------------------------------
| Player
|--------------------------------------------------------------------------
*/

router.get(
    "/player/:playerId",
    auth,
    validateObjectId("playerId"),
    playerHistory
);

router.get(
    "/player/:playerId/summary",
    auth,
    validateObjectId("playerId"),
    playerAttendanceSummary
);

router.get(
    "/player/:playerId/percentage",
    auth,
    validateObjectId("playerId"),
    attendancePercentage
);

export default router;
