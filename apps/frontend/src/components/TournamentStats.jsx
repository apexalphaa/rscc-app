export default function TournamentStats() {

  const stats = [
    {
      title: "Active",
      value: 1,
    },
    {
      title: "Upcoming",
      value: 1,
    },
    {
      title: "Completed",
      value: 1,
    },
    {
      title: "Total Teams",
      value: 34,
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
