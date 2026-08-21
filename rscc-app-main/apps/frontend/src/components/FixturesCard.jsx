const fixtures = [
  {
    id: 1,
    teamA: "Rising Stars",
    teamB: "Warriors",
    date: "15 Jul",
    time: "9:00 AM",
  },
  {
    id: 2,
    teamA: "Titans",
    teamB: "Lions",
    date: "16 Jul",
    time: "4:00 PM",
  },
  {
    id: 3,
    teamA: "Warriors",
    teamB: "Titans",
    date: "18 Jul",
    time: "8:00 AM",
  },
];

export default function FixturesCard() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Upcoming Fixtures

      </h2>

      <div className="space-y-4">

        {fixtures.map(match => (

          <div
            key={match.id}
            className="border rounded-2xl p-4"
          >

            <div className="font-bold text-lg">

              {match.teamA}

              {" vs "}

              {match.teamB}

            </div>

            <p className="text-slate-500 mt-2">

              {match.date} • {match.time}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}
