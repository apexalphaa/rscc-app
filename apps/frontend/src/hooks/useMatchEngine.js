import { useState } from "react";
import {
  createInitialMatchState,
  applyBallEvent,
  getCurrentRunRate,
  getRequiredRunRate,
} from "../utils/scoringEngine";

export default function useMatchEngine() {
  const [match, setMatch] = useState(createInitialMatchState);
  const [innings, setInnings] = useState(1);
  const [target, setTarget] = useState(0);

  function setPlayingXI(player, checked) {
    setMatch((prev) => {
      if (checked) {
        if (prev.playingXI.includes(player)) return prev;
        return {
          ...prev,
          playingXI: [...prev.playingXI, player],
        };
      }

      return {
        ...prev,
        playingXI: prev.playingXI.filter((p) => p !== player),
      };
    });
  }

  function setStriker(name) {
    setMatch((prev) => ({
      ...prev,
      batters: {
        ...prev.batters,
        striker: {
          ...prev.batters.striker,
          name,
        },
      },
    }));
  }

  function setNonStriker(name) {
    setMatch((prev) => ({
      ...prev,
      batters: {
        ...prev.batters,
        nonStriker: {
          ...prev.batters.nonStriker,
          name,
        },
      },
    }));
  }

  function setBowler(name) {
    setMatch((prev) => ({
      ...prev,
      bowler: {
        ...prev.bowler,
        name,
      },
    }));
  }

  function dispatchBall(event) {
    setMatch((prev) => applyBallEvent(prev, event));
  }

  function undoBall() {
    setMatch((prev) => {
      if (prev.timeline.length === 0) return prev;

      const next = { ...prev };
      next.timeline = prev.timeline.slice(0, -1);
      return next;
    });
  }

  function finishFirstInnings() {
    setTarget(match.score + 1);
    setInnings(2);
    setMatch((prev) => ({ ...prev, status: "Innings 1 Complete" }));
  }

  function finishMatch() {
    setMatch((prev) => ({ ...prev, status: "Completed" }));
  }

  function currentRunRate() {
    return getCurrentRunRate(match);
  }

  function requiredRunRate() {
    return getRequiredRunRate(match, innings, target);
  }

  function resetMatch() {
    setMatch(createInitialMatchState());
    setInnings(1);
    setTarget(0);
  }

  return {
    match,
    dispatchBall,
    undoBall,
    resetMatch,
    setPlayingXI,
    setStriker,
    setNonStriker,
    setBowler,
    innings,
    target,
    setInnings,
    finishFirstInnings,
    finishMatch,
    currentRunRate,
    requiredRunRate,
  };
}
