import equipment from "../data/equipment";

export default function EquipmentRepairQueue() {

  const repair = equipment.filter(
    item => item.repair > 0
  );

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Repair Queue

      </h2>

      <div className="space-y-4">

        {repair.map(item => (

          <div
            key={item.id}
            className="flex justify-between border rounded-xl p-4"
          >

            <span>{item.name}</span>

            <span>{item.repair} Pending</span>

          </div>

        ))}

      </div>

    </div>

  );

}
