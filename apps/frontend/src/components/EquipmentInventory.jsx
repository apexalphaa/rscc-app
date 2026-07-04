import equipment from "../data/equipment";

export default function EquipmentInventory() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Equipment Inventory

      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">Item</th>

            <th>Total</th>

            <th>Available</th>

            <th>Repair</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {equipment.map(item => (

            <tr
              key={item.id}
              className="border-b"
            >

              <td className="py-4">

                {item.name}

              </td>

              <td className="text-center">

                {item.total}

              </td>

              <td className="text-center">

                {item.available}

              </td>

              <td className="text-center">

                {item.repair}

              </td>

              <td className="text-center">

                {item.status}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
