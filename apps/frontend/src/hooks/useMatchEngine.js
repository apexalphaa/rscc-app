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
  const [events, setEvents] = useState([]);

  function dispatchBall(event) {
    setEvents((prev) => [...prev, event]);
  }

  function undoBall() {
    setEvents((prev) => prev.slice(0, -1));
  }

  function resetMatch() {
    setEvents([]);
  }

  function buildMatch(events) {
    const match = structuredClone(initialMatch);

    events.forEach((event) => {
      match.timeline.push(event);

      switch (event.type) {
        case "RUN": {
          match.innings.score += event.runs;
          match.innings.legalBalls++;

          match.currentOver.push(String(event.runs));

          match.batters.striker.runs += event.runs;
          match.batters.striker.balls++;

          match.partnership.runs += event.runs;
          match.partnership.balls++;

          match.bowler.runs += event.runs;
          match.bowler.balls++;

          if (event.runs % 2 === 1) {
            [match.batters.striker, match.batters.nonStriker] = [
              match.batters.nonStriker,
              match.batters.striker,
            ];
          }

          break;
        }

        case "DOT": {
          match.innings.legalBalls++;

          match.currentOver.push(".");

          match.batters.striker.balls++;

          match.partnership.balls++;

          match.bowler.balls++;

          break;
        }

        case "WICKET": {
          match.innings.wickets++;

          match.innings.legalBalls++;

          match.currentOver.push("W");

          match.batters.striker.balls++;

          match.partnership.balls++;

          match.bowler.balls++;

          match.bowler.wickets++;

          match.batters.striker = {
            name: `Batter ${match.innings.wickets + 2}`,
            runs: 0,
            balls: 0,
          };

          match.partnership = {
            runs: 0,
            balls: 0,
          };

          break;
        }

        case "WIDE": {
          match.innings.score++;

          match.extras.wide++;

          match.currentOver.push("WD");

          match.bowler.runs++;

          break;
        }

        case "NOBALL": {
          match.innings.score++;

          match.extras.noBall++;

          match.currentOver.push("NB");

          match.bowler.runs++;

          break;
        }

        case "BYE": {
          match.innings.score += event.runs;

          match.extras.bye += event.runs;

          match.innings.legalBalls++;

          match.currentOver.push(`B${event.runs}`);

          match.partnership.balls++;

          match.bowler.balls++;

          break;
        }

        case "LEGBYE": {
          match.innings.score += event.runs;

          match.extras.legBye += event.runs;

          match.innings.legalBalls++;

          match.currentOver.push(`LB${event.runs}`);

          match.partnership.balls++;

          match.bowler.balls++;

          break;
        }

        default:
          break;
      }

      if (match.currentOver.length > 6) {
        match.currentOver.shift();
      }

      if (
        match.innings.legalBalls > 0 &&
        match.innings.legalBalls % 6 === 0
      ) {
        [match.batters.striker, match.batters.nonStriker] = [
          match.batters.nonStriker,
          match.batters.striker,
        ];

        match.currentOver = [];
      }

      match.bowler.overs = Math.floor(
        match.innings.legalBalls / 6
      );

      match.bowler.balls =
        match.innings.legalBalls % 6;
    });

    return match;
  }

  const match = buildMatch(events);

  return {
    match,
    dispatchBall,
    undoBall,
    resetMatch,
  };
}
