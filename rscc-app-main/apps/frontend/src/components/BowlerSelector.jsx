export default function BowlerSelector({

    playingXI,

    bowler,

    setBowler,

}){

    return(

        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">

                Current Bowler

            </h2>

            <select
                className="border rounded-xl p-3 w-full"
                value={bowler}
                onChange={(e)=>setBowler(e.target.value)}
            >

                <option>Select Bowler</option>

                {playingXI.map(player=>(

                    <option
                        key={player}
                    >
                        {player}
                    </option>

                ))}

            </select>

        </div>

    )

}
