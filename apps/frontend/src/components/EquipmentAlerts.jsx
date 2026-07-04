import equipment from "../data/equipment";

export default function EquipmentAlerts() {

  const alerts = equipment.filter(
    item => item.available <= 5
  );

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Low Stock Alerts

      </h2>

      <div className="space-y-3">

        {alerts.length === 0 ? (

          <p className="text-green-600">

            No low stock items.

          </p>

        ) : (

          alerts.map(item => (

            <div
              key={item.id}
              className="border rounded-xl p-4 flex justify-between"
            >

              <span>{item.name}</span>

              <span>{item.available} Left</span>

            </div>

          ))

        )}

      </div>

    </div>

  );

}
