import User from "../models/User.js";

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
| Register User
|--------------------------------------------------------------------------
*/

export const register = async (req, res) => {
  try {
    const body = req.body || {};

    const {
      name,
      email,
      password,
      role,
      phone,
    } = body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "viewer",
      phone,
      academy: "Rising Star Cricket Club",
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        academy: user.academy,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Registration Failed",
      error: error.message,
    });

  }
};

/*
|--------------------------------------------------------------------------
| Login User
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
      email,
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

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

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
| Logout User
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
