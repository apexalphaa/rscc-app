import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard title="Players" value="0" icon="👤" />

        <StatCard title="Attendance" value="0%" icon="📅" />

        <StatCard title="Matches" value="0" icon="🏏" />

        <StatCard title="Tournaments" value="0" icon="🏆" />

      </div>

    </DashboardLayout>
  );
}
