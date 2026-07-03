export default function PlayerStatsCard() {

  const stats = [

    {
      title: "Matches",
      value: 24,
    },

    {
      title: "Runs",
      value: 812,
    },

    {
      title: "Wickets",
      value: 31,
    },

    {
      title: "Attendance",
      value: "94%",
    },

  ];

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item)=>(

        <div
          key={item.title}
          className="bg-white rounded-3xl shadow-sm p-6"
        >

          <p className="text-slate-500">

            {item.title}

          </p>

          <h2 className="text-4xl font-bold mt-4">

            {item.value}

          </h2>

        </div>

      ))}

    </div>

  );

}
