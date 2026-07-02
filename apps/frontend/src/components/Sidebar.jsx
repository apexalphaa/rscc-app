import { Link } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Players", path: "/players" },
  { name: "Attendance", path: "/attendance" },
  { name: "Matches", path: "/matches" },
  { name: "Tournament", path: "/tournament" },
  { name: "Statistics", path: "/statistics" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white">

      <div className="p-8">

        <h1 className="text-3xl font-black text-green-500">
          RSCC
        </h1>

        <p className="text-slate-400 mt-2">
          Academy Portal
        </p>

      </div>

      <nav className="mt-8">

        {menu.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            className="block px-8 py-4 hover:bg-slate-800 transition"
          >
            {item.name}
          </Link>

        ))}

      </nav>

    </aside>
  );
}
