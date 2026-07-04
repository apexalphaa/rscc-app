import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">

        <Topbar />

        <main className="flex-1 p-8 overflow-y-auto">

          <Breadcrumb />

          {children}

        </main>

      </div>

    </div>
  );
}
