import Match from "../models/Match.js";
import Team from "../models/Team.js";
import generateMatchNumber from "../utils/generateMatchNumber.js";

class MatchService {

    /*
    |--------------------------------------------------------------------------
    | Create Match
    |--------------------------------------------------------------------------
    */

    async createMatch(data, createdBy) {

        const homeTeam = await Team.findById(
            data.teams?.home
        );

        const awayTeam = await Team.findById(
            data.teams?.away
        );

        if (!homeTeam)
            throw new Error("Home team not found.");

        if (!awayTeam)
            throw new Error("Away team not found.");

        if (
            homeTeam._id.toString() ===
            awayTeam._id.toString()
        ) {
            throw new Error(
                "Both teams cannot be the same."
            );
        }

        const match = await Match.create({

            ...data,

            matchNumber:
                generateMatchNumber(),

            createdBy,

        });

        return this.getMatch(match._id);

    }

    /*
    |--------------------------------------------------------------------------
    | Get Matches
    |--------------------------------------------------------------------------
    */

    async getMatches(query = {}) {

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

        if (query.status)
            filter.status = query.status;

        if (query.matchType)
            filter.matchType = query.matchType;

        if (query.scoringMode)
            filter.scoringMode =
                query.scoringMode;

        const [matches, total] =
            await Promise.all([

                Match.find(filter)

                    .populate(
                        "teams.home",
                        "name shortName logo"
                    )

                    .populate(
                        "teams.away",
                        "name shortName logo"
                    )

                    .sort({
                        createdAt: -1,
                    })

                    .skip(skip)

                    .limit(limit),

                Match.countDocuments(filter),

            ]);

        return {

            matches,

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
    | Get Match
    |--------------------------------------------------------------------------
    */

    async getMatch(id) {

        const match =
            await Match.findById(id)

                .populate("teams.home")

                .populate("teams.away")

                .populate("playingXI.home")

                .populate("playingXI.away")

                .populate("captains.home")

                .populate("captains.away")

                .populate("wicketKeepers.home")

                .populate("wicketKeepers.away")

                .populate("toss.winner")

                .populate("winner")

                .populate(
                    "createdBy",
                    "name email"
                );

        if (!match)
            throw new Error(
                "Match not found."
            );

        return match;

    }

    /*
    |--------------------------------------------------------------------------
    | Update Match
    |--------------------------------------------------------------------------
    */

    async updateMatch(id, payload) {

        const match =
            await Match.findById(id);

        if (!match)
            throw new Error(
                "Match not found."
            );

        Object.assign(match, payload);

        await match.save();

        return this.getMatch(id);

    }

    /*
    |--------------------------------------------------------------------------
    | Update Status
    |--------------------------------------------------------------------------
    */

    async updateStatus(
        id,
        status
    ) {

        const match =
            await Match.findById(id);

        if (!match)
            throw new Error(
                "Match not found."
            );

        match.status = status;

        await match.save();

        return match;

    }

    /*
    |--------------------------------------------------------------------------
    | Delete Match
    |--------------------------------------------------------------------------
    */

    async deleteMatch(id) {

        const match =
            await Match.findById(id);

        if (!match)
            throw new Error(
                "Match not found."
            );

        await match.deleteOne();

        return true;

    }

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    async statistics() {

        const [

            total,

            draft,

            ready,

            live,

            completed,

        ] = await Promise.all([

            Match.countDocuments(),

            Match.countDocuments({
                status: "Draft",
            }),

            Match.countDocuments({
                status: "Ready",
            }),

            Match.countDocuments({
                status: "Live",
            }),

            Match.countDocuments({
                status: "Completed",
            }),

        ]);

        return {

            total,

            draft,

            ready,

            live,

            completed,

        };

    }

}

export default new MatchService();
