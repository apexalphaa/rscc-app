import Attendance from "../models/Attendance.js";
import Player from "../models/Player.js";

class AttendanceService {

    /*
    |--------------------------------------------------------------------------
    | Mark Attendance
    |--------------------------------------------------------------------------
    */

    async markAttendance(data, markedBy) {

        const {
            player,
            date,
            session = "Evening",
            status,
            arrivalTime,
            departureTime,
            remarks,
            location,
            batch,
            weather,
            attendanceSource = "Manual",
        } = data;

        const existingPlayer = await Player.findById(player);

        if (!existingPlayer) {
            throw new Error("Player not found.");
        }

        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        const existingAttendance = await Attendance.findOne({
            player,
            date: attendanceDate,
            session,
        });

        if (existingAttendance) {
            throw new Error("Attendance already marked for this session.");
        }

        const attendance = await Attendance.create({
            player,
            markedBy,
            date: attendanceDate,
            session,
            status,
            arrivalTime,
            departureTime,
            remarks,
            location,
            batch,
            weather,
            attendanceSource,
        });

        return await Attendance.findById(attendance._id)
            .populate("player")
            .populate("markedBy", "-password -refreshToken");
    }

    /*
    |--------------------------------------------------------------------------
    | Bulk Attendance
    |--------------------------------------------------------------------------
    */

    async bulkAttendance(players, commonData, markedBy) {

        const results = [];

        for (const player of players) {

            try {

                const attendance =
                    await this.markAttendance(
                        {
                            ...commonData,
                            ...player,
                        },
                        markedBy
                    );

                results.push({
                    success: true,
                    player: attendance.player._id,
                    attendance,
                });

            } catch (err) {

                results.push({
                    success: false,
                    player: player.player,
                    message: err.message,
                });

            }

        }

        return results;

    }

    /*
    |--------------------------------------------------------------------------
    | Get Attendance
    |--------------------------------------------------------------------------
    */

    async getAttendance(query = {}) {

        const page = Math.max(
            parseInt(query.page || 1),
            1
        );

        const limit = Math.max(
            parseInt(query.limit || 20),
            1
        );

        const skip = (page - 1) * limit;

        const filter = {};

        if (query.player)
            filter.player = query.player;

        if (query.status)
            filter.status = query.status;

        if (query.session)
            filter.session = query.session;

        if (query.batch)
            filter.batch = query.batch;

        if (query.from || query.to) {

            filter.date = {};

            if (query.from)
                filter.date.$gte = new Date(query.from);

            if (query.to)
                filter.date.$lte = new Date(query.to);

        }

        const [attendance, total] =
            await Promise.all([

                Attendance.find(filter)
                    .populate("player")
                    .populate("markedBy", "name email")
                    .sort({
                        date: -1,
                    })
                    .skip(skip)
                    .limit(limit),

                Attendance.countDocuments(filter),

            ]);

        return {

            attendance,

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
    | Player History
    |--------------------------------------------------------------------------
    */

    async playerHistory(playerId) {

        return Attendance.find({
            player: playerId,
        })
            .populate("markedBy", "name")
            .sort({
                date: -1,
            });

    }

    /*
    |--------------------------------------------------------------------------
    | Update Attendance
    |--------------------------------------------------------------------------
    */

    async updateAttendance(id, payload) {

        const attendance =
            await Attendance.findById(id);

        if (!attendance)
            throw new Error("Attendance not found.");

        Object.assign(attendance, payload);

        await attendance.save();

        return attendance.populate([
            {
                path: "player",
            },
            {
                path: "markedBy",
                select: "name",
            },
        ]);

    }

    /*
    |--------------------------------------------------------------------------
    | Delete Attendance
    |--------------------------------------------------------------------------
    */

    async deleteAttendance(id) {

        const attendance =
            await Attendance.findById(id);

        if (!attendance)
            throw new Error("Attendance not found.");

        await attendance.deleteOne();

        return true;

    }

    /*
    |--------------------------------------------------------------------------
    | Dashboard Statistics
    |--------------------------------------------------------------------------
    */

    async statistics(date = new Date()) {

        const d = new Date(date);

        d.setHours(0, 0, 0, 0);

        const stats =
            await Attendance.aggregate([

                {
                    $match: {
                        date: d,
                    },
                },

                {
                    $group: {

                        _id: "$status",

                        count: {
                            $sum: 1,
                        },

                    },
                },

            ]);

        const response = {

            Present: 0,

            Absent: 0,

            Late: 0,

            Leave: 0,

            Total: 0,

        };

        stats.forEach((item) => {

            response[item._id] =
                item.count;

            response.Total += item.count;

        });

        return response;

    }

    /*
    |--------------------------------------------------------------------------
    | Attendance Percentage
    |--------------------------------------------------------------------------
    */

    async attendancePercentage(playerId) {

        const total =
            await Attendance.countDocuments({
                player: playerId,
            });

        if (total === 0)
            return 0;

        const present =
            await Attendance.countDocuments({

                player: playerId,

                status: {
                    $in: [
                        "Present",
                        "Late",
                    ],
                },

            });

        return Number(
            ((present / total) * 100)
                .toFixed(2)
        );

    }

}

export default new AttendanceService();
