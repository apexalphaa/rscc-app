export default function PlayerProfileCard({ player }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-8">

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="w-40 h-40 rounded-full bg-slate-200"></div>

        <div className="flex-1">

          <h1 className="text-4xl font-black">

            {player.name}

          </h1>

          <p className="text-xl text-slate-500 mt-3">

            {player.role}

          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <div>

              <strong>Age</strong>

              <p>{player.age}</p>

            </div>

            <div>

              <strong>Batch</strong>

              <p>{player.batch}</p>

            </div>

            <div>

              <strong>Batting Style</strong>

              <p>Right Handed</p>

            </div>

            <div>

              <strong>Bowling Style</strong>

              <p>Right Arm Medium</p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
