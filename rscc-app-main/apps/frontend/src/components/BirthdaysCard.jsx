import birthdays from "../data/birthdays";
import { Cake } from "lucide-react";

export default function BirthdaysCard() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">

      <div className="flex items-center gap-3 mb-6">

        <Cake className="text-pink-500"/>

        <h2 className="text-xl font-bold">
          Birthdays
        </h2>

      </div>

      <div className="space-y-4">

        {birthdays.map((player)=>(
          <div
            key={player.id}
            className="flex justify-between"
          >
            <span>{player.name}</span>

            <span className="text-slate-500">
              {player.age} yrs
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}
