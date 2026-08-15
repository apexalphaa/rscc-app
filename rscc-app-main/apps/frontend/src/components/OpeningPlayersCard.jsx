export default function OpeningPlayersCard() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Opening Players

      </h2>

      <div className="grid md:grid-cols-3 gap-5">

        <select className="border rounded-xl p-3">

          <option>Striker</option>

        </select>

        <select className="border rounded-xl p-3">

          <option>Non Striker</option>

        </select>

        <select className="border rounded-xl p-3">

          <option>Opening Bowler</option>

        </select>

      </div>

    </div>

  );

}
