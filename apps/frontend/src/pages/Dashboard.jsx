export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="flex">

        <aside className="w-72 bg-slate-900 text-white min-h-screen p-8">

          <h1 className="text-3xl font-bold">
            RSCC
          </h1>

          <ul className="space-y-5 mt-12">

            <li>🏠 Dashboard</li>

            <li>👤 Players</li>

            <li>🏏 Matches</li>

            <li>📅 Attendance</li>

            <li>🏆 Tournament</li>

            <li>⚙ Settings</li>

          </ul>

        </aside>

        <main className="flex-1 p-12">

          <h2 className="text-4xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="text-slate-500 mt-4">
            Rising Star Cricket Club Dashboard
          </p>

        </main>

      </div>

    </div>
  );
}
