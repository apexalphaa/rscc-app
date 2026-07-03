import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";
import CoachGrid from "../components/CoachGrid";

export default function Coaches() {

  return (

    <DashboardLayout>

      <PageHeader
        title="Coaches"
        subtitle="Academy Coaching Staff"
      />

      <div className="mt-8">

        <CoachGrid />

      </div>

    </DashboardLayout>

  );

}
