export default function PlayerProfileCard({ player }) {

  if (!player) return null;

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <div className="flex items-center gap-6">

        <div className="w-28 h-28 rounded-full bg-slate-200"></div>

        <div>

          <h1 className="text-3xl font-bold">

            {player.name}

          </h1>

          <p className="text-slate-500 mt-2">

            {player.role}

          </p>

          <p className="mt-1">

            Age : {player.age}

          </p>

          <p>

            Batch : {player.batch}

          </p>

        </div>

      </div>

    </div>

  );

}
