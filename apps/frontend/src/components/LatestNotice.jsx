import { Bell } from "lucide-react";

export default function LatestNotice() {

  return (

    <section className="py-14 bg-amber-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-sm p-8 flex items-center gap-6">

          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">

            <Bell className="text-amber-600"/>

          </div>

          <div className="flex-1">

            <p className="text-amber-600 font-semibold uppercase">

              Latest Notice

            </p>

            <h2 className="text-2xl font-bold mt-2">

              Summer Coaching Camp registrations are now open.

            </h2>

            <p className="text-slate-500 mt-2">

              Admissions close on 20 July. Limited seats available.

            </p>

          </div>

          <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700">

            View All Notices

          </button>

        </div>

      </div>

    </section>

  );

}
