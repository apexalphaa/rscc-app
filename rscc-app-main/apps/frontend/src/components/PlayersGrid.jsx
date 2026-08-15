import PlayerCard from "./PlayerCard";
import EmptyState from "./EmptyState";

export default function PlayersGrid({

players,

}){

return(

<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

{players.length===0 &&(

<EmptyState

  title="No Players Found"

  description="Try changing the filters."

/>

)}

{players.map(player=>(

<PlayerCard

key={player.id}

player={player}

/>

))}

</div>

)

}
