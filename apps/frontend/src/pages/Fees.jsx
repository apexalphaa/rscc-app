import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

const feeData = [
  {
    id: 1,
    player: "Rahul Sharma",
    batch: "U16",
    amount: "₹3,000",
    status: "Paid",
  },
  {
    id: 2,
    player: "Aryan Singh",
    batch: "U16",
    amount: "₹3,000",
    status: "Pending",
  },
  {
    id: 3,
    player: "Harsh Yadav",
    batch: "U14",
    amount: "₹2,500",
    status: "Paid",
  },
];

export default function Fees() {

  return (

    <DashboardLayout>

      <PageHeader
        title="Fees"
        subtitle="Manage Academy Fee Collection"
      />

      <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Player</th>
              <th>Batch</th>
              <th>Amount</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {feeData.map(fee => (

              <tr
                key={fee.id}
                className="border-b"
              >

                <td className="py-4">

                  {fee.player}

                </td>

                <td className="text-center">

                  {fee.batch}

                </td>

                <td className="text-center">

                  {fee.amount}

                </td>

                <td className="text-center">

                  <span className={`px-3 py-1 rounded-full text-sm ${
                    fee.status==="Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}>

                    {fee.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>

  );

}
