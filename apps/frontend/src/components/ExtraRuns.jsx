export default function ExtraRuns({

  onWide,

  onNoBall,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-xl font-bold mb-6">

        Extras

      </h2>

      <div className="grid grid-cols-2 gap-6">

        <button
          onClick={()=>onWide(1)}
          className="rounded-xl bg-yellow-500 py-4 text-white"
        >

          Wide

        </button>

        <button
          onClick={()=>onNoBall(1)}
          className="rounded-xl bg-orange-600 py-4 text-white"
        >

          No Ball

        </button>

      </div>

    </div>

  );

}
