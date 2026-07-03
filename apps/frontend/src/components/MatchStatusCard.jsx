export default function MatchStatusCard({ match }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Match Status

      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>Batting Team</span>

          <span>{match.info.teamA}</span>

        </div>

        <div className="flex justify-between">

          <span>Bowling Team</span>

          <span>{match.info.teamB}</span>

        </div>

        <div className="flex justify-between">

          <span>Overs</span>

          <span>{match.info.totalOvers}</span>

        </div>

        <div className="flex justify-between">

          <span>Score</span>

          <span>

            {match.innings.score}/{match.innings.wickets}

          </span>

        </div>

      </div>

    </div>

  );

}
