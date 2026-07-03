import coaches from "../data/coaches";
import CoachCard from "./CoachCard";

export default function CoachGrid() {

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {coaches.map(coach => (

        <CoachCard
          key={coach.id}
          coach={coach}
        />

      ))}

    </div>

  );

}
