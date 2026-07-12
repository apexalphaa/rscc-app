import matchSetupService from "../services/matchSetup.service.js";

import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

/*
|--------------------------------------------------------------------------
| Get Match Setup
|--------------------------------------------------------------------------
*/

export const getMatchSetup = catchAsync(async (req, res) => {

    const match =
        await matchSetupService.getMatch(
            req.params.id
        );

    return sendResponse(res, {
        message: "Match setup fetched successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Get Setup Status
|--------------------------------------------------------------------------
*/

export const getSetupStatus = catchAsync(async (req, res) => {

    const status =
        await matchSetupService.getSetupStatus(
            req.params.id
        );

    return sendResponse(res, {
        message: "Setup status fetched successfully.",
        data: status,
    });

});

/*
|--------------------------------------------------------------------------
| Update Match Details
|--------------------------------------------------------------------------
*/

export const updateMatchDetails = catchAsync(async (req, res) => {

    const match =
        await matchSetupService.updateDetails(
            req.params.id,
            req.body
        );

    return sendResponse(res, {
        message: "Match details updated successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Assign Teams
|--------------------------------------------------------------------------
*/

export const assignTeams = catchAsync(async (req, res) => {

    const {
        home,
        away,
    } = req.body;

    const match =
        await matchSetupService.assignTeams(
            req.params.id,
            home,
            away
        );

    return sendResponse(res, {
        message: "Teams assigned successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Get Squad
|--------------------------------------------------------------------------
*/

export const getSquad = catchAsync(async (req, res) => {

    const squad =
        await matchSetupService.getSquad(
            req.params.id
        );

    return sendResponse(res, {
        message: "Squad fetched successfully.",
        data: squad,
    });

});

/*
|--------------------------------------------------------------------------
| Update Squad
|--------------------------------------------------------------------------
*/

export const updateSquad = catchAsync(async (req, res) => {

    const {
        homeSquad,
        awaySquad,
    } = req.body;

    const match =
        await matchSetupService.updateSquad(
            req.params.id,
            homeSquad,
            awaySquad
        );

    return sendResponse(res, {
        message: "Squad updated successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Assign Playing XI
|--------------------------------------------------------------------------
*/

export const assignPlayingXI = catchAsync(async (req, res) => {

    const {
        homeXI,
        awayXI,
    } = req.body;

    const match =
        await matchSetupService.assignPlayingXI(
            req.params.id,
            homeXI,
            awayXI
        );

    return sendResponse(res, {
        message: "Playing XI assigned successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Assign Leadership
|--------------------------------------------------------------------------
*/

export const assignLeadership = catchAsync(async (req, res) => {

    const match =
        await matchSetupService.assignLeadership(
            req.params.id,
            req.body
        );

    return sendResponse(res, {
        message: "Leadership assigned successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Record Toss
|--------------------------------------------------------------------------
*/

export const recordToss = catchAsync(async (req, res) => {

    const {
        winner,
        decision,
    } = req.body;

    const match =
        await matchSetupService.recordToss(
            req.params.id,
            winner,
            decision
        );

    return sendResponse(res, {
        message: "Toss recorded successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Assign Opening Players
|--------------------------------------------------------------------------
*/

export const assignOpeningPlayers = catchAsync(async (req, res) => {

    const match =
        await matchSetupService.assignOpeningPlayers(
            req.params.id,
            req.body
        );

    return sendResponse(res, {
        message: "Opening players assigned successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Assign Officials
|--------------------------------------------------------------------------
*/

export const assignOfficials = catchAsync(async (req, res) => {

    const match =
        await matchSetupService.assignOfficials(
            req.params.id,
            req.body
        );

    return sendResponse(res, {
        message: "Officials assigned successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Complete Setup
|--------------------------------------------------------------------------
*/

export const completeSetup = catchAsync(async (req, res) => {

    const match =
        await matchSetupService.completeSetup(
            req.params.id
        );

    return sendResponse(res, {
        message: "Match setup completed successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Reset Setup
|--------------------------------------------------------------------------
*/

export const resetSetup = catchAsync(async (req, res) => {

    const match =
        await matchSetupService.resetSetup(
            req.params.id
        );

    return sendResponse(res, {
        message: "Match setup reset successfully.",
        data: match,
    });

});

/*
|--------------------------------------------------------------------------
| Dashboard Summary
|--------------------------------------------------------------------------
*/

export const dashboardSummary = catchAsync(async (req, res) => {

    const [
        setup,
        status,
    ] = await Promise.all([

        matchSetupService.getMatch(
            req.params.id
        ),

        matchSetupService.getSetupStatus(
            req.params.id
        ),

    ]);

    return sendResponse(res, {
        message: "Match setup dashboard fetched successfully.",
        data: {
            match: setup,
            status,
        },
    });

});
