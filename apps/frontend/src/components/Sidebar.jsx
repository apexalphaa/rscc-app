import { Link } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: "🏠", path: "/dashboard" },
  { name: "Players", icon: "👤", path: "/players" },
  { name: "Attendance", icon: "📅", path: "/attendance" },
  { name: "Matches", icon: "🏏", path: "/matches" },
  { name: "Tournament", icon: "🏆", path: "/tournament" },
  { name: "Settings", icon: "⚙️", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-500">RSCC</h1>
      <p className="text-sm text-slate-400 mt-1">
        Rising Star Cricket Club
      </p>

      <nav className="mt-10">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition mb-2"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
