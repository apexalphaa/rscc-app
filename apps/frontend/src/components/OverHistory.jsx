export default function OverHistory({ match }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Current Over

      </h2>

      <div className="flex flex-wrap gap-3">

        {match.currentOver.length === 0 && (

          <p className="text-slate-500">

            No deliveries yet.

          </p>

        )}

        {match.currentOver.map((ball, index) => (

          <div
            key={index}
            className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold"
          >

            {ball}

          </div>

        ))}

      </div>

    </div>

  );

}
