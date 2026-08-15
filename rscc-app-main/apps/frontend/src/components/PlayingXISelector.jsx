import demoPlayers from "../data/demoPlayers";

export default function PlayingXISelector({

    match,

    setPlayingXI,

}){

    return(

        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">

                Playing XI

            </h2>

            <div className="grid md:grid-cols-2 gap-4">

                {demoPlayers.map(player=>(

                    <label
                        key={player}
                        className="flex items-center gap-3 border rounded-xl p-3"
                    >

                        <input
                            type="checkbox"
                            onChange={(e)=>setPlayingXI(player,e.target.checked)}
                        />

                        {player}

                    </label>

                ))}

            </div>

        </div>

    )

}
