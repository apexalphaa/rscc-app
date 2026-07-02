export default function AttendanceSummary({
  attendance,
}) {

  const present = Object.values(attendance).filter(
    (x) => x === "Present"
  ).length;

  const absent = Object.values(attendance).filter(
    (x) => x === "Absent"
  ).length;

  const late = Object.values(attendance).filter(
    (x) => x === "Late"
  ).length;

  const cards = [
    {
      title: "Present",
      value: present,
      color: "bg-green-100",
    },
    {
      title: "Absent",
      value: absent,
      color: "bg-red-100",
    },
    {
      title: "Late",
      value: late,
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

          <p>{card.title}</p>

          <h2 className="text-4xl font-bold mt-3">

            {card.value}

          </h2>

        </div>

      ))}

    </div>
  );

}
