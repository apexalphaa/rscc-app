import { useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

import PlayersToolbar from "../components/PlayersToolbar";
import PlayersGrid from "../components/PlayersGrid";

import PlayerProfileCard from "../components/PlayerProfileCard";
import PlayerStatsCard from "../components/PlayerStatsCard";
import PlayerPerformanceCard from "../components/PlayerPerformanceCard";
import RecentMatchesCard from "../components/RecentMatchesCard";

import playersData from "../data/players";

export default function Players() {

  const [search,setSearch]=useState("");

  const [batch,setBatch]=useState("");

  const [role,setRole]=useState("");

  const filteredPlayers=useMemo(()=>{

    return playersData.filter(player=>{

      const matchesSearch=player.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesBatch=
        batch==="" || player.batch===batch;

      const matchesRole=
        role==="" || player.role===role;

      return matchesSearch && matchesBatch && matchesRole;

    });

  },[search,batch,role]);

  const selectedPlayer=filteredPlayers[0];

  return(

    <DashboardLayout>

      <PageHeader
        title="Players"
        subtitle="Manage Academy Players"
      />

      <div className="mt-8">

        <PlayersToolbar

          search={search}
          setSearch={setSearch}

          batch={batch}
          setBatch={setBatch}

          role={role}
          setRole={setRole}

        />

      </div>

      <div className="mt-8">

        <PlayersGrid
          players={filteredPlayers}
        />

      </div>

      {selectedPlayer && (

        <>

          <div className="mt-10">

            <PlayerProfileCard
              player={selectedPlayer}
            />

          </div>

          <div className="mt-8">

            <PlayerStatsCard/>

          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">

            <PlayerPerformanceCard/>

            <RecentMatchesCard/>

          </div>

        </>

      )}

    </DashboardLayout>

  );

}
