export default function NewBatterCard({

  players = [],

  onSelect,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        New Batter

      </h2>

      <select
        className="w-full border rounded-xl p-3"
        onChange={(e)=>onSelect(e.target.value)}
      >

        <option>

          Select Batter

        </option>

        {players.map(player=>(

          <option
            key={player}
            value={player}
          >

            {player}

          </option>

        ))}

      </select>

    </div>

  );

}
