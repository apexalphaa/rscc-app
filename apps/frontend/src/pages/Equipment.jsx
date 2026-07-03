import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

const equipment = [

  {
    item:"Cricket Bats",
    stock:18,
  },

  {
    item:"Leather Balls",
    stock:72,
  },

  {
    item:"Helmets",
    stock:14,
  },

  {
    item:"Batting Pads",
    stock:22,
  },

];

export default function Equipment(){

    return(

        <DashboardLayout>

            <PageHeader
                title="Equipment"
                subtitle="Academy Inventory"
            />

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                {equipment.map(item=>(

                    <div
                        key={item.item}
                        className="bg-white rounded-3xl shadow-sm p-6"
                    >

                        <h2 className="text-xl font-bold">

                            {item.item}

                        </h2>

                        <h1 className="text-5xl font-black mt-6 text-green-600">

                            {item.stock}

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Available

                        </p>

                    </div>

                ))}

            </div>

        </DashboardLayout>

    )

}
