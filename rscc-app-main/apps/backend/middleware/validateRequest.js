export default function validateRequest(schema) {

    return (req, res, next) => {

        const { error } = schema.validate(
            {
                body: req.body,
                params: req.params,
                query: req.query,
            },
            {
                abortEarly: false,
                allowUnknown: false,
            }
        );

        if (!error) {
            return next();
        }

        return res.status(422).json({

            success: false,

            message: "Validation failed",

            errors: error.details.map((item) => ({
                field: item.path.join("."),
                message: item.message,
            })),

        });

    };

}
