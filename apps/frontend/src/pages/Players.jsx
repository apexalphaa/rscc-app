import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import PlayerForm from "../components/PlayerForm";
import Button from "../components/common/Button";

export default function Players() {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout>

      <PageHeader
        title="Players"
        subtitle="Manage all academy players."
        action={
          <Button onClick={() => setOpen(true)}>
            Add Player
          </Button>
        }
      />

      <div className="mt-8 mb-8">
        <SearchBar placeholder="Search players..." />
      </div>

      <EmptyState
        title="No Players Found"
        description="Register your first academy player."
        button={
          <Button onClick={() => setOpen(true)}>
            Add First Player
          </Button>
        }
      />

      <Modal
        open={open}
        title="Register Player"
        onClose={() => setOpen(false)}
      >
        <PlayerForm
          onCancel={() => setOpen(false)}
        />
      </Modal>

    </DashboardLayout>
  );
}
