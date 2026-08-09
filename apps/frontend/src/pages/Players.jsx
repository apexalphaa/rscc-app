import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";
import PlayersToolbar from "../components/PlayersToolbar";
import AcademyOverview from "../components/AcademyOverview";
import PlayerSection from "../components/PlayerSection";
import { playersService } from "../services/api";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const response = await playersService.list();
        setPlayers(response.data.players || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load players");
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const name = player.fullName || player.name || "";
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchesBatch = batch === "" || player.batch === batch;
      const matchesRole = role === "" || player.role === role;
      return matchesSearch && matchesBatch && matchesRole;
    });
  }, [players, search, batch, role]);

  return (
    <DashboardLayout>
      <PageHeader title="Players" subtitle="Manage Academy Players" />

      <div className="mt-8">
        <AcademyOverview />
      </div>

      <div className="mt-8">
        <PlayersToolbar search={search} setSearch={setSearch} batch={batch} setBatch={setBatch} role={role} setRole={setRole} />
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="rounded-2xl border bg-white p-6 text-slate-600">Loading players…</div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
        ) : (
          <>
            <PlayerSection title="Senior Team" players={filteredPlayers.filter((p) => p.category === "Senior" || p.role === "Batsman")} />
            <div className="mt-6" />
            <PlayerSection title="Junior Team" players={filteredPlayers.filter((p) => p.category === "Junior" || p.role === "Bowler")} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
