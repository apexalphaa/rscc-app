import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

import ScoreBoard from "../components/ScoreBoard";
import RunButtons from "../components/RunButtons";
import ExtraButtons from "../components/ExtraButtons";
import CurrentOver from "../components/CurrentOver";

import BattersCard from "../components/BattersCard";
import BowlerCard from "../components/BowlerCard";
import PartnershipCard from "../components/PartnershipCard";

import useMatchEngine from "../hooks/useMatchEngine";

export default function Matches() {

  const {
    match,
    dispatchBall,
    resetMatch,
  } = useMatchEngine();

  function run(value) {
    dispatchBall({
      type: "RUN",
      runs: value,
    });
  }

  function dotBall() {
    dispatchBall({
      type: "DOT",
    });
  }

  function wicket() {
    dispatchBall({
      type: "WICKET",
    });
  }

  function wide() {
    dispatchBall({
      type: "WIDE",
    });
  }

  function noBall() {
    dispatchBall({
      type: "NOBALL",
    });
  }

  return (
    <DashboardLayout>

      <PageHeader
        title="Live Match"
        subtitle="Professional Cricket Scoring Engine"
      />

      <div className="mt-8">

        <ScoreBoard
          match={match}
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <RunButtons
          addRun={run}
        />

        <ExtraButtons
          wicket={wicket}
          wide={wide}
          noBall={noBall}
          dotBall={dotBall}
        />

      </div>

      <div className="mt-8">

        <CurrentOver
          balls={match.currentOver}
        />

      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">

        <BattersCard
          match={match}
        />

        <BowlerCard
          match={match}
        />

        <PartnershipCard
          match={match}
        />

      </div>

      <div className="flex justify-end mt-10">

        <button
          onClick={resetMatch}
          className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
        >

          Reset Match

        </button>

      </div>

    </DashboardLayout>
  );

}
