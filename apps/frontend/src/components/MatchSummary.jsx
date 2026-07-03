export default function MatchSummary({ match }) {

  const overs =
    `${match.bowler.overs}.${match.bowler.balls}`;

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Match Summary

      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <div>

          <p className="text-slate-500">

            Score

          </p>

          <h3 className="text-3xl font-bold">

            {match.innings.score}/{match.innings.wickets}

          </h3>

        </div>

        <div>

          <p className="text-slate-500">

            Overs

          </p>

          <h3 className="text-3xl font-bold">

            {overs}

          </h3>

        </div>

        <div>

          <p className="text-slate-500">

            Extras

          </p>

          <h3 className="text-3xl font-bold">

            {
              match.extras.wide +
              match.extras.noBall +
              match.extras.bye +
              match.extras.legBye
            }

          </h3>

        </div>

        <div>

          <p className="text-slate-500">

            Partnership

          </p>

          <h3 className="text-3xl font-bold">

            {match.partnership.runs}

          </h3>

        </div>

      </div>

    </div>

  );

}
