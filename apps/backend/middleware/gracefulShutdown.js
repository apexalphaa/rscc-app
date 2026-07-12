const logger = require("../config/logger");

module.exports = (server) => {
  const shutdown = (signal) => {
    logger.warn(`${signal} received. Closing server...`);

    server.close(() => {
      logger.success("HTTP server closed.");
      process.exit(0);
    });

    setTimeout(() => {
      logger.error("Force shutting down...");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};
