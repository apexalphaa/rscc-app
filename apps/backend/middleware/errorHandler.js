const HTTP_STATUS = require("../constants/httpStatus");

module.exports = (err, req, res, next) => {
  const status = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};
