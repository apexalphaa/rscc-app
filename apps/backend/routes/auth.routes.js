import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

import {

    register,

    login,

    logout,

    getCurrentUser,
    updateCurrentUser,
    requestPasswordReset,
    resetPassword,
    listAcademyUsers,
    setUserRole,

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
router.get("/users", auth, authorize("admin"), listAcademyUsers);
router.patch("/users/:id/role", auth, authorize("admin"), setUserRole);

export default router;
