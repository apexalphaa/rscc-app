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
import WicketCard from "../components/WicketCard";
import NewBatterCard from "../components/NewBatterCard";
import ChangeBowlerCard from "../components/ChangeBowlerCard";
import MatchStatusCard from "../components/MatchStatusCard";
import InningsCard from "../components/InningsCard";
import TargetCard from "../components/TargetCard";
import RunRateCardAdvanced from "../components/RunRateCardAdvanced";
import MatchResultCard from "../components/MatchResultCard";

import BattersCard from "../components/BattersCard";
import BowlerCard from "../components/BowlerCard";
import PartnershipCard from "../components/PartnershipCard";

import DotBallButton from "../components/DotBallButton";
import ByeButtons from "../components/ByeButtons";
import LegByeButtons from "../components/LegByeButtons";
import ExtraRuns from "../components/ExtraRuns";

import CommentaryCard from "../components/CommentaryCard";
import FallOfWickets from "../components/FallOfWickets";
import WormGraphCard from "../components/WormGraphCard";
import ManhattanGraphCard from "../components/ManhattanGraphCard";
import WagonWheelCard from "../components/WagonWheelCard";

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

innings,

target,

finishFirstInnings,

currentRunRate,

requiredRunRate,

}=useMatchEngine();
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
      <div className="flex justify-end mt-8">

<button
className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition"
>

Start Match

</button>

</div>
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

    <DotBallButton
        onDot={() =>
            dispatchBall({ type: "DOT" })
        }
    />

    <ExtraRuns
        onWide={() =>
            dispatchBall({ type: "WIDE" })
        }
        onNoBall={() =>
            dispatchBall({ type: "NOBALL" })
        }
    />

</div>

<div className="grid lg:grid-cols-2 gap-8 mt-8">

    <ByeButtons
        onBye={(runs)=>
            dispatchBall({
                type:"BYE",
                runs,
            })
        }
    />

    <LegByeButtons
        onLegBye={(runs)=>
            dispatchBall({
                type:"LEGBYE",
                runs,
            })
        }
    />

</div>
      <div className="grid lg:grid-cols-2 gap-8 mt-8">

  <WicketCard
    onWicket={(type)=>
      dispatchBall({
        type:"WICKET",
        wicketType:type,
      })
    }
  />

  <NewBatterCard
    players={match.playingXI}
    onSelect={setStriker}
  />

</div>

<div className="grid lg:grid-cols-2 gap-8 mt-8">

  <ChangeBowlerCard
    bowlers={match.playingXI}
    onChange={setBowler}
  />

  <MatchStatusCard
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
<div className="grid lg:grid-cols-2 gap-8 mt-8">

    <CommentaryCard />

    <FallOfWickets />

</div>

<div className="grid lg:grid-cols-2 gap-8 mt-8">

    <WormGraphCard />

    <ManhattanGraphCard />

</div>

<div className="mt-8">

    <WagonWheelCard />

</div>
      <div className="grid lg:grid-cols-2 gap-8 mt-8">

    <InningsCard

        innings={innings}

    />

    <TargetCard

        target={target}

    />

</div>

<div className="grid lg:grid-cols-2 gap-8 mt-8">

    <RunRateCardAdvanced

        current={currentRunRate()}

        required={requiredRunRate()}

    />

    <MatchResultCard

        result="Match In Progress"

    />

</div>

<div className="flex justify-end mt-8">

    <button

        onClick={finishFirstInnings}

        className="bg-green-600 text-white px-8 py-3 rounded-xl"

    >

        End First Innings

    </button>

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
