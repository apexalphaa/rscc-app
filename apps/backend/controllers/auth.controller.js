import User from "../models/User.js";
import Player from "../models/Player.js";
import Coach from "../models/Coach.js";
import Notification from "../models/Notification.js";
import crypto from "crypto";
import { deliverPasswordReset } from "../services/delivery.service.js";
import generatePlayerId from "../utils/generatePlayerId.js";

// Bootstrap the requested RSCC administrator. Prefer ADMIN_EMAILS in Render; the requested
// address remains as a safe fallback so the existing account can be promoted on next login.
const BOOTSTRAP_ADMIN_EMAILS = new Set(
  String(process.env.ADMIN_EMAILS || "f17121221@gmail.com")
    .split(",").map((email) => email.trim().toLowerCase()).filter(Boolean)
);

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
    const {
      name,
      email,
      password,
      phone = "",
      dateOfBirth = null,
      age = null,
      gender = "Male",
      battingStyle = "",
      bowlingStyle = "",
      role = "Batsman",
      jerseyNumber = null,
      category = "U12",
      parentName = "",
      parentPhone = "",
      address = "",
    } = req.body || {};

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const isBootstrapAdmin = BOOTSTRAP_ADMIN_EMAILS.has(normalizedEmail);

    if (!name?.trim() || !normalizedEmail || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }
    if (!["Male", "Female"].includes(gender)) {
      return res.status(400).json({ success: false, message: "Please select a valid gender" });
    }
    if (!["U12", "U14", "U16", "U19", "Senior"].includes(category)) {
      return res.status(400).json({ success: false, message: "Please select a valid age category" });
    }
    if (!["Batsman", "Bowler", "All Rounder", "Wicket Keeper"].includes(role)) {
      return res.status(400).json({ success: false, message: "Please select a valid playing role" });
    }
    if (battingStyle && !["Right Hand Bat", "Left Hand Bat"].includes(battingStyle)) {
      return res.status(400).json({ success: false, message: "Please select a valid batting style" });
    }

    const normalizedBowlingStyle = String(bowlingStyle || "").trim();
    const allowedBowlingStyles = [
      "", "None", "Right-arm fast", "Left-arm fast", "Right-arm medium",
      "Left-arm medium", "Right-arm medium-fast", "Left-arm medium-fast",
      "Right-arm off spin", "Right-arm leg spin", "Left-arm orthodox spin",
      "Left-arm chinaman", "Right-arm googly / leg break",
    ];
    if (!allowedBowlingStyles.includes(normalizedBowlingStyle)) {
      return res.status(400).json({ success: false, message: "Please select a valid bowling style" });
    }

    const pendingPlayerProfile = {
      fullName: name.trim(),
      dateOfBirth: dateOfBirth || null,
      age: age !== null && age !== "" && age !== undefined ? Number(age) : null,
      gender,
      battingStyle: battingStyle || "",
      bowlingStyle: normalizedBowlingStyle,
      role,
      jerseyNumber: jerseyNumber !== null && jerseyNumber !== "" && jerseyNumber !== undefined ? Number(jerseyNumber) : null,
      category,
      parentName: String(parentName || "").trim(),
      parentPhone: String(parentPhone || "").trim(),
      address: String(address || "").trim(),
    };

    let user = await User.findOne({ email: normalizedEmail });

    if (user) {
      if (user.status === "pending") {
        // Allow an applicant to repair/resubmit a pending request without
        // creating another account or another Player document.
        user.name = name.trim();
        user.password = await hashPassword(password);
        user.phone = String(phone || "").trim();
        user.role = "player";
        user.isVerified = false;
        user.jerseyNumber = pendingPlayerProfile.jerseyNumber;
        user.pendingPlayerProfile = pendingPlayerProfile;
        await user.save();
      } else if (isBootstrapAdmin) {
        user.role = "admin";
        user.status = "active";
        user.isVerified = true;
        user.name = name.trim();
        user.phone = String(phone || "").trim();
        await user.save();
      } else {
        return res.status(400).json({ success: false, message: "An account with this email already exists" });
      }
    } else {
      user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: await hashPassword(password),
        role: isBootstrapAdmin ? "admin" : "player",
        phone: String(phone || "").trim(),
        academy: "Rising Star Cricket Club",
        status: isBootstrapAdmin ? "active" : "pending",
        isVerified: isBootstrapAdmin,
        jerseyNumber: pendingPlayerProfile.jerseyNumber,
        pendingPlayerProfile: isBootstrapAdmin ? undefined : pendingPlayerProfile,
      });
    }

    if (!isBootstrapAdmin) {
      // Never create a Player before approval. The complete form is stored on
      // the pending membership and is converted into a Player on approval.
      try {
        const approvers = await User.find({
          role: { $in: ["admin", "coach"] },
          status: "active",
        }).select("_id notificationPreferences");

        const notifications = approvers.map(approver => ({
            user: approver._id,
            title: "Player approval pending",
            body: `${user.name}'s RSCC player membership request is waiting for approval.`,
            type: "approval",
            link: "/players",
          }));

        if (notifications.length) {
          // Avoid creating another unread notification when the applicant
          // resubmits the same pending request.
          for (const notification of notifications) {
            const exists = await Notification.exists({
              user: notification.user,
              title: notification.title,
              link: notification.link,
              read: false,
            });
            if (!exists) await Notification.create(notification);
          }
        }
      } catch (notificationError) {
        console.error("Membership notification delivery failed:", notificationError.message);
      }

      return res.status(201).json({
        success: true,
        pendingApproval: true,
        message: "Your membership request has been delivered successfully. Please wait for approval from an administrator or coach.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: "player",
          academy: user.academy,
          avatar: user.avatar,
          phone: user.phone,
          status: "pending",
          playerId: null,
        },
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(201).json({
      success: true,
      pendingApproval: false,
      message: "Admin account created successfully",
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
        playerId: null,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "We couldn't submit your membership request. Please try again.",
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

    // Promote the bootstrap administrator on login without exposing an admin choice in registration.
    if (BOOTSTRAP_ADMIN_EMAILS.has(user.email) && user.role !== "admin") {
      user.role = "admin";
      user.status = "active";
      user.isVerified = true;
    }

    if (user.role !== "admin" && user.status === "pending") {
      return res.status(403).json({
        success: false,
        code: "MEMBERSHIP_PENDING",
        message: "Your RSCC membership is awaiting approval from an administrator or coach.",
      });
    }

    if (user.role !== "admin" && user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your RSCC membership is not active. Please contact the academy.",
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

    if (BOOTSTRAP_ADMIN_EMAILS.has(String(req.user.email || "").toLowerCase()) && req.user.role !== "admin") {
      req.user.role = "admin";
      req.user.status = "active";
      req.user.isVerified = true;
      await req.user.save();
    }

    const player = await Player.findOne({ user: req.user._id }).select(
      "fullName age gender role category jerseyNumber dateOfBirth battingStyle bowlingStyle parentName parentPhone address academyStatus"
    );

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
        player: player || null,
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

/* Admin-only academy user management. Public registration always creates players. */
export const listAcademyUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["player", "coach"] }, status: "active" })
      .select("name email phone role status isVerified createdAt")
      .sort({ status: 1, createdAt: -1 });
    return res.json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const listPendingMembers = async (req, res) => {
  try {
    const users = await User.find({ status: "pending", role: "player" })
      .select("name email phone role status createdAt jerseyNumber pendingPlayerProfile avatar")
      .sort({ createdAt: 1 });

    const userIds = users.map((u) => u._id);
    const legacyPlayers = await Player.find({ user: { $in: userIds } })
      .select("user playerId fullName age gender role category jerseyNumber dateOfBirth battingStyle bowlingStyle parentName parentPhone address academyStatus");
    const byUser = new Map(legacyPlayers.map((p) => [String(p.user), p]));

    const pending = users.map((u) => {
      const legacy = byUser.get(String(u._id));
      const profile = u.pendingPlayerProfile?.fullName
        ? u.pendingPlayerProfile.toObject?.() || u.pendingPlayerProfile
        : legacy?.toObject?.() || legacy || null;
      return {
        ...u.toObject(),
        player: profile ? { ...profile, user: u._id, playerId: legacy?.playerId || null } : null,
      };
    });

    // Backfill notifications for requests that were created before the current
    // notification flow was installed.
    if (pending.length) {
      const approvers = await User.find({ role: { $in: ["admin", "coach"] }, status: "active" }).select("_id notificationPreferences");
      for (const member of pending) {
        for (const approver of approvers) {
          const body = `${member.name}'s RSCC player membership request is waiting for approval.`;
          const exists = await Notification.exists({ user: approver._id, title: "Player approval pending", body, link: "/players", read: false });
          if (!exists) {
            await Notification.create({ user: approver._id, title: "Player approval pending", body, type: "approval", link: "/players" });
          }
        }
      }
    }

    return res.json({ success: true, users: pending });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const approveMember = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, status: "pending", role: "player" });
    if (!user) return res.status(404).json({ success: false, message: "Pending member not found" });

    const legacyPlayer = await Player.findOne({ user: user._id });
    const submitted = user.pendingPlayerProfile?.fullName
      ? (user.pendingPlayerProfile.toObject?.() || user.pendingPlayerProfile)
      : legacyPlayer?.toObject?.() || legacyPlayer || null;

    if (!submitted?.fullName) {
      return res.status(400).json({ success: false, message: "This membership request has no player details to approve." });
    }

    let playerId = legacyPlayer?.playerId;
    if (!playerId) playerId = await generatePlayerId();

    const playerPayload = {
      user: user._id,
      fullName: submitted.fullName,
      dateOfBirth: submitted.dateOfBirth || undefined,
      age: submitted.age !== null && submitted.age !== undefined ? Number(submitted.age) : undefined,
      gender: submitted.gender || "Male",
      battingStyle: submitted.battingStyle || undefined,
      bowlingStyle: submitted.bowlingStyle || "",
      role: submitted.role || "Batsman",
      jerseyNumber: submitted.jerseyNumber !== null && submitted.jerseyNumber !== undefined ? Number(submitted.jerseyNumber) : undefined,
      category: submitted.category || "U12",
      parentName: submitted.parentName || "",
      parentPhone: submitted.parentPhone || "",
      address: submitted.address || "",
      playerId,
      academyStatus: "Active",
      createdBy: req.user._id,
    };

    let player;
    if (legacyPlayer) {
      player = await Player.findByIdAndUpdate(legacyPlayer._id, playerPayload, { new: true, runValidators: true });
    } else {
      player = await Player.create(playerPayload);
    }

    user.status = "active";
    user.isVerified = true;
    user.createdBy = req.user._id;
    user.pendingPlayerProfile = undefined;
    await user.save();

    await Notification.create({
      user: user._id,
      title: "RSCC membership approved",
      body: `Your RSCC membership has been approved. Your player ID is ${player.playerId}. You can now sign in to your player account.`,
      type: "approval",
      link: "/profile",
    });

    // Keep the approval queue tidy for all approvers.
    const approvers = await User.find({ role: { $in: ["admin", "coach"] }, status: "active", _id: { $ne: req.user._id } }).select("_id");
    if (approvers.length) {
      await Notification.insertMany(approvers.map(approver => ({
        user: approver._id,
        title: "Player membership approved",
        body: `${user.name} has been approved as player ${player.playerId}.`,
        type: "approval",
        link: `/players/${player._id}`,
      })));
    }

    return res.json({
      success: true,
      message: `${user.name} has been approved as a player. Player ID: ${player.playerId}`,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, status: user.status },
      player,
    });
  } catch (error) {
    console.error("Approve member error:", error);
    if (error?.code === 11000 && error?.keyPattern?.playerId) {
      return res.status(409).json({ success: false, message: "A player ID collision occurred. Please approve the request again." });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const rejectMember = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, status: "pending", role: "player" });
    if (!user) return res.status(404).json({ success: false, message: "Pending member not found" });

    user.status = "inactive";
    user.isVerified = false;
    user.createdBy = req.user._id;
    await user.save();

    await Player.findOneAndUpdate(
      { user: user._id },
      { academyStatus: "Inactive", createdBy: req.user._id },
      { new: true }
    );

    await Notification.create({
      user: user._id,
      title: "RSCC membership request update",
      body: "Your RSCC membership request was not approved. Please contact the academy for more information.",
      type: "system",
      link: "/",
    });

    return res.json({
      success: true,
      message: `${user.name}'s membership request was rejected.`,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, status: user.status },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const setUserRole = async (req, res) => {
  try {
    const { role } = req.body || {};
    if (!["player", "coach"].includes(role)) {
      return res.status(400).json({ success: false, message: "Role must be player or coach" });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.email === [...BOOTSTRAP_ADMIN_EMAILS][0]) {
      return res.status(403).json({ success: false, message: "The bootstrap administrator cannot be demoted." });
    }
    user.role = role;
    user.status = "active";
    user.isVerified = true;
    user.createdBy = req.user._id;
    await user.save();

    if (role === "coach") {
      await Coach.findOneAndUpdate(
        { user: user._id },
        { user: user._id, name: user.name, email: user.email, phone: user.phone, status: "Active" },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      await Notification.create({
        user: user._id,
        title: "Coach access granted",
        body: "An RSCC administrator has granted you coach access. Your additional academy controls are now available.",
        type: "approval",
        link: "/coaches",
      });
    } else {
      await Coach.findOneAndUpdate({ user: user._id }, { status: "Inactive" });
      await Notification.create({
        user: user._id,
        title: "Coach access removed",
        body: "Your RSCC coach permissions have been removed by an administrator. Your account remains a player account.",
        type: "approval",
        link: "/profile",
      });
    }

    return res.json({
      success: true,
      message: role === "coach" ? "Coach access granted" : "Player access restored",
      user: { id: user._id, name: user.name, email: user.email, role: user.role, status: user.status }
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
