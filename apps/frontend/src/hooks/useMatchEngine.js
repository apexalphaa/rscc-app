import { useState } from "react";

const initialMatch = {
  info: {
    teamA: "Team A",
    teamB: "Team B",
    totalOvers: 20,
  },

  playingXI: [],

  innings: {
    score: 0,
    wickets: 0,
    legalBalls: 0,
  },

  batters: {
    striker: {
      name: "",
      runs: 0,
      balls: 0,
    },

    nonStriker: {
      name: "",
      runs: 0,
      balls: 0,
    },
  },

  bowler: {
    name: "",
    overs: 0,
    balls: 0,
    runs: 0,
    wickets: 0,
  },

  extras: {
    wide: 0,
    noBall: 0,
    bye: 0,
    legBye: 0,
  },

  partnership: {
    runs: 0,
    balls: 0,
  },

  currentOver: [],

  timeline: [],
};

export default function useMatchEngine() {

  const [match, setMatch] = useState(initialMatch);

  const [innings, setInnings] = useState(1);

  const [target, setTarget] = useState(0);

  function setPlayingXI(player, checked) {

    setMatch(prev => {

      if (checked) {

        if (prev.playingXI.includes(player))
          return prev;

        return {
          ...prev,
          playingXI: [...prev.playingXI, player],
        };

      }

      return {
        ...prev,
        playingXI: prev.playingXI.filter(
          p => p !== player
        ),
      };

    });

  }

  function setStriker(name) {

    setMatch(prev => ({
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

    setMatch(prev => ({
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

    setMatch(prev => ({
      ...prev,

      bowler: {

        ...prev.bowler,

        name,

      },

    }));

  }

  function dispatchBall(event) {

    setMatch(prev => {

      const next = structuredClone(prev);

      next.timeline.push(event);

      switch (event.type) {

        case "RUN":

          next.innings.score += event.runs;
          next.innings.legalBalls++;
          next.currentOver.push(String(event.runs));

          next.batters.striker.runs += event.runs;
          next.batters.striker.balls++;

          next.partnership.runs += event.runs;
          next.partnership.balls++;

          next.bowler.runs += event.runs;
          next.bowler.balls++;

          if (event.runs % 2 === 1) {

            const temp = next.batters.striker;
            next.batters.striker = next.batters.nonStriker;
            next.batters.nonStriker = temp;

          }

          break;

        case "DOT":

          next.innings.legalBalls++;
          next.currentOver.push(".");

          next.batters.striker.balls++;
          next.partnership.balls++;
          next.bowler.balls++;

          break;

        case "WICKET":

          next.innings.wickets++;
          next.innings.legalBalls++;
          next.currentOver.push("W");

          next.bowler.wickets++;
          next.bowler.balls++;

          next.batters.striker.balls++;

          next.partnership = {
            runs: 0,
            balls: 0,
          };

          next.batters.striker = {
            name: "",
            runs: 0,
            balls: 0,
          };

          break;

        case "WIDE":

          next.innings.score++;
          next.extras.wide++;
          next.currentOver.push("WD");

          next.bowler.runs++;

          break;

        case "NOBALL":

          next.innings.score++;
          next.extras.noBall++;
          next.currentOver.push("NB");

          next.bowler.runs++;

          break;

        case "BYE":

          next.innings.score += event.runs;
          next.extras.bye += event.runs;
          next.innings.legalBalls++;
          next.currentOver.push(`B${event.runs}`);

          break;

        case "LEGBYE":

          next.innings.score += event.runs;
          next.extras.legBye += event.runs;
          next.innings.legalBalls++;
          next.currentOver.push(`LB${event.runs}`);

          break;

        default:

          break;

      }

      if (next.currentOver.length > 6)
        next.currentOver.shift();

      next.bowler.overs = Math.floor(
        next.innings.legalBalls / 6
      );

      next.bowler.balls =
        next.innings.legalBalls % 6;

      if (
        next.innings.legalBalls > 0 &&
        next.innings.legalBalls % 6 === 0
      ) {

        const temp = next.batters.striker;

        next.batters.striker =
          next.batters.nonStriker;

        next.batters.nonStriker = temp;

        next.currentOver = [];

      }

      return next;

    });

  }

  function undoBall() {

    setMatch(prev => {

      if (prev.timeline.length === 0)
        return prev;

      // Full replay engine will be implemented later.

      return prev;

    });

  }

  function finishFirstInnings() {

    setTarget(match.innings.score + 1);

    setInnings(2);

  }

  function finishMatch() {

    // Backend implementation later

  }

  function currentRunRate() {

    if (match.innings.legalBalls === 0)
      return "0.00";

    return (
      match.innings.score /
      (match.innings.legalBalls / 6)
    ).toFixed(2);

  }

  function requiredRunRate() {

    if (innings === 1)
      return "-";

    const runsNeeded =
      target - match.innings.score;

    const ballsLeft =
      match.info.totalOvers * 6 -
      match.innings.legalBalls;

    if (ballsLeft <= 0)
      return "-";

    return (
      runsNeeded /
      (ballsLeft / 6)
    ).toFixed(2);

  }

  function resetMatch() {

    setMatch(initialMatch);

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
