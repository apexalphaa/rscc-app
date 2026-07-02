export default function AttendanceSummary() {

  const cards = [
    {
      title: "Present",
      value: 0,
      color: "bg-green-100",
    },
    {
      title: "Absent",
      value: 0,
      color: "bg-red-100",
    },
    {
      title: "Late",
      value: 0,
      color: "bg-yellow-100",
    },
  ];

  return (

    <div className="grid md:grid-cols-3 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`${card.color} rounded-2xl p-6`}
        >

          <p className="text-slate-600">

            {card.title}

          </p>

          <h2 className="text-4xl font-bold mt-3">

            {card.value}

          </h2>

        </div>

      ))}

    </div>

  );

}
