import playerService from "../services/player.service.js";

import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

/*
|--------------------------------------------------------------------------
| Create Player
|--------------------------------------------------------------------------
*/

export const createPlayer = catchAsync(async (req, res) => {

    const player = await playerService.createPlayer(
        req.body
    );

    return sendResponse(res, {
        statusCode: 201,
        message: "Player created successfully.",
        data: player,
    });

});

/*
|--------------------------------------------------------------------------
| Get All Players
|--------------------------------------------------------------------------
*/

export const getPlayers = catchAsync(async (req, res) => {

    const result = await playerService.getPlayers(
        req.query
    );

    return sendResponse(res, {
        message: "Players fetched successfully.",
        data: result.players,
        meta: result.pagination,
    });

});

/*
|--------------------------------------------------------------------------
| Get Player By Id
|--------------------------------------------------------------------------
*/

export const getPlayer = catchAsync(async (req, res) => {

    const player = await playerService.getPlayer(
        req.params.id
    );

    return sendResponse(res, {
        message: "Player fetched successfully.",
        data: player,
    });

});

/*
|--------------------------------------------------------------------------
| Update Player
|--------------------------------------------------------------------------
*/

export const updatePlayer = catchAsync(async (req, res) => {

    const player = await playerService.updatePlayer(
        req.params.id,
        req.body
    );

    return sendResponse(res, {
        message: "Player updated successfully.",
        data: player,
    });

});

/*
|--------------------------------------------------------------------------
| Delete Player
|--------------------------------------------------------------------------
*/

export const deletePlayer = catchAsync(async (req, res) => {

    await playerService.deletePlayer(
        req.params.id
    );

    return sendResponse(res, {
        message: "Player deleted successfully.",
    });

});

/*
|--------------------------------------------------------------------------
| Player Statistics
|--------------------------------------------------------------------------
*/

export const getStatistics = catchAsync(async (req, res) => {

    const stats =
        await playerService.getStatistics();

    return sendResponse(res, {
        message: "Statistics fetched successfully.",
        data: stats,
    });

});

/*
|--------------------------------------------------------------------------
| Active Players
|--------------------------------------------------------------------------
*/

export const getActivePlayers = catchAsync(async (req, res) => {

    const result = await playerService.getPlayers({
        ...req.query,
        academyStatus: "Active",
    });

    return sendResponse(res, {
        message: "Active players fetched successfully.",
        data: result.players,
        meta: result.pagination,
    });

});

/*
|--------------------------------------------------------------------------
| Players By Role
|--------------------------------------------------------------------------
*/

export const getPlayersByRole = catchAsync(async (req, res) => {

    const result = await playerService.getPlayers({
        ...req.query,
        role: req.params.role,
    });

    return sendResponse(res, {
        message: "Players fetched successfully.",
        data: result.players,
        meta: result.pagination,
    });

});

/*
|--------------------------------------------------------------------------
| Search Players
|--------------------------------------------------------------------------
*/

export const searchPlayers = catchAsync(async (req, res) => {

    const result = await playerService.getPlayers({
        search: req.query.q,
        page: req.query.page,
        limit: req.query.limit,
    });

    return sendResponse(res, {
        message: "Search completed successfully.",
        data: result.players,
        meta: result.pagination,
    });

});

/*
|--------------------------------------------------------------------------
| Update Player Status
|--------------------------------------------------------------------------
*/

export const updatePlayerStatus = catchAsync(async (req, res) => {

    const player =
        await playerService.updatePlayer(
            req.params.id,
            {
                academyStatus: req.body.status,
            }
        );

    return sendResponse(res, {
        message: "Player status updated successfully.",
        data: player,
    });

});

/*
|--------------------------------------------------------------------------
| Update Career Statistics
|--------------------------------------------------------------------------
*/

export const updateCareerStatistics =
    catchAsync(async (req, res) => {

        const player =
            await playerService.getPlayer(
                req.params.id
            );

        player.career = {
            ...player.career.toObject(),
            ...req.body,
        };

        await player.save();

        return sendResponse(res, {
            message:
                "Career statistics updated successfully.",
            data: player,
        });

    });

/*
|--------------------------------------------------------------------------
| Dashboard Summary
|--------------------------------------------------------------------------
*/

export const dashboardSummary =
    catchAsync(async (req, res) => {

        const stats =
            await playerService.getStatistics();

        const recentPlayers =
            (
                await playerService.getPlayers({
                    page: 1,
                    limit: 5,
                })
            ).players;

        return sendResponse(res, {
            message:
                "Dashboard summary fetched successfully.",
            data: {
                statistics: stats,
                recentPlayers,
            },
        });

    });
