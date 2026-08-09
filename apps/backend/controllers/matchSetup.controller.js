import Match from "../models/Match.js";
import Team from "../models/Team.js";
import generateMatchNumber from "../utils/generateMatchNumber.js";

/*
|--------------------------------------------------------------------------
| Create Draft Match
|--------------------------------------------------------------------------
*/

export const createDraftMatch = async (req, res) => {

    try {

        const {

            scoringMode,
            matchType,

        } = req.body;

        const match = await Match.create({

            scoringMode,

            matchType,

            matchNumber: generateMatchNumber(),

            createdBy: req.user._id,

        });

        return res.status(201).json({

            success: true,

            message: "Draft Match Created",

            match,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

/*
|--------------------------------------------------------------------------
| Update Match Details
|--------------------------------------------------------------------------
*/

export const updateMatchDetails = async (req, res) => {

    try {

        const {

            venue,
            ground,
            city,
            overs,
            matchDate,

        } = req.body;

        const match = await Match.findByIdAndUpdate(

            req.params.id,

            {

                details: {

                    venue,
                    ground,
                    city,
                    overs,
                    matchDate,

                },

                setupProgress: 1,

            },

            {

                new: true,

            }

        );

        return res.status(200).json({

            success: true,

            message: "Match Details Updated",

            match,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

/*
|--------------------------------------------------------------------------
| Select Teams
|--------------------------------------------------------------------------
*/

export const selectTeams = async (req, res) => {

    try {

        const {

            homeTeamId,
            awayTeamId,

        } = req.body;

        const home = await Team.findById(homeTeamId);

        const away = await Team.findById(awayTeamId);

        if (!home || !away) {

            return res.status(404).json({

                success: false,

                message: "Invalid Team Selected",

            });

        }

        const match = await Match.findByIdAndUpdate(

            req.params.id,

            {

                teams: {

                    home: homeTeamId,

                    away: awayTeamId,

                },

                setupProgress: 2,

            },

            {

                new: true,

            }

        )

        .populate("teams.home")

        .populate("teams.away");

        return res.status(200).json({

            success: true,

            message: "Teams Selected",

            match,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

/*
|--------------------------------------------------------------------------
| Select Playing XI
|--------------------------------------------------------------------------
*/

export const selectPlayingXI = async (req, res) => {

    try {

        const {

            homeXI,
            awayXI,

            homeCaptain,
            awayCaptain,

            homeKeeper,
            awayKeeper,

        } = req.body;

        const match = await Match.findByIdAndUpdate(

            req.params.id,

            {

                playingXI: {

                    home: homeXI,

                    away: awayXI,

                },

                captains: {

                    home: homeCaptain,

                    away: awayCaptain,

                },

                wicketKeepers: {

                    home: homeKeeper,

                    away: awayKeeper,

                },

                setupProgress: 3,

            },

            {

                new: true,

            }

        );

        return res.status(200).json({

            success: true,

            message: "Playing XI Saved",

            match,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

/*
|--------------------------------------------------------------------------
| Get Match
|--------------------------------------------------------------------------
*/

export const getDraftMatch = async (req, res) => {

    try {

        const match = await Match.findById(

            req.params.id

        )

        .populate("teams.home")

        .populate("teams.away");

        return res.status(200).json({

            success: true,

            match,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
