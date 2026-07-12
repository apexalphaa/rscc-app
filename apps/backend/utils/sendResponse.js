import ApiResponse from "./ApiResponse.js";

export default function sendResponse(

    res,

    {

        statusCode = 200,

        message = "Success",

        data = null,

        meta = {},

    }

) {

    return res.status(statusCode).json(

        new ApiResponse(

            statusCode,

            message,

            data,

            meta

        )

    );

}
