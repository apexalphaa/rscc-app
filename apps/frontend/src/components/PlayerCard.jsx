export default function PlayerCard({ player }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer">

      <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto"></div>

      <h2 className="text-xl font-bold text-center mt-5">

        {player.name}

      </h2>

      <p className="text-center text-slate-500 mt-2">

        {player.role}

      </p>

      <div className="mt-5 flex justify-between">

        <span>{player.batch}</span>

        <span>{player.age} yrs</span>

      </div>

    </div>

  );

}
