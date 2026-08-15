import logger from "../config/logger.js";

export default function processHandlers() {
  process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception: ${err.stack || err.message}`);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
    process.exit(1);
  });
}
