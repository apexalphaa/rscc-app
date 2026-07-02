import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

import ScoreBoard from "../components/ScoreBoard";
import RunButtons from "../components/RunButtons";
import ExtraButtons from "../components/ExtraButtons";
import CurrentOver from "../components/CurrentOver";

import useMatchScoring from "../hooks/useMatchScoring";

export default function Matches() {

  const {

    match,

    addRuns,

    wicket,

    wide,

    noBall,

  } = useMatchScoring();

  return (

    <DashboardLayout>

      <PageHeader
        title="Live Match"
        subtitle="Professional scoring system"
      />

      <div className="mt-8">

        <ScoreBoard
          match={match}
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <RunButtons
          addRun={addRuns}
        />

        <ExtraButtons
          wicket={wicket}
          wide={wide}
          noBall={noBall}
        />

      </div>

      <div className="mt-8">

        <CurrentOver
          balls={match.currentOver}
        />

      </div>

    </DashboardLayout>

  );

}
