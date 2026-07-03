import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";
import Button from "../components/common/Button";

import TournamentStats from "../components/TournamentStats";
import TournamentGrid from "../components/TournamentGrid";
import PointsTable from "../components/PointsTable";
import FixturesCard from "../components/FixturesCard";
import BracketCard from "../components/BracketCard";

export default function Tournaments() {

  return (

    <DashboardLayout>

      <PageHeader
        title="Tournaments"
        subtitle="Manage academy tournaments"
      />

      <div className="flex justify-end mt-6">

        <Button>

          Create Tournament

        </Button>

      </div>

      <div className="mt-8">

        <TournamentStats />

      </div>

      <div className="mt-8">

        <TournamentGrid />

      </div>

      <div className="mt-8">

        <PointsTable />

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <FixturesCard />

        <BracketCard />

      </div>

    </DashboardLayout>

  );

}
