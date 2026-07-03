import pointsTable from "../data/pointsTable";

export default function PointsTable() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Points Table

      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">Team</th>
            <th>P</th>
            <th>W</th>
            <th>L</th>
            <th>Pts</th>
            <th>NRR</th>

          </tr>

        </thead>

        <tbody>

          {pointsTable.map(team => (

            <tr
              key={team.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="py-3">

                {team.team}

              </td>

              <td className="text-center">

                {team.played}

              </td>

              <td className="text-center">

                {team.won}

              </td>

              <td className="text-center">

                {team.lost}

              </td>

              <td className="text-center font-semibold">

                {team.points}

              </td>

              <td className="text-center">

                {team.nrr}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
