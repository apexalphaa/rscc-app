import authService from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export const register = catchAsync(async (req, res) => {
    const user = await authService.register(req.body);

    return sendResponse(res, {
        statusCode: 201,
        message: "User Registered Successfully",
        data: user,
    });
});

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export const login = catchAsync(async (req, res) => {
    const result = await authService.login(
        req.body.email,
        req.body.password
    );

    return sendResponse(res, {
        statusCode: 200,
        message: "Login Successful",
        data: result,
    });
});

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.email);

    return sendResponse(res, {
        statusCode: 200,
        message: "Logout Successful",
    });
});

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

export const getCurrentUser = catchAsync(async (req, res) => {
    return sendResponse(res, {
        statusCode: 200,
        data: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            academy: req.user.academy,
            avatar: req.user.avatar,
            phone: req.user.phone,
            status: req.user.status,
            isVerified: req.user.isVerified,
            jerseyNumber: req.user.jerseyNumber,
            createdAt: req.user.createdAt,
            updatedAt: req.user.updatedAt,
        },
    });
});
