import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";
import Button from "../components/common/Button";

import TournamentHeaderCard from "../components/TournamentHeaderCard";
import TournamentActions from "../components/TournamentActions";
import TournamentStats from "../components/TournamentStats";
import TournamentGrid from "../components/TournamentGrid";
import PointsTable from "../components/PointsTable";
import FixturesCard from "../components/FixturesCard";
import BracketCard from "../components/BracketCard";
import TournamentAwards from "../components/TournamentAwards";

export default function Tournament() {

  return (

    <DashboardLayout>

      <PageHeader
        title="Tournament"
        subtitle="Manage academy tournaments"
      />

      <div className="flex justify-end mt-6">

        <Button>

          Create Tournament

        </Button>

      </div>

      <div className="mt-8">

        <TournamentHeaderCard/>

      </div>

      <div className="mt-8">

        <TournamentActions/>

      </div>

      <div className="mt-8">

        <TournamentStats/>

      </div>

      <div className="mt-8">

        <TournamentGrid/>

      </div>

      <div className="mt-8">

        <PointsTable/>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <FixturesCard/>

        <BracketCard/>

      </div>

      <div className="mt-8">

        <TournamentAwards/>

      </div>

    </DashboardLayout>

  );

}
