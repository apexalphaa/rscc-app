export default function BowlerCard({ match }) {

  const { bowler } = match;

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Current Bowler

      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>Name</span>

          <span className="font-semibold">

            {bowler.name}

          </span>

        </div>

        <div className="flex justify-between">

          <span>Overs</span>

          <span>

            {bowler.overs}.{bowler.balls}

          </span>

        </div>

        <div className="flex justify-between">

          <span>Runs</span>

          <span>

            {bowler.runs}

          </span>

        </div>

        <div className="flex justify-between">

          <span>Wickets</span>

          <span>

            {bowler.wickets}

          </span>

        </div>

      </div>

    </div>

  );

}
