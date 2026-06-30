export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm rounded-2xl p-6 flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold">
         Welcome back, Admin 👋
        </h2>

        <p className="text-slate-500 mt-2">
          Manage players, attendance, matches and academy operations.
        </p>
      </div>

      <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
        A
      </div>
    </header>
  );
}
