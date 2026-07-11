import Match from "../models/Match.js";
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

    } catch (error) {

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

        if (!match) {

            return res.status(404).json({

                success: false,

                message: "Match not found",

            });

        }

        return res.json({

            success: true,

            message: "Match Details Updated",

            match,

        });

    } catch (error) {

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

            home,

            away,

        } = req.body;

        const match = await Match.findByIdAndUpdate(

            req.params.id,

            {

                teams: {

                    home,

                    away,

                },

                setupProgress: 2,

            },

            {

                new: true,

            }

        );

        if (!match) {

            return res.status(404).json({

                success: false,

                message: "Match not found",

            });

        }

        return res.json({

            success: true,

            message: "Teams Selected",

            match,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

/*
|--------------------------------------------------------------------------
| Get Draft Match
|--------------------------------------------------------------------------
*/

export const getDraftMatch = async (req, res) => {

    try {

        const match = await Match.findById(req.params.id)

            .populate("teams.home")

            .populate("teams.away")

            .populate("createdBy", "name");

        if (!match) {

            return res.status(404).json({

                success: false,

                message: "Match not found",

            });

        }

        return res.json({

            success: true,

            match,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
