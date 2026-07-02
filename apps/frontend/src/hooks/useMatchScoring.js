import { useState } from "react";

export default function useMatchScoring() {

  const [match, setMatch] = useState({
    score: 0,
    wickets: 0,
    legalBalls: 0,

    extras: {
      wide: 0,
      noBall: 0,
      bye: 0,
      legBye: 0,
    },

    currentOver: [],
  });

  function addLegalBall(symbol) {
    setMatch(prev => ({
      ...prev,
      legalBalls: prev.legalBalls + 1,
      currentOver: [...prev.currentOver, symbol].slice(-6),
    }));
  }

  function addRuns(run) {

    setMatch(prev => ({
      ...prev,
      score: prev.score + run,
    }));

    addLegalBall(run.toString());

  }

  function wicket() {

    setMatch(prev => ({
      ...prev,
      wickets: prev.wickets + 1,
    }));

    addLegalBall("W");

  }

  function wide() {

    setMatch(prev => ({
      ...prev,
      score: prev.score + 1,
      extras: {
        ...prev.extras,
        wide: prev.extras.wide + 1,
      },
      currentOver: [...prev.currentOver, "WD"].slice(-6),
    }));

  }

  function noBall() {

    setMatch(prev => ({
      ...prev,
      score: prev.score + 1,
      extras: {
        ...prev.extras,
        noBall: prev.extras.noBall + 1,
      },
      currentOver: [...prev.currentOver, "NB"].slice(-6),
    }));

  }

  function bye(run) {

    setMatch(prev => ({
      ...prev,
      score: prev.score + run,
      extras: {
        ...prev.extras,
        bye: prev.extras.bye + run,
      },
    }));

    addLegalBall(`B${run}`);

  }

  function legBye(run) {

    setMatch(prev => ({
      ...prev,
      score: prev.score + run,
      extras: {
        ...prev.extras,
        legBye: prev.extras.legBye + run,
      },
    }));

    addLegalBall(`LB${run}`);

  }

  function resetMatch() {

    setMatch({
      score: 0,
      wickets: 0,
      legalBalls: 0,
      extras: {
        wide: 0,
        noBall: 0,
        bye: 0,
        legBye: 0,
      },
      currentOver: [],
    });

  }

  return {

    match,

    addRuns,

    wicket,

    wide,

    noBall,

    bye,

    legBye,

    resetMatch,

  };

}
