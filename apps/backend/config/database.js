const mongoose = require("mongoose");
const env = require("./env");
const logger = require("./logger");

mongoose.set("strictQuery", true);

async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGO_URI);

    logger.success("MongoDB connected successfully.");
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDatabase;
