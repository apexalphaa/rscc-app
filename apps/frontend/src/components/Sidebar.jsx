import { Link, useLocation } from "react-router-dom";
import navigation from "../data/navigation";

export default function Sidebar() {

  const location = useLocation();

  return (

    <aside className="w-72 bg-slate-900 text-white min-h-screen flex flex-col">

      <div className="p-8 border-b border-slate-700">

        <h1 className="text-3xl font-black text-green-500">

          RSCC

        </h1>

        <p className="text-slate-400">

          Academy Portal

        </p>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        {navigation.map((item)=>{

          const Icon=item.icon;

          return(

            <Link

              key={item.path}

              to={item.path}

              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition

              ${
                location.pathname===item.path

                ? "bg-green-600"

                : "hover:bg-slate-800"

              }`}

            >

              <Icon size={20}/>

              {item.title}

            </Link>

          );

        })}

      </nav>

    </aside>

  );

}
