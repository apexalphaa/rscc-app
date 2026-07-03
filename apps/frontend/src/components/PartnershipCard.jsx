export default function PartnershipCard({ match }) {

  const { partnership } = match;

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Partnership

      </h2>

      <div className="text-center">

        <h1 className="text-6xl font-black text-green-600">

          {partnership.runs}

        </h1>

        <p className="text-slate-500 mt-3">

          Runs

        </p>

        <p className="mt-4 text-xl">

          {partnership.balls} Balls

        </p>

      </div>

    </div>

  );

}
