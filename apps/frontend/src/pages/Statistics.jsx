import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

export default function Statistics() {

  const cards = [

    {
      title:"Players",
      value:48
    },

    {
      title:"Matches",
      value:126
    },

    {
      title:"Attendance",
      value:"92%"
    },

    {
      title:"Tournaments",
      value:6
    }

  ];

  return (

    <DashboardLayout>

      <PageHeader
        title="Statistics"
        subtitle="Academy Overview"
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        {cards.map(card=>(

          <div
            key={card.title}
            className="bg-white rounded-3xl shadow-sm p-6"
          >

            <p className="text-slate-500">

              {card.title}

            </p>

            <h2 className="text-5xl font-black mt-5">

              {card.value}

            </h2>

          </div>

        ))}

      </div>

    </DashboardLayout>

  );

}
