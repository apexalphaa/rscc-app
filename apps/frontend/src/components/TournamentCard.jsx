export default function TournamentCard({ tournament }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">

      <h2 className="text-2xl font-bold">

        {tournament.name}

      </h2>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">

          <span>Format</span>

          <span>{tournament.format}</span>

        </div>

        <div className="flex justify-between">

          <span>Teams</span>

          <span>{tournament.teams}</span>

        </div>

        <div className="flex justify-between">

          <span>Status</span>

          <span>{tournament.status}</span>

        </div>

        <div className="flex justify-between">

          <span>Starts</span>

          <span>{tournament.startDate}</span>

        </div>

      </div>

    </div>

  );

}
