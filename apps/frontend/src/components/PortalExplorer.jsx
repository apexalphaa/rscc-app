import { Link } from "react-router-dom";

const pages = [

  {
    title: "Dashboard",
    path: "/dashboard",
  },

  {
    title: "Players",
    path: "/players",
  },

  {
    title: "Coaches",
    path: "/coaches",
  },

  {
    title: "Attendance",
    path: "/attendance",
  },

  {
    title: "Matches",
    path: "/matches",
  },

  {
    title: "Tournaments",
    path: "/tournaments",
  },

  {
    title: "Fees",
    path: "/fees",
  },

  {
    title: "Equipment",
    path: "/equipment",
  },

  {
    title: "Notice Board",
    path: "/notice-board",
  },

  {
    title: "Calendar",
    path: "/calendar",
  },

  {
    title: "Statistics",
    path: "/statistics",
  },

  {
    title: "Settings",
    path: "/settings",
  },

];

export default function PortalExplorer() {

  return (

    <section className="py-24 bg-slate-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-black text-center">

          Explore Academy Portal

        </h2>

        <p className="text-center text-slate-500 mt-4">

          Temporary developer navigation

        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-14">

          {pages.map(page => (

            <Link

              key={page.path}

              to={page.path}

              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"

            >

              <h3 className="text-2xl font-bold">

                {page.title}

              </h3>

              <p className="text-slate-500 mt-3">

                Open {page.title}

              </p>

            </Link>

          ))}

        </div>

      </div>

    </section>

  );

}
