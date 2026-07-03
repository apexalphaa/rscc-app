import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";
import MatchDetailsCard from "../components/MatchDetailsCard";
import TossCard from "../components/TossCard";
import PlayingXISetup from "../components/PlayingXISetup";
import OpeningPlayersCard from "../components/OpeningPlayersCard";
import ScoreBoard from "../components/ScoreBoard";
import RunButtons from "../components/RunButtons";
import ExtraButtons from "../components/ExtraButtons";
import CurrentOver from "../components/CurrentOver";

import BattersCard from "../components/BattersCard";
import BowlerCard from "../components/BowlerCard";
import PartnershipCard from "../components/PartnershipCard";

import useMatchEngine from "../hooks/useMatchEngine";
import ExtrasCard from "../components/ExtrasCard";
import RunRateCard from "../components/RunRateCard";
import TimelineCard from "../components/TimelineCard";
import BattingScorecard from "../components/BattingScorecard";
import BowlingScorecard from "../components/BowlingScorecard";
import MatchSummary from "../components/MatchSummary";
import OverHistory from "../components/OverHistory";
import MatchSetup from "../components/MatchSetup";

export default function Matches() {

  const {
    match,
    dispatchBall,
    undoBall,
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
<div className="space-y-8 mt-8">

    <MatchDetailsCard/>

    <TossCard/>

    <PlayingXISetup/>

    <OpeningPlayersCard/>

</div>
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
      <div className="mt-8">

  <MatchSummary
    match={match}
  />

</div>
<div className="mt-8">

    <MatchSetup/>

</div>
<div className="grid lg:grid-cols-2 gap-8 mt-8">

  <BattingScorecard
    match={match}
  />

  <BowlingScorecard
    match={match}
  />

</div>

<div className="mt-8">

  <OverHistory
    match={match}
  />

</div>
<div className="grid lg:grid-cols-3 gap-8 mt-8">

    <ExtrasCard
        match={match}
    />

    <RunRateCard
        match={match}
    />

    <TimelineCard
        match={match}
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

      <div className="flex gap-4 justify-end mt-10">
<button

    onClick={undoBall}

    className="px-6 py-3 rounded-xl bg-slate-700 text-white"

>

    Undo Last Ball

</button>
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
