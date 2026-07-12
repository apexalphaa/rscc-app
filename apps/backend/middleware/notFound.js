import ApiError from "../utils/ApiError.js";

export default function notFound(req, res, next) {

    next(

        new ApiError(

            404,

            `Cannot ${req.method} ${req.originalUrl}`

        )

    );

}
