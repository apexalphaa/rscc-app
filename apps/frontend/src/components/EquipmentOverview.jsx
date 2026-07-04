import equipment from "../data/equipment";

export default function EquipmentOverview() {

  const total = equipment.reduce((sum, item) => sum + item.total, 0);

  const available = equipment.reduce(
    (sum, item) => sum + item.available,
    0
  );

  const repair = equipment.reduce(
    (sum, item) => sum + item.repair,
    0
  );

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      <Card title="Total Equipment" value={total} />

      <Card title="Available" value={available} />

      <Card title="Under Repair" value={repair} />

    </div>

  );

}

function Card({ title, value }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h3 className="text-slate-500">{title}</h3>

      <p className="text-4xl font-black text-green-600 mt-3">

        {value}

      </p>

    </div>

  );

}
