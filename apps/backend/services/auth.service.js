import User from "../models/User.js";

import {
    hashPassword,
    comparePassword,
} from "../utils/hashPassword.js";

import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generateToken.js";

class AuthService {

    async register(data) {

        const {
            name,
            email,
            password,
            role = "viewer",
            phone = "",
        } = data;

        const existing = await User.findOne({ email });

        if (existing) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            academy: "Rising Star Cricket Club",
        });

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            academy: user.academy,
        };
    }

    async login(email, password) {

        const user = await User.findOne({
            email,
        }).select("+password +refreshToken");

        if (!user)
            throw new Error("Invalid email");

        const match = await comparePassword(
            password,
            user.password
        );

        if (!match)
            throw new Error("Invalid password");

        const accessToken =
            generateAccessToken(user);

        const refreshToken =
            generateRefreshToken(user);

        user.refreshToken = refreshToken;

        user.lastLogin = new Date();

        await user.save();

        return {

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

        };

    }

    async logout(email) {

        if (!email)
            return;

        const user = await User.findOne({
            email,
        }).select("+refreshToken");

        if (!user)
            return;

        user.refreshToken = "";

        await user.save();

    }

}

export default new AuthService();
