import Joi from "joi";

export const markAttendanceSchema = Joi.object({
    body: Joi.object({
        player: Joi.string().required(),

        date: Joi.date().required(),

        session: Joi.string()
            .valid(
                "Morning",
                "Afternoon",
                "Evening",
                "Match",
                "Fitness",
                "Special"
            )
            .default("Evening"),

        status: Joi.string()
            .valid(
                "Present",
                "Absent",
                "Late",
                "Leave"
            )
            .required(),

        arrivalTime: Joi.date().allow(null),

        departureTime: Joi.date().allow(null),

        remarks: Joi.string()
            .allow("")
            .max(500),

        location: Joi.string().allow(""),

        batch: Joi.string().allow(""),

        weather: Joi.string().allow(""),

        attendanceSource: Joi.string()
            .valid(
                "Manual",
                "QR",
                "GPS",
                "Biometric"
            )
            .default("Manual"),
    }),
});

export const bulkAttendanceSchema = Joi.object({
    body: Joi.object({
        players: Joi.array()
            .items(
                Joi.object({
                    player: Joi.string().required(),

                    status: Joi.string()
                        .valid(
                            "Present",
                            "Absent",
                            "Late",
                            "Leave"
                        )
                        .required(),
                })
            )
            .required(),

        date: Joi.date().required(),

        session: Joi.string().required(),

        batch: Joi.string().allow(""),

        location: Joi.string().allow(""),

        weather: Joi.string().allow(""),
    }),
});
