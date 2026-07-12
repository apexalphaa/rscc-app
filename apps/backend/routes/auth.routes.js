import express from "express";

import auth from "../middleware/auth.js";
import validateRequest from "../middleware/validateRequest.js";

import {
    registerSchema,
    loginSchema,
} from "../validations/auth.validation.js";

import {
    register,
    login,
    logout,
    getCurrentUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
    "/register",
    validateRequest(registerSchema),
    register
);

router.post(
    "/login",
    validateRequest(loginSchema),
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

export default router;
