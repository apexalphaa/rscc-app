import { Link, useLocation } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Players", path: "/players" },
  { name: "Attendance", path: "/attendance" },
  { name: "Matches", path: "/matches" },
  { name: "Tournaments", path: "/tournaments" },
  { name: "Fees", path: "/fees" },
  { name: "Equipment", path: "/equipment" },
  { name: "Notice Board", path: "/notice-board" },
  { name: "Calendar", path: "/calendar" },
  { name: "Statistics", path: "/statistics" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white">

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
            className={`block px-8 py-4 transition ${
              location.pathname === item.path
                ? "bg-green-600 font-semibold"
                : "hover:bg-slate-800"
            }`}
          >

            {item.name}

          </Link>

        ))}

      </nav>

    </aside>
  );
}
