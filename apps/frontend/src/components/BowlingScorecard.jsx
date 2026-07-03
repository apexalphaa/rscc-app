export default function BowlingScorecard({ match }) {

  const bowler = match.bowler;

  const economy =
    bowler.overs === 0 && bowler.balls === 0
      ? "0.00"
      : (
          bowler.runs /
          ((bowler.overs * 6 + bowler.balls) / 6)
        ).toFixed(2);

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Bowling Scorecard

      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">

              Bowler

            </th>

            <th>O</th>

            <th>R</th>

            <th>W</th>

            <th>Econ</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td className="py-4">

              {bowler.name}

            </td>

            <td className="text-center">

              {bowler.overs}.{bowler.balls}

            </td>

            <td className="text-center">

              {bowler.runs}

            </td>

            <td className="text-center">

              {bowler.wickets}

            </td>

            <td className="text-center">

              {economy}

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  );

}
