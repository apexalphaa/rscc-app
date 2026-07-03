import { Link } from "react-router-dom";

const pages = [

  {
    title: "Dashboard",
    path: "/dashboard",
    description: "Academy Overview",
  },

  {
    title: "Players",
    path: "/players",
    description: "Manage Players",
  },

  {
    title: "Coaches",
    path: "/coaches",
    description: "Coaching Staff",
  },

  {
    title: "Attendance",
    path: "/attendance",
    description: "Attendance Records",
  },

  {
    title: "Matches",
    path: "/matches",
    description: "Live Scoring",
  },

  {
    title: "Tournaments",
    path: "/tournaments",
    description: "Tournament Management",
  },

  {
    title: "Fees",
    path: "/fees",
    description: "Fee Collection",
  },

  {
    title: "Equipment",
    path: "/equipment",
    description: "Inventory",
  },

  {
    title: "Calendar",
    path: "/calendar",
    description: "Training Schedule",
  },

  {
    title: "Notice Board",
    path: "/notice-board",
    description: "Academy Notices",
  },

  {
    title: "Statistics",
    path: "/statistics",
    description: "Academy Analytics",
  },

  {
    title: "Settings",
    path: "/settings",
    description: "Portal Settings",
  },

];

export default function PortalExplorer() {

  return (

    <section
      id="portal"
      className="py-24 bg-slate-100"
    >

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-black">

            Explore Academy Portal

          </h2>

          <p className="text-slate-500 mt-4 text-lg">

            Explore every module of the academy management system.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">

          {pages.map((page)=>(

            <Link

              key={page.path}

              to={page.path}

              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition hover:-translate-y-2 p-8"

            >

              <h3 className="text-2xl font-bold">

                {page.title}

              </h3>

              <p className="text-slate-500 mt-3">

                {page.description}

              </p>

              <p className="mt-8 text-green-600 font-semibold">

                Open →

              </p>

            </Link>

          ))}

        </div>

      </div>

    </section>

  );

}
