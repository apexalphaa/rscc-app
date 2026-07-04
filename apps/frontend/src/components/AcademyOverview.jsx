import players from "../data/players";

export default function AcademyOverview() {

  const total = players.length;

  const seniors = players.filter(
    p => p.category === "Senior"
  ).length;

  const juniors = players.filter(
    p => p.category === "Junior"
  ).length;

  const active = players.filter(
    p => p.status === "Active"
  ).length;

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h3 className="text-slate-500">

          Total Players

        </h3>

        <p className="text-4xl font-black mt-2 text-green-600">

          {total}

        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h3 className="text-slate-500">

          Senior Team

        </h3>

        <p className="text-4xl font-black mt-2">

          {seniors}

        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h3 className="text-slate-500">

          Junior Team

        </h3>

        <p className="text-4xl font-black mt-2">

          {juniors}

        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h3 className="text-slate-500">

          Active Players

        </h3>

        <p className="text-4xl font-black mt-2">

          {active}

        </p>

      </div>

    </div>

  );

}
