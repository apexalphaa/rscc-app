export default function PlayingXISetup() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Playing XI

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

        {Array.from({ length: 11 }).map((_, index) => (

          <select
            key={index}
            className="border rounded-xl p-3"
          >

            <option>

              Player {index + 1}

            </option>

          </select>

        ))}

      </div>

    </div>

  );

}
