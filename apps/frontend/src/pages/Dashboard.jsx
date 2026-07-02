import DashboardLayout from "../layouts/DashboardLayout";

import DashboardWelcome from "../components/DashboardWelcome";
import DashboardSummary from "../components/DashboardSummary";
import QuickActions from "../components/QuickActions";
import DashboardPanels from "../components/DashboardPanels";
import AnnouncementBanner from "../components/AnnouncementBanner";
import WeatherCard from "../components/WeatherCard";
import AttendanceTrend from "../components/AttendanceTrend";
import BirthdaysCard from "../components/BirthdaysCard";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <DashboardWelcome />

        <AnnouncementBanner />

        <DashboardSummary />

        <QuickActions />

        <DashboardPanels />

        <div className="grid xl:grid-cols-3 gap-6">

          <WeatherCard />

          <AttendanceTrend />

          <BirthdaysCard />

        </div>

      </div>

    </DashboardLayout>
  );
}
