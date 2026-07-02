import { useState } from "react";

const initialMatch = {
  info: {
    teamA: "Team A",
    teamB: "Team B",
    totalOvers: 20,
  },

  innings: {
    score: 0,
    wickets: 0,
    legalBalls: 0,
  },

  batters: {
    striker: {
      name: "Batter 1",
      runs: 0,
      balls: 0,
    },

    nonStriker: {
      name: "Batter 2",
      runs: 0,
      balls: 0,
    },
  },

  bowler: {
    name: "Bowler",
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

  function dispatchBall(event) {
    setMatch((prev) => {
      const next = structuredClone(prev);

      next.timeline.push(event);

      switch (event.type) {
        case "RUN": {
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
        }

        case "DOT": {
          next.innings.legalBalls++;

          next.currentOver.push(".");

          next.batters.striker.balls++;

          next.partnership.balls++;

          next.bowler.balls++;

          break;
        }

        case "WICKET": {
          next.innings.wickets++;

          next.innings.legalBalls++;

          next.currentOver.push("W");

          next.batters.striker.balls++;

          next.partnership.balls++;

          next.bowler.wickets++;

          next.bowler.balls++;

          next.batters.striker = {
            name: "New Batter",
            runs: 0,
            balls: 0,
          };

          next.partnership = {
            runs: 0,
            balls: 0,
          };

          break;
        }

        case "WIDE": {
          next.innings.score++;

          next.extras.wide++;

          next.currentOver.push("WD");

          next.bowler.runs++;

          break;
        }

        case "NOBALL": {
          next.innings.score++;

          next.extras.noBall++;

          next.currentOver.push("NB");

          next.bowler.runs++;

          break;
        }

        case "BYE": {
          next.innings.score += event.runs;

          next.extras.bye += event.runs;

          next.innings.legalBalls++;

          next.currentOver.push(`B${event.runs}`);

          next.partnership.balls++;

          next.bowler.balls++;

          break;
        }

        case "LEGBYE": {
          next.innings.score += event.runs;

          next.extras.legBye += event.runs;

          next.innings.legalBalls++;

          next.currentOver.push(`LB${event.runs}`);

          next.partnership.balls++;

          next.bowler.balls++;

          break;
        }

        default:
          break;
      }

      if (next.currentOver.length > 6) {
        next.currentOver.shift();
      }

      const completedOvers = Math.floor(next.innings.legalBalls / 6);

      next.bowler.overs = completedOvers;
      next.bowler.balls = next.innings.legalBalls % 6;

      if (
        next.innings.legalBalls > 0 &&
        next.innings.legalBalls % 6 === 0
      ) {
        const temp = next.batters.striker;
        next.batters.striker = next.batters.nonStriker;
        next.batters.nonStriker = temp;

        next.currentOver = [];
      }

      return next;
    });
  }

  function resetMatch() {
    setMatch(structuredClone(initialMatch));
  }

  return {
    match,

    dispatchBall,

    resetMatch,
  };
}
