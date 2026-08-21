import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

import players from "../data/players";

import PlayerProfileCard from "../components/PlayerProfileCard";
import PlayerStatsCard from "../components/PlayerStatsCard";
import PlayerPerformanceCard from "../components/PlayerPerformanceCard";
import RecentMatchesCard from "../components/RecentMatchesCard";

export default function PlayerDetails() {

  const { id } = useParams();

  const player = players.find(
    p => p.id === Number(id)
  );

  if (!player) {

    return (

      <DashboardLayout>

        <PageHeader
          title="Player"
          subtitle="Player not found"
        />

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <PageHeader
        title={player.name}
        subtitle="Player Profile"
      />

      <div className="mt-8">

        <PlayerProfileCard
          player={player}
        />

      </div>

      <div className="mt-8">

        <PlayerStatsCard/>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <PlayerPerformanceCard/>

        <RecentMatchesCard/>

      </div>

    </DashboardLayout>

  );

}
