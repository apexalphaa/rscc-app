import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

import PlayersToolbar from "../components/PlayersToolbar";
import PlayersGrid from "../components/PlayersGrid";

import PlayerProfileCard from "../components/PlayerProfileCard";
import PlayerStatsCard from "../components/PlayerStatsCard";
import PlayerPerformanceCard from "../components/PlayerPerformanceCard";
import RecentMatchesCard from "../components/RecentMatchesCard";

import players from "../data/players";

export default function Players(){

    const player=players[0];

    return(

        <DashboardLayout>

            <PageHeader
                title="Players"
                subtitle="Academy Players"
            />

            <div className="mt-8">

                <PlayersToolbar/>

            </div>

            <div className="mt-8">

                <PlayersGrid/>

            </div>

            <div className="mt-10">

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

    )

}
