import DashboardLayout from "../layouts/DashboardLayout";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";

export default function Statistics() {
  return (
    <DashboardLayout>

      <PageHeader
        title="Statistics"
        subtitle="View academy performance."
      />

      <div className="mt-8">

        <EmptyState
          title="No Statistics Yet"
          description="Statistics will appear automatically after matches are played."
        />

      </div>

    </DashboardLayout>
  );
}
