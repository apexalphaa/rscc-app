import ApiError from "../utils/ApiError.js";

export default function errorHandler(
    err,
    req,
    res,
    next
) {

    if (!(err instanceof ApiError)) {

        console.error(err);

        err = new ApiError(
            500,
            "Internal Server Error"
        );

    }

    return res.status(err.statusCode).json({

        success: false,

        message: err.message,

        errors: err.errors,

        ...(process.env.NODE_ENV !== "production" && {
            stack: err.stack,
        }),

    });

}
