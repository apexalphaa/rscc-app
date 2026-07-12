import teamService from "../services/team.service.js";

import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

/*
|--------------------------------------------------------------------------
| Create Team
|--------------------------------------------------------------------------
*/

export const createTeam = catchAsync(async (req, res) => {

    const team = await teamService.createTeam(
        req.body
    );

    return sendResponse(res, {
        statusCode: 201,
        message: "Team created successfully.",
        data: team,
    });

});

/*
|--------------------------------------------------------------------------
| Get All Teams
|--------------------------------------------------------------------------
*/

export const getAllTeams = catchAsync(async (req, res) => {

    const result = await teamService.getTeams(
        req.query
    );

    return sendResponse(res, {
        message: "Teams fetched successfully.",
        data: result.teams,
        meta: result.pagination,
    });

});

/*
|--------------------------------------------------------------------------
| Get Team By ID
|--------------------------------------------------------------------------
*/

export const getTeamById = catchAsync(async (req, res) => {

    const team = await teamService.getTeam(
        req.params.id
    );

    return sendResponse(res, {
        message: "Team fetched successfully.",
        data: team,
    });

});

/*
|--------------------------------------------------------------------------
| Update Team
|--------------------------------------------------------------------------
*/

export const updateTeam = catchAsync(async (req, res) => {

    const team = await teamService.updateTeam(
        req.params.id,
        req.body
    );

    return sendResponse(res, {
        message: "Team updated successfully.",
        data: team,
    });

});

/*
|--------------------------------------------------------------------------
| Delete Team
|--------------------------------------------------------------------------
*/

export const deleteTeam = catchAsync(async (req, res) => {

    await teamService.deleteTeam(
        req.params.id
    );

    return sendResponse(res, {
        message: "Team deleted successfully.",
    });

});

/*
|--------------------------------------------------------------------------
| Add Player To Team
|--------------------------------------------------------------------------
*/

export const addPlayer = catchAsync(async (req, res) => {

    const team = await teamService.addPlayer(
        req.params.id,
        req.body.playerId
    );

    return sendResponse(res, {
        message: "Player added successfully.",
        data: team,
    });

});

/*
|--------------------------------------------------------------------------
| Remove Player From Team
|--------------------------------------------------------------------------
*/

export const removePlayer = catchAsync(async (req, res) => {

    const team = await teamService.removePlayer(
        req.params.id,
        req.params.playerId
    );

    return sendResponse(res, {
        message: "Player removed successfully.",
        data: team,
    });

});

/*
|--------------------------------------------------------------------------
| Team Statistics
|--------------------------------------------------------------------------
*/

export const getStatistics = catchAsync(async (req, res) => {

    const statistics =
        await teamService.statistics();

    return sendResponse(res, {
        message: "Team statistics fetched successfully.",
        data: statistics,
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

        recentTeams,

    ] = await Promise.all([

        teamService.statistics(),

        teamService.getTeams({

            page: 1,

            limit: 5,

        }),

    ]);

    return sendResponse(res, {

        message:
            "Dashboard summary fetched successfully.",

        data: {

            statistics,

            recentTeams:
                recentTeams.teams,

        },

    });

});

/*
|--------------------------------------------------------------------------
| Teams By Category
|--------------------------------------------------------------------------
*/

export const getTeamsByCategory =
    catchAsync(async (req, res) => {

        const result =
            await teamService.getTeams({

                category: req.params.category,

                page: req.query.page,

                limit: req.query.limit,

            });

        return sendResponse(res, {

            message:
                "Teams fetched successfully.",

            data: result.teams,

            meta: result.pagination,

        });

    });

/*
|--------------------------------------------------------------------------
| Search Teams
|--------------------------------------------------------------------------
*/

export const searchTeams =
    catchAsync(async (req, res) => {

        const result =
            await teamService.getTeams({

                search: req.query.q,

                page: req.query.page,

                limit: req.query.limit,

            });

        return sendResponse(res, {

            message:
                "Search completed successfully.",

            data: result.teams,

            meta: result.pagination,

        });

    });

/*
|--------------------------------------------------------------------------
| Team Players
|--------------------------------------------------------------------------
*/

export const getTeamPlayers =
    catchAsync(async (req, res) => {

        const team =
            await teamService.getTeam(
                req.params.id
            );

        return sendResponse(res, {

            message:
                "Players fetched successfully.",

            data: team.players,

        });

    });

/*
|--------------------------------------------------------------------------
| Team Coaches
|--------------------------------------------------------------------------
*/

export const getTeamCoaches =
    catchAsync(async (req, res) => {

        const team =
            await teamService.getTeam(
                req.params.id
            );

        return sendResponse(res, {

            message:
                "Coaches fetched successfully.",

            data: team.coaches,

        });

    });
