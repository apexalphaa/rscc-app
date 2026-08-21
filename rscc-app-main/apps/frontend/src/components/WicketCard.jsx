export default function WicketCard({ onWicket }) {

  const wicketTypes = [
    "Bowled",
    "Caught",
    "LBW",
    "Run Out",
    "Stumped",
    "Hit Wicket",
    "Retired Hurt",
  ];

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Wicket

      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {wicketTypes.map(type => (

          <button
            key={type}
            onClick={() => onWicket(type)}
            className="rounded-xl bg-red-600 hover:bg-red-700 text-white py-3 transition"
          >

            {type}

          </button>

        ))}

      </div>

    </div>

  );

}
