export default function LegByeButtons({ onLegBye }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-xl font-bold mb-5">

        Leg Bye

      </h2>

      <div className="grid grid-cols-5 gap-3">

        {[1,2,3,4,5].map(run=>(

          <button
            key={run}
            onClick={()=>onLegBye(run)}
            className="rounded-xl bg-purple-600 text-white py-3"
          >

            {run}

          </button>

        ))}

      </div>

    </div>

  );

}
