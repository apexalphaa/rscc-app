import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <DashboardHeader />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          <StatCard
            title="Players"
            value="0"
            icon="👤"
          />

          <StatCard
            title="Attendance"
            value="0%"
            icon="📅"
          />

          <StatCard
            title="Matches"
            value="0"
            icon="🏏"
          />

          <StatCard
            title="Tournaments"
            value="0"
            icon="🏆"
          />

        </div>

      </main>

    </div>
  );
}
