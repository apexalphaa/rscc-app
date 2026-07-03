export default function EmptyState({

  title = "Nothing Found",

  description = "No data available.",

}) {

  return (

    <div className="bg-white rounded-3xl shadow-sm py-20 text-center">

      <div className="text-6xl">

        📂

      </div>

      <h2 className="text-2xl font-bold mt-5">

        {title}

      </h2>

      <p className="text-slate-500 mt-3">

        {description}

      </p>

    </div>

  );

}
