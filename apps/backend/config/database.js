import mongoose from "mongoose";

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;

  if (!uri) {
    console.warn("No MongoDB connection string provided; skipping database connection.");
    return;
  }

  try {
    const connection = await mongoose.connect(uri);
    console.log(`MongoDB Connected : ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDatabase;
