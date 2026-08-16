import User from "../models/User.js";
import Player from "../models/Player.js";
import Coach from "../models/Coach.js";
import crypto from "crypto";
import { deliverPasswordReset } from "../services/delivery.service.js";

import {
  hashPassword,
  comparePassword,
} from "../utils/hashPassword.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "player", phone = "" } = req.body || {};
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedRole = String(role || "player").toLowerCase();

    if (!name?.trim() || !normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Public registration is intentionally limited to player/coach.
    // Admin accounts are created by academy administration.
    if (!["player", "coach"].includes(normalizedRole)) {
      return res.status(400).json({
        success: false,
        message: "Choose Player or Coach for public registration",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: normalizedRole,
      phone: String(phone || "").trim(),
      academy: "Rising Star Cricket Club",
    });

    // Keep the academy records linked to the authenticated account.
    if (normalizedRole === "player") {
      await Player.create({
        user: user._id,
        fullName: user.name,
        phone: user.phone,
      });
    } else if (normalizedRole === "coach") {
      await Coach.create({
        name: user.name,
        phone: user.phone,
        email: user.email,
        status: "Active",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        academy: user.academy,
        avatar: user.avatar,
        phone: user.phone,
        status: user.status,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export const login = async (req, res) => {

  try {

    const body = req.body || {};

    const {
      email,
      password,
    } = body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });

    }

    const user = await User.findOne({
      email: String(email).trim().toLowerCase(),
    }).select("+password +refreshToken");

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });

    }

    const isMatch = await comparePassword(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });

    }

    user.lastLogin = new Date();

    const accessToken =
      generateAccessToken(user);

    const refreshToken =
      generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    return res.status(200).json({

      success: true,

      message: "Login Successful",

      accessToken,

      refreshToken,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        academy: user.academy,

        avatar: user.avatar,

        status: user.status,

      },

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Login Failed",

      error: error.message,

    });

  }

};

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export const logout = async (req, res) => {

  try {

    const { email } = req.body || {};

    if (email) {

      const user = await User.findOne({
        email,
      }).select("+refreshToken");

      if (user) {

        user.refreshToken = "";

        await user.save();

      }

    }

    return res.status(200).json({

      success: true,

      message: "Logout Successful",

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Logout Failed",

      error: error.message,

    });

  }

};

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

export const getCurrentUser = async (req, res) => {

  try {

    return res.status(200).json({

      success: true,

      user: {

        id: req.user._id,

        name: req.user.name,

        email: req.user.email,

        role: req.user.role,

        academy: req.user.academy,

        avatar: req.user.avatar,

        phone: req.user.phone,

        status: req.user.status,
        notificationPreferences: req.user.notificationPreferences,

      },

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Unable to fetch current user",

    });

  }

};

export const updateCurrentUser = async (req, res) => {
  try {
    const { name, phone, avatar, notificationPreferences } = req.body || {};
    const update = {};
    if (typeof name === "string" && name.trim()) update.name = name.trim();
    if (typeof phone === "string") update.phone = phone;
    if (typeof avatar === "string") update.avatar = avatar;
    if (notificationPreferences && typeof notificationPreferences === "object") update.notificationPreferences = notificationPreferences;
    const user = await User.findByIdAndUpdate(req.user._id, update, { new: true, runValidators: true });
    return res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, avatar: user.avatar, role: user.role === "viewer" ? "player" : user.role, notificationPreferences: user.notificationPreferences } });
  } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const user = await User.findOne({ email: String(req.body?.email || "").toLowerCase() }).select("+passwordResetToken +passwordResetExpires");
    let resetToken;
    if (user) {
      resetToken = crypto.randomBytes(32).toString("hex");
      user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
      await user.save({ validateBeforeSave: false });
      try { await deliverPasswordReset({ email: user.email, phone: user.phone, token: resetToken }); } catch (deliveryError) { console.error("Password reset delivery failed", deliveryError.message); }
    }
    const response = { success: true, message: "If the account exists, a reset token has been generated." };
    if (user && process.env.NODE_ENV !== "production") response.resetToken = resetToken;
    return res.json(response);
  } catch (error) { return res.status(500).json({ success: false, message: "Unable to start password reset" }); }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body || {};
    if (!token || !password || password.length < 6) return res.status(400).json({ success: false, message: "A valid token and a password of at least 6 characters are required" });
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: new Date() } }).select("+passwordResetToken +passwordResetExpires");
    if (!user) return res.status(400).json({ success: false, message: "Reset token is invalid or has expired" });
    user.password = await hashPassword(password);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshToken = "";
    await user.save();
    return res.json({ success: true, message: "Password reset successfully. Please sign in." });
  } catch (error) { return res.status(500).json({ success: false, message: "Unable to reset password" }); }
};
