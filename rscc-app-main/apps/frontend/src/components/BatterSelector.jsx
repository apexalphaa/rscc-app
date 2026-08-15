export default function BatterSelector({

    playingXI,

    striker,

    nonStriker,

    setStriker,

    setNonStriker,

}){

    return(

        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">

                Opening Batters

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <select
                    className="border rounded-xl p-3"
                    value={striker}
                    onChange={(e)=>setStriker(e.target.value)}
                >

                    <option>Select Striker</option>

                    {playingXI.map(player=>(

                        <option
                            key={player}
                        >
                            {player}
                        </option>

                    ))}

                </select>

                <select
                    className="border rounded-xl p-3"
                    value={nonStriker}
                    onChange={(e)=>setNonStriker(e.target.value)}
                >

                    <option>Select Non Striker</option>

                    {playingXI.map(player=>(

                        <option
                            key={player}
                        >
                            {player}
                        </option>

                    ))}

                </select>

            </div>

        </div>

    )

}
