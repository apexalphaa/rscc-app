export default function PlayerCard({
  player,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto"></div>

      <h2 className="text-center text-xl font-bold mt-5">
        {player.name}
      </h2>

      <p className="text-center text-slate-500 mt-1">
        {player.role}
      </p>

      <div className="mt-6 text-sm">

        <p>Age : {player.age}</p>

        <p>Batting : {player.batting}</p>

        <p>Bowling : {player.bowling}</p>

      </div>

    </div>
  );
}
