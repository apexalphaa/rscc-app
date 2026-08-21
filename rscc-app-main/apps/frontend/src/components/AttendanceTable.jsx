import AttendanceRow from "./AttendanceRow";

export default function AttendanceTable({
  players,
  attendance,
  setAttendance,
}) {
  function updateStatus(id, value) {
    setAttendance((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left px-6 py-4">

              Player

            </th>

            <th className="text-left px-6 py-4">

              Batch

            </th>

            <th className="text-left px-6 py-4">

              Attendance

            </th>

          </tr>

        </thead>

        <tbody>

          {players.map((player) => (

            <AttendanceRow
              key={player.id}
              player={player}
              status={attendance[player.id]}
              onChange={(value) =>
                updateStatus(player.id, value)
              }
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}
