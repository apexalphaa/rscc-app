import DashboardLayout from "../layouts/DashboardLayout";

import DashboardWelcome from "../components/DashboardWelcome";
import DashboardSummary from "../components/DashboardSummary";
import QuickActions from "../components/QuickActions";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <DashboardWelcome />

        <DashboardSummary />

        <QuickActions />

      </div>

    </DashboardLayout>
  );
}
