import Ball from "../models/Ball.js";
import Innings from "../models/Innings.js";
import Player from "../models/Player.js";

const updatePlayerStats = async (playerId, data) => {
  if (!playerId) return;

  const player = await Player.findById(playerId);
  if (!player) return;

  const career = player.career || {};

  career.matches = Number(career.matches || 0) + (data.matchesDelta || 0);
  career.innings = Number(career.innings || 0) + (data.inningsDelta || 0);
  career.runs = Number(career.runs || 0) + (data.runsDelta || 0);
  career.wickets = Number(career.wickets || 0) + (data.wicketsDelta || 0);
  career.catches = Number(career.catches || 0) + (data.catchesDelta || 0);

  if (data.highestScoreDelta) {
    career.highestScore = Math.max(Number(career.highestScore || 0), Number(data.highestScoreDelta));
  }

  if (career.runs && career.innings) {
    career.battingAverage = Number((career.runs / career.innings).toFixed(2));
  }

  player.career = career;
  await player.save();
};

export const recordBall = async (data) => {
  if (!data?.innings) {
    throw new Error("An innings id is required to record a ball");
  }

  const innings = await Innings.findById(data.innings);
  if (!innings) {
    throw new Error("Innings not found");
  }

  const ball = await Ball.create(data);

  innings.totalRuns += Number(data.runs || 0) + Number(data.extraRuns || 0);

  if (data.wicket) {
    innings.wickets += 1;
  }

  const isExtra = data.extraType === "Wide" || data.extraType === "No Ball";
  if (!isExtra) {
    innings.balls += 1;
  }

  innings.overs = Number((innings.balls / 6).toFixed(1));
  await innings.save();

  const scoringRuns = Number(data.runs || 0) + Number(data.extraRuns || 0);

  if (data.batsman) {
    await updatePlayerStats(data.batsman, {
      runsDelta: scoringRuns,
      inningsDelta: 1,
      highestScoreDelta: scoringRuns,
    });
  }

  if (data.nonStriker) {
    await updatePlayerStats(data.nonStriker, {
      runsDelta: Number(data.runs || 0),
      inningsDelta: 1,
      highestScoreDelta: Number(data.runs || 0),
    });
  }

  if (data.bowler) {
    await updatePlayerStats(data.bowler, {
      wicketsDelta: data.wicket ? 1 : 0,
      runsDelta: scoringRuns,
    });
  }

  return ball;
};
