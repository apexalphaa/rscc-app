import Player from "../models/Player.js";
import User from "../models/User.js";

class PlayerService {
    /*
    |--------------------------------------------------------------------------
    | Generate Player ID
    |--------------------------------------------------------------------------
    */

    async generatePlayerId() {
        const year = new Date().getFullYear().toString().slice(-2);

        const totalPlayers = await Player.countDocuments();

        const sequence = String(totalPlayers + 1).padStart(4, "0");

        return `RSCC-${year}-${sequence}`;
    }

    /*
    |--------------------------------------------------------------------------
    | Create Player
    |--------------------------------------------------------------------------
    */

    async createPlayer(payload) {
        const {
            user,
            fullName,
            dateOfBirth,
            gender,
            battingStyle,
            bowlingStyle,
            role,
            jerseyNumber,
            phone,
            parentName,
            parentPhone,
            address,
            joiningDate,
        } = payload;

        const existingUser = await User.findById(user);

        if (!existingUser) {
            throw new Error("User not found.");
        }

        const existingPlayer = await Player.findOne({
            user,
        });

        if (existingPlayer) {
            throw new Error("Player already exists.");
        }

        const duplicateJersey = await Player.findOne({
            jerseyNumber,
        });

        if (duplicateJersey) {
            throw new Error("Jersey number already assigned.");
        }

        let age = null;

        if (dateOfBirth) {
            age = Math.floor(
                (Date.now() - new Date(dateOfBirth)) /
                (365.25 * 24 * 60 * 60 * 1000)
            );
        }

        const player = await Player.create({
            user,

            playerId: await this.generatePlayerId(),

            fullName,

            dateOfBirth,

            age,

            gender,

            battingStyle,

            bowlingStyle,

            role,

            jerseyNumber,

            phone,

            parentName,

            parentPhone,

            address,

            joiningDate,
        });

        return await Player.findById(player._id)
            .populate("user", "-password -refreshToken");
    }

    /*
    |--------------------------------------------------------------------------
    | Get All Players
    |--------------------------------------------------------------------------
    */

    async getPlayers(query = {}) {
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

        if (query.role)
            filter.role = query.role;

        if (query.gender)
            filter.gender = query.gender;

        if (query.academyStatus)
            filter.academyStatus = query.academyStatus;

        if (query.search) {
            filter.$or = [
                {
                    fullName: {
                        $regex: query.search,
                        $options: "i",
                    },
                },
                {
                    playerId: {
                        $regex: query.search,
                        $options: "i",
                    },
                },
            ];
        }

        const [players, total] = await Promise.all([
            Player.find(filter)
                .populate(
                    "user",
                    "-password -refreshToken"
                )
                .sort({
                    createdAt: -1,
                })
                .skip(skip)
                .limit(limit),

            Player.countDocuments(filter),
        ]);

        return {
            players,

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
    | Get Player
    |--------------------------------------------------------------------------
    */

    async getPlayer(id) {
        const player = await Player.findById(id)
            .populate(
                "user",
                "-password -refreshToken"
            );

        if (!player)
            throw new Error("Player not found.");

        return player;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Player
    |--------------------------------------------------------------------------
    */

    async updatePlayer(id, payload) {
        const player = await Player.findById(id);

        if (!player)
            throw new Error("Player not found.");

        if (
            payload.jerseyNumber &&
            payload.jerseyNumber !== player.jerseyNumber
        ) {
            const duplicate = await Player.findOne({
                jerseyNumber: payload.jerseyNumber,
                _id: {
                    $ne: id,
                },
            });

            if (duplicate)
                throw new Error(
                    "Jersey number already assigned."
                );
        }

        if (payload.dateOfBirth) {
            payload.age = Math.floor(
                (Date.now() -
                    new Date(payload.dateOfBirth)) /
                (365.25 *
                    24 *
                    60 *
                    60 *
                    1000)
            );
        }

        Object.assign(player, payload);

        await player.save();

        return await Player.findById(id)
            .populate(
                "user",
                "-password -refreshToken"
            );
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Player
    |--------------------------------------------------------------------------
    */

    async deletePlayer(id) {
        const player = await Player.findById(id);

        if (!player)
            throw new Error("Player not found.");

        await player.deleteOne();

        return true;
    }

    /*
    |--------------------------------------------------------------------------
    | Dashboard Statistics
    |--------------------------------------------------------------------------
    */

    async getStatistics() {
        const [
            totalPlayers,
            activePlayers,
            malePlayers,
            femalePlayers,
        ] = await Promise.all([
            Player.countDocuments(),

            Player.countDocuments({
                academyStatus: "Active",
            }),

            Player.countDocuments({
                gender: "Male",
            }),

            Player.countDocuments({
                gender: "Female",
            }),
        ]);

        return {

            totalPlayers,

            activePlayers,

            inactivePlayers:
                totalPlayers - activePlayers,

            malePlayers,

            femalePlayers,

        };
    }
}

export default new PlayerService();
