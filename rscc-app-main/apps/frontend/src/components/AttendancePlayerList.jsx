export default function AttendancePlayerList({

  players,

  setPlayers,

}) {

  function updateStatus(id, status) {

    setPlayers(prev =>
      prev.map(player =>
        player.id === id
          ? { ...player, status }
          : player
      )
    );

  }

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Mark Attendance

      </h2>

      <div className="space-y-4">

        {players.map(player => (

          <div
            key={player.id}
            className="flex justify-between items-center border rounded-xl p-4"
          >

            <div>

              <h3 className="font-semibold">

                {player.name}

              </h3>

              <p className="text-slate-500 text-sm">

                {player.batch}

              </p>

            </div>

            <select
              value={player.status}
              onChange={(e)=>
                updateStatus(
                  player.id,
                  e.target.value
                )
              }
              className="border rounded-xl px-3 py-2"
            >

              <option>Present</option>

              <option>Absent</option>

              <option>Late</option>

            </select>

          </div>

        ))}

      </div>

    </div>

  );

}
