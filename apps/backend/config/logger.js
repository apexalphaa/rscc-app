const timestamp = () => new Date().toISOString();

const format = (level, message) =>
  `[${timestamp()}] [${level}] ${message}`;

const logger = {
  info(message) {
    console.log(format("INFO", message));
  },

  warn(message) {
    console.warn(format("WARN", message));
  },

  error(message) {
    console.error(format("ERROR", message));
  },

  success(message) {
    console.log(format("SUCCESS", message));
  },

  debug(message) {
    if (process.env.NODE_ENV !== "production") {
      console.log(format("DEBUG", message));
    }
  },
};

module.exports = logger;
