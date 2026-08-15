export default function BattersCard({ match }) {
  const { striker, nonStriker } = match.batters;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Current Batters
      </h2>

      <div className="space-y-6">

        <div className="border rounded-2xl p-4">

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-bold text-lg">

                ⭐ {striker.name}

              </h3>

              <p className="text-slate-500">

                On Strike

              </p>

            </div>

            <h2 className="text-3xl font-black">

              {striker.runs} ({striker.balls})

            </h2>

          </div>

        </div>

        <div className="border rounded-2xl p-4">

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-bold text-lg">

                {nonStriker.name}

              </h3>

              <p className="text-slate-500">

                Non-Striker

              </p>

            </div>

            <h2 className="text-3xl font-black">

              {nonStriker.runs} ({nonStriker.balls})

            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}
