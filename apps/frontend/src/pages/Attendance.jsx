import DashboardLayout from "../layouts/DashboardLayout";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import Button from "../components/common/Button";

export default function Attendance() {
  return (
    <DashboardLayout>

      <PageHeader
        title="Attendance"
        subtitle="Track daily attendance."
        action={<Button>Create Session</Button>}
      />

      <div className="mt-8">

        <EmptyState
          title="No Attendance Sessions"
          description="Create your first attendance session to start tracking players."
          button={<Button>Create Session</Button>}
        />

      </div>

    </DashboardLayout>
  );
}
