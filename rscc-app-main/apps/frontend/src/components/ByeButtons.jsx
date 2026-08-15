export default function ByeButtons({ onBye }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-xl font-bold mb-5">

        Bye

      </h2>

      <div className="grid grid-cols-5 gap-3">

        {[1,2,3,4,5].map(run=>(

          <button
            key={run}
            onClick={()=>onBye(run)}
            className="rounded-xl bg-blue-600 text-white py-3"
          >

            {run}

          </button>

        ))}

      </div>

    </div>

  );

}
