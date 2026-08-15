export default function RunRateCard({ match }) {

  const overs =
    match.innings.legalBalls / 6;

  const runRate =
    overs === 0
      ? 0
      : (match.innings.score / overs).toFixed(2);

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Run Rate

      </h2>

      <h1 className="text-6xl font-black text-green-600">

        {runRate}

      </h1>

    </div>

  );

}
