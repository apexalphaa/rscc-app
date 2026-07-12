import Team from "../models/Team.js";
import Player from "../models/Player.js";
import generateTeamCode from "../utils/generateTeamCode.js";

class TeamService {

    /*
    |--------------------------------------------------------------------------
    | Create Team
    |--------------------------------------------------------------------------
    */

    async createTeam(payload) {

        const {
            name,
            shortName,
            category,
            logo = "",
        } = payload;

        const existing = await Team.findOne({
            $or: [
                { name },
                { shortName },
            ],
        });

        if (existing) {
            throw new Error("Team already exists.");
        }

        const team = await Team.create({

            teamCode: generateTeamCode(
                category,
                name
            ),

            name,

            shortName,

            category,

            logo,

        });

        return team;

    }

    /*
    |--------------------------------------------------------------------------
    | Get Teams
    |--------------------------------------------------------------------------
    */

    async getTeams(query = {}) {

        const page = Math.max(
            parseInt(query.page || 1),
            1
        );

        const limit = Math.max(
            parseInt(query.limit || 10),
            1
        );

        const skip = (page - 1) * limit;

        const filter = {};

        if (query.category)
            filter.category = query.category;

        if (query.search) {

            filter.$or = [

                {
                    name: {
                        $regex: query.search,
                        $options: "i",
                    },
                },

                {
                    shortName: {
                        $regex: query.search,
                        $options: "i",
                    },
                },

                {
                    teamCode: {
                        $regex: query.search,
                        $options: "i",
                    },
                },

            ];

        }

        const [teams, total] = await Promise.all([

            Team.find(filter)

                .populate("players")

                .populate("coaches")

                .sort({
                    createdAt: -1,
                })

                .skip(skip)

                .limit(limit),

            Team.countDocuments(filter),

        ]);

        return {

            teams,

            pagination: {

                page,

                limit,

                total,

                totalPages: Math.ceil(
                    total / limit
                ),

            },

        };

    }

    /*
    |--------------------------------------------------------------------------
    | Get Team
    |--------------------------------------------------------------------------
    */

    async getTeam(id) {

        const team = await Team.findById(id)

            .populate("players")

            .populate("coaches");

        if (!team)
            throw new Error("Team not found.");

        return team;

    }

    /*
    |--------------------------------------------------------------------------
    | Update Team
    |--------------------------------------------------------------------------
    */

    async updateTeam(id, payload) {

        const team =
            await Team.findById(id);

        if (!team)
            throw new Error("Team not found.");

        Object.assign(team, payload);

        await team.save();

        return this.getTeam(id);

    }

    /*
    |--------------------------------------------------------------------------
    | Delete Team
    |--------------------------------------------------------------------------
    */

    async deleteTeam(id) {

        const team =
            await Team.findById(id);

        if (!team)
            throw new Error("Team not found.");

        await team.deleteOne();

        return true;

    }

    /*
    |--------------------------------------------------------------------------
    | Add Player
    |--------------------------------------------------------------------------
    */

    async addPlayer(teamId, playerId) {

        const team =
            await Team.findById(teamId);

        if (!team)
            throw new Error("Team not found.");

        const player =
            await Player.findById(playerId);

        if (!player)
            throw new Error("Player not found.");

        if (
            team.players.some(
                id => id.toString() === playerId
            )
        ) {
            throw new Error(
                "Player already exists in this team."
            );
        }

        team.players.push(playerId);

        await team.save();

        return this.getTeam(teamId);

    }

    /*
    |--------------------------------------------------------------------------
    | Remove Player
    |--------------------------------------------------------------------------
    */

    async removePlayer(teamId, playerId) {

        const team =
            await Team.findById(teamId);

        if (!team)
            throw new Error("Team not found.");

        team.players =
            team.players.filter(

                id =>
                    id.toString() !== playerId

            );

        await team.save();

        return this.getTeam(teamId);

    }

    /*
    |--------------------------------------------------------------------------
    | Team Statistics
    |--------------------------------------------------------------------------
    */

    async statistics() {

        const [

            totalTeams,

            u14,

            u16,

            u19,

            senior,

            visitor,

        ] = await Promise.all([

            Team.countDocuments(),

            Team.countDocuments({
                category: "U14",
            }),

            Team.countDocuments({
                category: "U16",
            }),

            Team.countDocuments({
                category: "U19",
            }),

            Team.countDocuments({
                category: "Senior",
            }),

            Team.countDocuments({
                category: "Visitor",
            }),

        ]);

        return {

            totalTeams,

            categories: {

                U14: u14,

                U16: u16,

                U19: u19,

                Senior: senior,

                Visitor: visitor,

            },

        };

    }

}

export default new TeamService();
