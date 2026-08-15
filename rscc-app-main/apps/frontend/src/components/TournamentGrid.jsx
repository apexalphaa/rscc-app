import tournaments from "../data/tournaments";
import TournamentCard from "./TournamentCard";

export default function TournamentGrid() {

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {tournaments.map((tournament)=>(

        <TournamentCard
          key={tournament.id}
          tournament={tournament}
        />

      ))}

    </div>

  );

}
