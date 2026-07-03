import demoPlayers from "../data/demoPlayers";

export default function MatchSetup({
  match,
  setPlayingXI,
  setStriker,
  setNonStriker,
  setBowler,
}) {
  return (
    <div className="space-y-8">

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h2 className="text-2xl font-bold mb-6">
          Playing XI
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {demoPlayers.map((player) => (
            <label
              key={player}
              className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={match.playingXI.includes(player)}
                onChange={(e) =>
                  setPlayingXI(player, e.target.checked)
                }
              />

              <span>{player}</span>

            </label>
          ))}

        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl shadow-sm p-6">

          <h3 className="font-bold mb-4">
            Striker
          </h3>

          <select
            className="w-full border rounded-xl p-3"
            value={match.batters.striker.name}
            onChange={(e) => setStriker(e.target.value)}
          >

            <option value="">Select</option>

            {match.playingXI.map((player) => (

              <option
                key={player}
                value={player}
              >

                {player}

              </option>

            ))}

          </select>

        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">

          <h3 className="font-bold mb-4">
            Non Striker
          </h3>

          <select
            className="w-full border rounded-xl p-3"
            value={match.batters.nonStriker.name}
            onChange={(e) => setNonStriker(e.target.value)}
          >

            <option value="">Select</option>

            {match.playingXI.map((player) => (

              <option
                key={player}
                value={player}
              >

                {player}

              </option>

            ))}

          </select>

        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">

          <h3 className="font-bold mb-4">
            Bowler
          </h3>

          <select
            className="w-full border rounded-xl p-3"
            value={match.bowler.name}
            onChange={(e) => setBowler(e.target.value)}
          >

            <option value="">Select</option>

            {match.playingXI.map((player) => (

              <option
                key={player}
                value={player}
              >

                {player}

              </option>

            ))}

          </select>

        </div>

      </div>

    </div>
  );
}
