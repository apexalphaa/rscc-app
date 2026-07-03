export default function BattingScorecard({ match }) {

  const batters = [
    match.batters.striker,
    match.batters.nonStriker,
  ];

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Batting Scorecard

      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">Batter</th>

            <th>R</th>

            <th>B</th>

            <th>SR</th>

          </tr>

        </thead>

        <tbody>

          {batters.map((player) => {

            const strikeRate =
              player.balls === 0
                ? "0.00"
                : ((player.runs / player.balls) * 100).toFixed(2);

            return (

              <tr
                key={player.name}
                className="border-b"
              >

                <td className="py-4">

                  {player.name}

                </td>

                <td className="text-center">

                  {player.runs}

                </td>

                <td className="text-center">

                  {player.balls}

                </td>

                <td className="text-center">

                  {strikeRate}

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  );

}
