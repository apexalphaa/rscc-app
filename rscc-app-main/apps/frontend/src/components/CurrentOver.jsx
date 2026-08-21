export default function CurrentOver({ balls }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h2 className="text-2xl font-bold">

        Current Over

      </h2>

      <div className="flex gap-3 flex-wrap mt-6">

        {balls.length === 0 && (

          <p className="text-slate-500">

            No deliveries yet.

          </p>

        )}

        {balls.map((ball, index) => (

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
