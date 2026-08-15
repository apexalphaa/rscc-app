import express from "express";

import auth from "../middleware/auth.js";

import {

    register,

    login,

    logout,

    getCurrentUser,
    updateCurrentUser,
    requestPasswordReset,
    resetPassword,

} from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
    "/register",
    register
);

router.post(
    "/login",
    login
);

router.post(
    "/logout",
    logout
);

router.get(
    "/me",
    auth,
    getCurrentUser
);

router.put("/me", auth, updateCurrentUser);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
