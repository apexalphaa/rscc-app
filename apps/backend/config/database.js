import mongoose from "mongoose";
import Player from "../models/Player.js";
import generatePlayerId from "../utils/generatePlayerId.js";

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;

  if (!uri) {
    console.warn("No MongoDB connection string provided; skipping database connection.");
    return;
  }

  try {
    const connection = await mongoose.connect(uri);
    console.log(`MongoDB Connected : ${connection.connection.host}`);

    // Older RSCC builds created playerId as a normal unique index. That makes
    // every pending player with a missing playerId collide on null. The current
    // schema intentionally uses a sparse unique index because IDs are generated
    // only when a membership is approved.
    try {
      await Player.syncIndexes();
      console.log("RSCC Player indexes synchronized");

      // Repair active players created by older builds that have no playerId.
      // Pending requests intentionally remain without a Player document/ID.
      const legacyActive = await Player.find({
        academyStatus: "Active",
        $or: [{ playerId: null }, { playerId: { $exists: false } }],
      }).select("_id playerId");
      for (const player of legacyActive) {
        player.playerId = await generatePlayerId();
        await player.save();
      }
      if (legacyActive.length) console.log(`Backfilled ${legacyActive.length} active RSCC player IDs`);
    } catch (indexError) {
      console.error("Player index synchronization failed:", indexError.message);
    }
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDatabase;
