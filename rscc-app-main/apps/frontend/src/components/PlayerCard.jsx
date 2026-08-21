import { useNavigate } from "react-router-dom";

export default function PlayerCard({ player }) {

  const navigate = useNavigate();

  return (

    <div

      onClick={() => navigate(`/players/${player.id}`)}

      className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer"

    >

      <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto"></div>

      <h2 className="text-xl font-bold text-center mt-5">

        {player.name}

      </h2>

      <p className="text-center text-slate-500 mt-2">

        {player.role}

      </p>

      <div className="mt-5 space-y-2 text-sm">

  <div className="flex justify-between">

    <span>Batch</span>

    <span>{player.batch}</span>

  </div>

  <div className="flex justify-between">

    <span>Age</span>

    <span>{player.age} yrs</span>

  </div>

  <div className="flex justify-between">

    <span>Jersey</span>

    <span>#{player.jersey}</span>

  </div>

</div>

<div className="mt-5">

  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

    {player.category}

  </span>

</div>

    </div>

  );

}
