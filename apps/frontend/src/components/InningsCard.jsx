export default function InningsCard({

  innings,

  onChange,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Innings

      </h2>

      <div className="flex gap-4">

        <button
          onClick={() => onChange(1)}
          className={`px-6 py-3 rounded-xl ${
            innings===1
            ? "bg-green-600 text-white"
            : "bg-slate-200"
          }`}
        >

          1st Innings

        </button>

        <button
          onClick={() => onChange(2)}
          className={`px-6 py-3 rounded-xl ${
            innings===2
            ? "bg-green-600 text-white"
            : "bg-slate-200"
          }`}
        >

          2nd Innings

        </button>

      </div>

    </div>

  );

}
