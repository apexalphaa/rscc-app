import express from "express";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import { markAttendance, getAttendance, getAttendanceByDate } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/", auth, authorize("admin", "coach"), markAttendance);
router.get("/", auth, getAttendance);
router.get("/:date", auth, getAttendanceByDate);

export default router;

