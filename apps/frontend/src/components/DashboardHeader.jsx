export default function DashboardHeader() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold">
          Rising Star Cricket Club
        </h2>

        <p className="text-slate-500">
          Academy Management System
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">

          A

        </div>

      </div>

    </header>
  );
}
