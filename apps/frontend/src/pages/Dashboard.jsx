import DashboardLayout from "../layouts/DashboardLayout";

import DashboardWelcome from "../components/DashboardWelcome";
import DashboardSummary from "../components/DashboardSummary";
import QuickActions from "../components/QuickActions";
import AnnouncementBanner from "../components/AnnouncementBanner";
import DashboardPanels from "../components/DashboardPanels";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <DashboardWelcome />

        <AnnouncementBanner />

        <DashboardSummary />

        <QuickActions />

        <DashboardPanels />

      </div>

    </DashboardLayout>
  );
}
