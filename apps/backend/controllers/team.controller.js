import Team from "../models/Team.js";
import generateTeamCode from "../utils/generateTeamCode.js";

/*
|--------------------------------------------------------------------------
| Create Team
|--------------------------------------------------------------------------
*/

export const createTeam = async (req, res) => {

    try {

        const {

            name,
            shortName,
            category,
            logo,

        } = req.body;

        if (!name || !shortName || !category) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        const existingTeam = await Team.findOne({

            name,

        });

        if (existingTeam) {

            return res.status(400).json({

                success: false,

                message: "Team already exists."

            });

        }

        const team = await Team.create({

            name,

            shortName,

            category,

            logo,

            teamCode: generateTeamCode(category, name),

        });

        return res.status(201).json({

            success: true,

            message: "Team created successfully.",

            team,

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
| Get All Teams
|--------------------------------------------------------------------------
*/

export const getAllTeams = async (req, res) => {

    try {

        const teams = await Team.find()
            .sort({
                createdAt: -1,
            });

        return res.json({

            success: true,

            count: teams.length,

            teams,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

/*
|--------------------------------------------------------------------------
| Get Team By ID
|--------------------------------------------------------------------------
*/

export const getTeamById = async (req, res) => {

    try {

        const team = await Team.findById(
            req.params.id
        );

        if (!team) {

            return res.status(404).json({

                success: false,

                message: "Team not found."

            });

        }

        return res.json({

            success: true,

            team,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

/*
|--------------------------------------------------------------------------
| Update Team
|--------------------------------------------------------------------------
*/

export const updateTeam = async (req, res) => {

    try {

        const team = await Team.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

            }

        );

        return res.json({

            success: true,

            message: "Team updated successfully.",

            team,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

/*
|--------------------------------------------------------------------------
| Delete Team
|--------------------------------------------------------------------------
*/

export const deleteTeam = async (req, res) => {

    try {

        await Team.findByIdAndDelete(
            req.params.id
        );

        return res.json({

            success: true,

            message: "Team deleted successfully."

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
