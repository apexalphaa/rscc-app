export default function DashboardHeader() {
  return (
    <header className="bg-white border-b h-20 flex items-center justify-between px-8">

      <div>

        <h2 className="text-2xl font-bold">

          Academy Portal

        </h2>

        <p className="text-slate-500">

          Rising Star Cricket Club

        </p>

      </div>

      <div className="flex items-center gap-4">

        <button className="w-10 h-10 rounded-full bg-slate-100">

          🔔

        </button>

        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">

          A

        </div>

      </div>

    </header>
  );
}
