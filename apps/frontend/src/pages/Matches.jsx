import DashboardLayout from "../layouts/DashboardLayout";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import Button from "../components/common/Button";

export default function Matches() {
  return (
    <DashboardLayout>

      <PageHeader
        title="Match Center"
        subtitle="Manage live and completed matches."
        action={<Button>New Match</Button>}
      />

      <div className="mt-8">

        <EmptyState
          title="No Matches Available"
          description="Create a match to begin scoring."
          button={<Button>Create Match</Button>}
        />

      </div>

    </DashboardLayout>
  );
}
