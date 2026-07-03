export default function PlayerCard({ player }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-lg transition">

      <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto" />

      <h2 className="text-xl font-bold text-center mt-5">
        {player.name}
      </h2>

      <div className="mt-6 space-y-2">

        <div className="flex justify-between">
          <span>Age</span>
          <span>{player.age}</span>
        </div>

        <div className="flex justify-between">
          <span>Role</span>
          <span>{player.role}</span>
        </div>

        <div className="flex justify-between">
          <span>Batch</span>
          <span>{player.batch}</span>
        </div>

      </div>

    </div>
  );
}
