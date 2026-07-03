export default function PartnershipCard({ match }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Partnership

      </h2>

      <div className="text-center">

        <h1 className="text-5xl font-black text-green-600">

          {match.partnership.runs}

        </h1>

        <p className="mt-3 text-slate-500">

          Runs

        </p>

        <p className="mt-2">

          Balls : {match.partnership.balls}

        </p>

      </div>

    </div>

  );

}
