import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

     <div className="flex-1 bg-slate-100 min-h-screen">

  <Topbar />

  <main className="p-8">

    {children}

  </main>

</div>

    </div>
  );
}
