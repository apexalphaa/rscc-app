import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

import TournamentStats from "../components/TournamentStats";
import TournamentGrid from "../components/TournamentGrid";

import Button from "../components/common/Button";

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

        <TournamentStats/>

      </div>

      <div className="mt-8">

        <TournamentGrid/>

      </div>

    </DashboardLayout>

  );

}
