import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
    {
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true,
            index: true,
        },

        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        date: {
            type: Date,
            required: true,
            index: true,
        },

        session: {
            type: String,
            enum: [
                "Morning",
                "Afternoon",
                "Evening",
                "Match",
                "Fitness",
                "Special",
            ],
            default: "Evening",
            index: true,
        },

        status: {
            type: String,
            enum: [
                "Present",
                "Absent",
                "Late",
                "Leave",
            ],
            required: true,
            index: true,
        },

        arrivalTime: {
            type: Date,
            default: null,
        },

        departureTime: {
            type: Date,
            default: null,
        },

        remarks: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },

        location: {
            type: String,
            default: "RSCC Ground",
        },

        batch: {
            type: String,
            default: "",
            index: true,
        },

        weather: {
            type: String,
            default: "",
        },

        isHoliday: {
            type: Boolean,
            default: false,
        },

        attendanceSource: {
            type: String,
            enum: [
                "Manual",
                "QR",
                "GPS",
                "Biometric",
            ],
            default: "Manual",
        },

        metadata: {
            type: Object,
            default: {},
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
|--------------------------------------------------------------------------
| Compound Index
|--------------------------------------------------------------------------
|
| Prevent duplicate attendance for the same player,
| date and session.
|
*/

attendanceSchema.index(
    {
        player: 1,
        date: 1,
        session: 1,
    },
    {
        unique: true,
    }
);

/*
|--------------------------------------------------------------------------
| Reporting Indexes
|--------------------------------------------------------------------------
*/

attendanceSchema.index({
    date: -1,
});

attendanceSchema.index({
    player: 1,
    status: 1,
});

attendanceSchema.index({
    markedBy: 1,
    date: -1,
});

attendanceSchema.index({
    batch: 1,
    date: -1,
});

/*
|--------------------------------------------------------------------------
| Normalize Date
|--------------------------------------------------------------------------
*/

attendanceSchema.pre("save", function (next) {

    const d = new Date(this.date);

    d.setHours(0, 0, 0, 0);

    this.date = d;

    next();

});

/*
|--------------------------------------------------------------------------
| Instance Methods
|--------------------------------------------------------------------------
*/

attendanceSchema.methods.isPresent = function () {

    return this.status === "Present";

};

attendanceSchema.methods.isLate = function () {

    return this.status === "Late";

};

/*
|--------------------------------------------------------------------------
| Static Methods
|--------------------------------------------------------------------------
*/

attendanceSchema.statics.todayAttendance = function () {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return this.find({
        date: today,
    });

};

attendanceSchema.statics.playerHistory = function (playerId) {

    return this.find({
        player: playerId,
    }).sort({
        date: -1,
    });

};

const Attendance = mongoose.model(
    "Attendance",
    attendanceSchema
);

export default Attendance;
