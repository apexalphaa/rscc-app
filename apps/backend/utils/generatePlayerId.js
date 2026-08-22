import Player from "../models/Player.js";

/**
 * Generate a human-friendly RSCC player identifier.
 * The counter is derived from existing IDs and checked for uniqueness so it
 * also works with databases created before player IDs were introduced.
 */
export const generatePlayerId = async () => {
  const prefix = "RSCC-";
  const players = await Player.find({ playerId: { $regex: `^${prefix}\\d+$` } })
    .select("playerId")
    .lean();

  let next = 1;
  for (const player of players) {
    const number = Number(String(player.playerId).slice(prefix.length));
    if (Number.isFinite(number)) next = Math.max(next, number + 1);
  }

  // The loop makes this safe against an existing collision. A concurrent
  // approval can still race, so callers should retry on duplicate-key errors.
  while (await Player.exists({ playerId: `${prefix}${String(next).padStart(4, "0")}` })) {
    next += 1;
  }

  return `${prefix}${String(next).padStart(4, "0")}`;
};

export default generatePlayerId;
