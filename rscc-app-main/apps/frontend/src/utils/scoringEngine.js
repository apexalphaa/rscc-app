export function createInitialMatchState() {
  return {
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
    score: 0,
    wickets: 0,
    legalBalls: 0,
    status: "Ready",
    matchId: "",
  };
}

function cloneState(state) {
  if (typeof structuredClone === "function") {
    return structuredClone(state);
  }

  return JSON.parse(JSON.stringify(state));
}

export function applyBallEvent(state, event) {
  const next = cloneState(state);

  next.timeline.push(event);

  switch (event.type) {
    case "RUN": {
      next.innings.score += event.runs;
      next.innings.legalBalls += 1;
      next.score += event.runs;
      next.legalBalls += 1;
      next.currentOver.push(String(event.runs));

      next.batters.striker.runs += event.runs;
      next.batters.striker.balls += 1;

      next.partnership.runs += event.runs;
      next.partnership.balls += 1;

      next.bowler.runs += event.runs;
      next.bowler.balls += 1;

      if (event.runs % 2 === 1) {
        const temp = next.batters.striker;
        next.batters.striker = next.batters.nonStriker;
        next.batters.nonStriker = temp;
      }

      break;
    }

    case "DOT": {
      next.innings.legalBalls += 1;
      next.legalBalls += 1;
      next.currentOver.push(".");

      next.batters.striker.balls += 1;
      next.partnership.balls += 1;
      next.bowler.balls += 1;

      break;
    }

    case "WICKET": {
      next.innings.wickets += 1;
      next.wickets += 1;
      next.innings.legalBalls += 1;
      next.legalBalls += 1;
      next.currentOver.push("W");

      next.bowler.wickets += 1;
      next.bowler.balls += 1;
      next.batters.striker.balls += 1;

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
    }

    case "WIDE": {
      next.innings.score += 1;
      next.score += 1;
      next.extras.wide += 1;
      next.currentOver.push("WD");
      next.bowler.runs += 1;
      break;
    }

    case "NOBALL": {
      next.innings.score += 1;
      next.score += 1;
      next.extras.noBall += 1;
      next.currentOver.push("NB");
      next.bowler.runs += 1;
      break;
    }

    case "BYE": {
      next.innings.score += event.runs;
      next.score += event.runs;
      next.extras.bye += event.runs;
      next.innings.legalBalls += 1;
      next.legalBalls += 1;
      next.currentOver.push(`B${event.runs}`);
      break;
    }

    case "LEGBYE": {
      next.innings.score += event.runs;
      next.score += event.runs;
      next.extras.legBye += event.runs;
      next.innings.legalBalls += 1;
      next.legalBalls += 1;
      next.currentOver.push(`LB${event.runs}`);
      break;
    }

    default:
      break;
  }

  if (next.currentOver.length > 6) {
    next.currentOver.shift();
  }

  next.bowler.overs = Math.floor(next.legalBalls / 6);
  next.bowler.balls = next.legalBalls % 6;

  if (next.legalBalls > 0 && next.legalBalls % 6 === 0) {
    const temp = next.batters.striker;
    next.batters.striker = next.batters.nonStriker;
    next.batters.nonStriker = temp;
    next.currentOver = [];
  }

  next.innings.legalBalls = next.legalBalls;

  return next;
}

export function formatOvers(legalBalls) {
  const overs = Math.floor(legalBalls / 6);
  const balls = legalBalls % 6;
  return `${overs}.${balls}`;
}

export function getCurrentRunRate(state) {
  if (state.legalBalls === 0) {
    return "0.00";
  }

  return ((state.score / (state.legalBalls / 6)) || 0).toFixed(2);
}

export function getRequiredRunRate(state, inningsNumber, target) {
  if (inningsNumber === 1) {
    return "-";
  }

  const runsNeeded = target - state.score;
  const ballsLeft = state.info.totalOvers * 6 - state.legalBalls;

  if (ballsLeft <= 0) {
    return "-";
  }

  return ((runsNeeded / (ballsLeft / 6)) || 0).toFixed(2);
}
