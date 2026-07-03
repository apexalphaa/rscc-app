export default function ChangeBowlerCard({

  bowlers = [],

  onChange,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Change Bowler

      </h2>

      <select
        className="w-full border rounded-xl p-3"
        onChange={(e)=>onChange(e.target.value)}
      >

        <option>

          Select Bowler

        </option>

        {bowlers.map(player=>(

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
