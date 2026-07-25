import mongoose from "mongoose";
import env from "./env.js";
import logger from "./logger.js";

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

export default connectDatabase;
