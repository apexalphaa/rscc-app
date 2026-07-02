import DashboardLayout from "../layouts/DashboardLayout";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import Button from "../components/common/Button";

export default function Tournament() {
  return (
    <DashboardLayout>

      <PageHeader
        title="Tournament"
        subtitle="Organize tournaments and fixtures."
        action={<Button>New Tournament</Button>}
      />

      <div className="mt-8">

        <EmptyState
          title="No Tournament Found"
          description="Create your first tournament."
          button={<Button>Create Tournament</Button>}
        />

      </div>

    </DashboardLayout>
  );
}
