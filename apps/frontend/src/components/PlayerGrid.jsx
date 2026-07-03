import players from "../data/players";
import PlayerCard from "./PlayerCard";

export default function PlayersGrid() {

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {players.map(player => (

        <PlayerCard
          key={player.id}
          player={player}
        />

      ))}

    </div>

  );

}
