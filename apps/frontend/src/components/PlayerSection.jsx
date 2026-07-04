import PlayersGrid from "./PlayersGrid";

export default function PlayerSection({

  title,

  players,

}) {

  if(players.length===0)
    return null;

  return(

    <div className="mt-12">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold">

          {title}

        </h2>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

          {players.length} Players

        </span>

      </div>

      <PlayersGrid players={players}/>

    </div>

  );

}
