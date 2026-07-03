export default function TargetCard({

  target,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold">

        Target

      </h2>

      <h1 className="text-6xl font-black text-green-600 mt-6">

        {target}

      </h1>

    </div>

  );

}
