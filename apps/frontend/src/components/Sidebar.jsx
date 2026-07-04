import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import navigation from "../data/navigation";

export default function Sidebar() {

  const location = useLocation();

  return (

    <aside className="w-72 bg-slate-900 text-white min-h-screen flex flex-col shadow-2xl">

      <Link
        to="/"
        className="p-8 border-b border-slate-700 block hover:bg-slate-800 transition"
      >

        <h1 className="text-3xl font-black text-green-500">

          RSCC

        </h1>

        <p className="text-slate-400 mt-1">

          Academy Portal

        </p>

      </Link>

      <nav className="flex-1 p-4 space-y-2">

        {navigation.map((item) => {

          const Icon = item.icon;

          return (

            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition font-medium

              ${
                location.pathname === item.path

                  ? "bg-green-600 text-white shadow-lg"

                  : "hover:bg-slate-800 text-slate-200"
              }`}
            >

              <Icon size={20} />

              {item.title}

            </Link>

          );

        })}

      </nav>

      <div className="p-4 border-t border-slate-700">

        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-800 transition text-slate-300"
        >

          <ArrowLeft size={18} />

          Back to Website

        </Link>

      </div>

    </aside>

  );

}
