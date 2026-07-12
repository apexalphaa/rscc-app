import matchService from "../services/match.service.js";

import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

/*
|--------------------------------------------------------------------------
| Create Match
|--------------------------------------------------------------------------
*/

export const createMatch = catchAsync(async (req, res) => {

    const match = await matchService.createMatch(
        req.body,
        req.user._id
    );

    return sendResponse(res, {
        statusCode: 201,
        message: "Match created successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Get All Matches
|--------------------------------------------------------------------------
*/

export const getAllMatches = catchAsync(async (req, res) => {

    const result =
        await matchService.getMatches(req.query);

    return sendResponse(res, {

        message: "Matches fetched successfully.",

        data: result.matches,

        meta: result.pagination,

    });

});

/*
|--------------------------------------------------------------------------
| Get Match
|--------------------------------------------------------------------------
*/

export const getMatchById = catchAsync(async (req, res) => {

    const match =
        await matchService.getMatch(req.params.id);

    return sendResponse(res, {

        message: "Match fetched successfully.",

        data: match,

    });

});

/*
|--------------------------------------------------------------------------
| Update Match
|--------------------------------------------------------------------------
*/

export const updateMatch = catchAsync(async (req, res) => {

    const match =
        await matchService.updateMatch(
            req.params.id,
            req.body
        );

    return sendResponse(res, {

        message: "Match updated successfully.",

        data: match,

    });

});

/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/

export const updateMatchStatus =
catchAsync(async (req, res) => {

    const match =
        await matchService.updateStatus(

            req.params.id,

            req.body.status

        );

    return sendResponse(res, {

        message:
            "Match status updated successfully.",

        data: match,

    });

});

/*
|--------------------------------------------------------------------------
| Delete Match
|--------------------------------------------------------------------------
*/

export const deleteMatch = catchAsync(async (req, res) => {

    await matchService.deleteMatch(
        req.params.id
    );

    return sendResponse(res, {

        message:
            "Match deleted successfully.",

    });

});

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const getStatistics =
catchAsync(async (req, res) => {

    const statistics =
        await matchService.statistics();

    return sendResponse(res, {

        message:
            "Statistics fetched successfully.",

        data: statistics,

    });

});

/*
|--------------------------------------------------------------------------
| Dashboard Summary
|--------------------------------------------------------------------------
*/

export const dashboardSummary =
catchAsync(async (req, res) => {

    const [

        statistics,

        recentMatches,

    ] = await Promise.all([

        matchService.statistics(),

        matchService.getMatches({

            page: 1,

            limit: 5,

        }),

    ]);

    return sendResponse(res, {

        message:
            "Dashboard summary fetched successfully.",

        data: {

            statistics,

            recentMatches:
                recentMatches.matches,

        },

    });

});

/*
|--------------------------------------------------------------------------
| Search Matches
|--------------------------------------------------------------------------
*/

export const searchMatches =
catchAsync(async (req, res) => {

    const result =
        await matchService.getMatches({

            ...req.query,

        });

    return sendResponse(res, {

        message:
            "Search completed successfully.",

        data: result.matches,

        meta: result.pagination,

    });

});

/*
|--------------------------------------------------------------------------
| Matches By Status
|--------------------------------------------------------------------------
*/

export const getMatchesByStatus =
catchAsync(async (req, res) => {

    const result =
        await matchService.getMatches({

            status: req.params.status,

            page: req.query.page,

            limit: req.query.limit,

        });

    return sendResponse(res, {

        message:
            "Matches fetched successfully.",

        data: result.matches,

        meta: result.pagination,

    });

});

/*
|--------------------------------------------------------------------------
| Matches By Type
|--------------------------------------------------------------------------
*/

export const getMatchesByType =
catchAsync(async (req, res) => {

    const result =
        await matchService.getMatches({

            matchType: req.params.type,

            page: req.query.page,

            limit: req.query.limit,

        });

    return sendResponse(res, {

        message:
            "Matches fetched successfully.",

        data: result.matches,

        meta: result.pagination,

    });

});

/*
|--------------------------------------------------------------------------
| Setup Progress
|--------------------------------------------------------------------------
*/

export const updateSetupProgress =
catchAsync(async (req, res) => {

    const match =
        await matchService.updateMatch(

            req.params.id,

            {

                setupProgress:
                    req.body.setupProgress,

            }

        );

    return sendResponse(res, {

        message:
            "Setup progress updated successfully.",

        data: match,

    });

});

/*
|--------------------------------------------------------------------------
| Match Overview
|--------------------------------------------------------------------------
*/

export const getMatchOverview =
catchAsync(async (req, res) => {

    const match =
        await matchService.getMatch(
            req.params.id
        );

    return sendResponse(res, {

        message:
            "Match overview fetched successfully.",

        data: {

            id: match._id,

            matchNumber:
                match.matchNumber,

            status:
                match.status,

            matchType:
                match.matchType,

            scoringMode:
                match.scoringMode,

            setupProgress:
                match.setupProgress,

            venue:
                match.details,

            teams:
                match.teams,

            toss:
                match.toss,

            winner:
                match.winner,

            currentInnings:
                match.currentInnings,

        },

    });

});
