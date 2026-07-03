import DashboardLayout from "../layouts/DashboardLayout";

import PageHeader from "../components/PageHeader";

import PlayersToolbar from "../components/PlayersToolbar";

import PlayersGrid from "../components/PlayersGrid";

export default function Players() {

  return (

    <DashboardLayout>

      <PageHeader
        title="Players"
        subtitle="Manage academy players"
      />

      <div className="mt-8">

        <PlayersToolbar />

      </div>

      <div className="mt-8">

        <PlayersGrid />

      </div>

    </DashboardLayout>

  );

}
