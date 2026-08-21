import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardWelcome from "../components/DashboardWelcome";
import DashboardSummary from "../components/DashboardSummary";
import QuickActions from "../components/QuickActions";
import DashboardPanels from "../components/DashboardPanels";
import AnnouncementBanner from "../components/AnnouncementBanner";
import { authService, matchesService, playersService } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ players: 0, matches: 0, user: null, status: "Loading..." });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [userRes, playersRes, matchesRes] = await Promise.all([
          authService.me().catch(() => null),
          playersService.list().catch(() => ({ data: { players: [] } })),
          matchesService.list().catch(() => ({ data: { matches: [] } })),
        ]);

        setStats({
          players: playersRes?.data?.players?.length || 0,
          matches: matchesRes?.data?.matches?.length || 0,
          user: userRes?.data?.user || JSON.parse(localStorage.getItem("user") || "null"),
          status: userRes ? "Connected" : "Offline",
        });
      } catch {
        setStats((prev) => ({ ...prev, status: "Offline" }));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardWelcome />
        <AnnouncementBanner />

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Backend status</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">{loading ? "Loading" : stats.status}</h3>
            </div>
            <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">{stats.user?.name || "Guest"}</div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Players</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.players}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Matches</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.matches}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Mode</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">Live</p>
            </div>
          </div>
        </div>

        <DashboardSummary />
        <QuickActions />
        <DashboardPanels />
      </div>
    </DashboardLayout>
  );
}
