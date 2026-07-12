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

        const { scoringMode, matchType } = req.body;

        const match = await Match.create({
            scoringMode,
            matchType,
            matchNumber: generateMatchNumber(),
            createdBy: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Draft Match Created Successfully",
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

        return res.status(200).json({

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

            homeTeamId,
            awayTeamId,

        } = req.body;

        if (!homeTeamId || !awayTeamId) {

            return res.status(400).json({

                success: false,

                message: "Both team ids are required."

            });

        }

        if (homeTeamId === awayTeamId) {

            return res.status(400).json({

                success: false,

                message: "Home and Away teams cannot be same."

            });

        }

        const homeTeam = await Team.findById(homeTeamId);

        const awayTeam = await Team.findById(awayTeamId);

        if (!homeTeam) {

            return res.status(404).json({

                success: false,

                message: "Home team not found."

            });

        }

        if (!awayTeam) {

            return res.status(404).json({

                success: false,

                message: "Away team not found."

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

            message: "Teams Selected Successfully",

            match,

        });

    }

    catch(error){

        console.error(error);

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};

/*
|--------------------------------------------------------------------------
| Get Draft Match
|--------------------------------------------------------------------------
*/

export const getDraftMatch = async (req,res)=>{

    try{

        const match=await Match.findById(

            req.params.id

        )

        .populate("teams.home")

        .populate("teams.away")

        .populate("createdBy","name email");

        if(!match){

            return res.status(404).json({

                success:false,

                message:"Match not found"

            });

        }

        return res.status(200).json({

            success:true,

            match,

        });

    }

    catch(error){

        console.error(error);

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};
