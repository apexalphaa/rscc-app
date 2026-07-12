const logger = require("../config/logger");

module.exports = (err, req, res, next) => {
  logger.error(err.stack || err.message);

  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,

    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),

    timestamp: new Date().toISOString(),
  });
};
