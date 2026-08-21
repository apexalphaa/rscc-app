import { Link } from "react-router-dom";
import GlobalSearch from "./GlobalSearch";

export default function Topbar() {

  return (

    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">

      <GlobalSearch/>

      <div className="flex items-center gap-6">

        <button className="relative text-2xl">

          🔔

          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">

            3

          </span>

        </button>

        <Link
          to="/settings"
          className="flex items-center gap-3"
        >

          <div className="w-10 h-10 rounded-full bg-slate-300"></div>

          <span className="font-semibold">

            Admin

          </span>

        </Link>

      </div>

    </header>

  );

}
