export default function AttendanceSummary({ players }) {

  const present = players.filter(
    p => p.status === "Present"
  ).length;

  const absent = players.filter(
    p => p.status === "Absent"
  ).length;

  const late = players.filter(
    p => p.status === "Late"
  ).length;

  return (

    <div className="grid md:grid-cols-4 gap-6">

      <Card title="Total Players" value={players.length} />

      <Card title="Present" value={present} />

      <Card title="Absent" value={absent} />

      <Card title="Late" value={late} />

    </div>

  );

}

function Card({ title, value }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h3 className="text-slate-500">

        {title}

      </h3>

      <p className="text-4xl font-black mt-2 text-green-600">

        {value}

      </p>

    </div>

  );

}
