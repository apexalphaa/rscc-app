export default function AttendanceSessionInfo() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-xl font-bold mb-6">
        Current Session
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <div>
          <p className="text-slate-500 text-sm">Batch</p>
          <h3 className="font-semibold">Under 16</h3>
        </div>

        <div>
          <p className="text-slate-500 text-sm">Coach</p>
          <h3 className="font-semibold">Not Assigned</h3>
        </div>

        <div>
          <p className="text-slate-500 text-sm">Ground</p>
          <h3 className="font-semibold">Main Ground</h3>
        </div>

        <div>
          <p className="text-slate-500 text-sm">Date</p>
          <h3 className="font-semibold">Today</h3>
        </div>

      </div>

    </div>
  );
}
