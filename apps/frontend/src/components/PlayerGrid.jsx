import PlayerCard from "./PlayerCard";

export default function PlayersGrid({

  players,

}) {

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {players.length===0 && (

        <div className="col-span-full text-center py-16 text-slate-500">

          No Players Found

        </div>

      )}

      {players.map(player=>(

        <PlayerCard
          key={player.id}
          player={player}
        />

      ))}

    </div>

  );

}
