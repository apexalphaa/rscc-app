import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";
import PlayersToolbar from "../components/PlayersToolbar";
import PlayersEmptyState from "../components/PlayersEmptyState";

export default function Players() {

  const [showModal, setShowModal] = useState(false);

  return (
    <DashboardLayout>

      <PageHeader
        title="Player Management"
        subtitle="Manage academy players, registrations and profiles."
      />

      <div className="mt-8">

        <PlayersToolbar
          onAdd={() => setShowModal(true)}
        />

      </div>

      <div className="mt-8">

        <PlayersEmptyState
          onAdd={() => setShowModal(true)}
        />

      </div>

    </DashboardLayout>
  );
}
