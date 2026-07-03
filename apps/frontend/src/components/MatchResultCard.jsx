export default function MatchResultCard({

  result,

}) {

  return (

    <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-3xl p-8 text-white">

      <h2 className="text-3xl font-bold">

        Match Result

      </h2>

      <p className="text-2xl mt-6">

        {result}

      </p>

    </div>

  );

}
