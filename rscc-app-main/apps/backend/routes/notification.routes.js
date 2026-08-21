import express from "express";
import auth from "../middleware/auth.js";
import { listNotifications, markAllRead, markRead } from "../controllers/notification.controller.js";
const router = express.Router();
router.get("/", auth, listNotifications);
router.patch("/read-all", auth, markAllRead);
router.patch("/:id/read", auth, markRead);
export default router;
