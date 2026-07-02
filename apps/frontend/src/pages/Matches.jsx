import DashboardLayout from "../layouts/DashboardLayout";

import PageHeader from "../components/PageHeader";

import CreateMatchForm from "../components/CreateMatchForm";

import UpcomingMatches from "../components/UpcomingMatches";

import LiveMatchCard from "../components/LiveMatchCard";

export default function Matches(){

    return(

        <DashboardLayout>

            <PageHeader

                title="Match Center"

                subtitle="Create and manage cricket matches."

            />

            <div className="mt-8">

                <LiveMatchCard/>

            </div>

            <div className="mt-8">

                <CreateMatchForm/>

            </div>

            <div className="mt-8">

                <UpcomingMatches/>

            </div>

        </DashboardLayout>

    )

}
