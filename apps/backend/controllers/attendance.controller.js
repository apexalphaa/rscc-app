import attendanceService from "../services/attendance.service.js";

import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

/*
|--------------------------------------------------------------------------
| Mark Attendance
|--------------------------------------------------------------------------
*/

export const markAttendance = catchAsync(async (req, res) => {

    const attendance =
        await attendanceService.markAttendance(
            req.body,
            req.user._id
        );

    return sendResponse(res, {
        statusCode: 201,
        message: "Attendance marked successfully.",
        data: attendance,
    });

});

/*
|--------------------------------------------------------------------------
| Bulk Attendance
|--------------------------------------------------------------------------
*/

export const bulkAttendance = catchAsync(async (req, res) => {

    const {
        players,
        ...commonData
    } = req.body;

    const result =
        await attendanceService.bulkAttendance(
            players,
            commonData,
            req.user._id
        );

    return sendResponse(res, {
        statusCode: 201,
        message: "Bulk attendance processed successfully.",
        data: result,
    });

});

/*
|--------------------------------------------------------------------------
| Get Attendance
|--------------------------------------------------------------------------
*/

export const getAttendance = catchAsync(async (req, res) => {

    const result =
        await attendanceService.getAttendance(
            req.query
        );

    return sendResponse(res, {
        message: "Attendance fetched successfully.",
        data: result.attendance,
        meta: result.pagination,
    });

});

/*
|--------------------------------------------------------------------------
| Player Attendance History
|--------------------------------------------------------------------------
*/

export const playerHistory = catchAsync(async (req, res) => {

    const history =
        await attendanceService.playerHistory(
            req.params.playerId
        );

    return sendResponse(res, {
        message: "Attendance history fetched successfully.",
        data: history,
    });

});

/*
|--------------------------------------------------------------------------
| Update Attendance
|--------------------------------------------------------------------------
*/

export const updateAttendance = catchAsync(async (req, res) => {

    const attendance =
        await attendanceService.updateAttendance(
            req.params.id,
            req.body
        );

    return sendResponse(res, {
        message: "Attendance updated successfully.",
        data: attendance,
    });

});

/*
|--------------------------------------------------------------------------
| Delete Attendance
|--------------------------------------------------------------------------
*/

export const deleteAttendance = catchAsync(async (req, res) => {

    await attendanceService.deleteAttendance(
        req.params.id
    );

    return sendResponse(res, {
        message: "Attendance deleted successfully.",
    });

});

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const getStatistics = catchAsync(async (req, res) => {

    const statistics =
        await attendanceService.statistics(
            req.query.date
        );

    return sendResponse(res, {
        message: "Attendance statistics fetched successfully.",
        data: statistics,
    });

});

/*
|--------------------------------------------------------------------------
| Attendance Percentage
|--------------------------------------------------------------------------
*/

export const attendancePercentage = catchAsync(async (req, res) => {

    const percentage =
        await attendanceService.attendancePercentage(
            req.params.playerId
        );

    return sendResponse(res, {
        message: "Attendance percentage calculated successfully.",
        data: {
            playerId: req.params.playerId,
            percentage,
        },
    });

});

/*
|--------------------------------------------------------------------------
| Today's Attendance
|--------------------------------------------------------------------------
*/

export const todayAttendance = catchAsync(async (req, res) => {

    const today = new Date();

    const result =
        await attendanceService.getAttendance({

            from: today,

            to: today,

            page: req.query.page,

            limit: req.query.limit,

        });

    return sendResponse(res, {
        message: "Today's attendance fetched successfully.",
        data: result.attendance,
        meta: result.pagination,
    });

});

/*
|--------------------------------------------------------------------------
| Dashboard Summary
|--------------------------------------------------------------------------
*/

export const dashboardSummary = catchAsync(async (req, res) => {

    const [
        statistics,
        recentAttendance,
    ] = await Promise.all([

        attendanceService.statistics(),

        attendanceService.getAttendance({
            page: 1,
            limit: 10,
        }),

    ]);

    return sendResponse(res, {
        message: "Attendance dashboard summary fetched successfully.",
        data: {

            statistics,

            recentAttendance:
                recentAttendance.attendance,

        },
    });

});

/*
|--------------------------------------------------------------------------
| Player Attendance Summary
|--------------------------------------------------------------------------
*/

export const playerAttendanceSummary =
    catchAsync(async (req, res) => {

        const history =
            await attendanceService.playerHistory(
                req.params.playerId
            );

        const percentage =
            await attendanceService.attendancePercentage(
                req.params.playerId
            );

        return sendResponse(res, {
            message: "Player attendance summary fetched successfully.",
            data: {
                percentage,
                history,
            },
        });

    });
