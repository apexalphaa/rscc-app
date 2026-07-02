export default function AttendanceProgress({
  attendance,
  totalPlayers,
}) {

  const marked = Object.keys(attendance).length;

  const percent =
    totalPlayers === 0
      ? 0
      : Math.round((marked / totalPlayers) * 100);

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <div className="flex justify-between mb-3">

        <span className="font-semibold">

          Attendance Progress

        </span>

        <span>

          {percent}%

        </span>

      </div>

      <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

        <div
          className="h-full bg-green-600 transition-all"
          style={{ width: `${percent}%` }}
        />

      </div>

    </div>

  );

}
