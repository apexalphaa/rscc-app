module.exports = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
      },
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    if (error) {
      return res.status(422).json({
        success: false,
        message: "Validation failed.",
        errors: error.details.map((item) => ({
          field: item.path.join("."),
          message: item.message,
        })),
      });
    }

    req.body = value.body || {};
    req.params = value.params || {};
    req.query = value.query || {};

    next();
  };
};
