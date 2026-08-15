import todaysSchedule from "../data/todaysSchedule";
import recentActivities from "../data/recentActivities";
import upcomingMatches from "../data/upcomingMatches";

export default function DashboardPanels() {
  return (
    <div className="grid xl:grid-cols-3 gap-6">

      {/* Today's Schedule */}

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Today's Schedule
        </h2>

        <div className="space-y-5">

          {todaysSchedule.map((item) => (

            <div key={item.id}>

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-slate-500">
                {item.time} • {item.venue}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Recent Activity
        </h2>

        <div className="space-y-5">

          {recentActivities.map((activity) => (

            <div key={activity.id}>

              <p>
                {activity.text}
              </p>

              <span className="text-sm text-slate-500">
                {activity.time}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Upcoming Matches */}

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Upcoming Matches
        </h2>

        <div className="space-y-5">

          {upcomingMatches.map((match) => (

            <div key={match.id}>

              <h3 className="font-semibold">
                {match.team}
              </h3>

              <p className="text-sm text-slate-500">
                {match.date} • {match.time}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
