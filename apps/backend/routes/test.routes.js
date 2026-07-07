import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.get(
  "/admin",
  auth,
  authorize("admin"),
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Admin",
      user: req.user.name,
    });

  }
);

router.get(
  "/coach",
  auth,
  authorize("admin", "coach"),
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Coach",
      user: req.user.name,
    });

  }
);

router.get(
  "/player",
  auth,
  authorize("admin", "coach", "player"),
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Player",
      user: req.user.name,
    });

  }
);

export default router;
