export default function MatchDetailsCard() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Match Details

      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          placeholder="Team A"
          className="border rounded-xl p-3"
        />

        <input
          placeholder="Team B"
          className="border rounded-xl p-3"
        />

        <select className="border rounded-xl p-3">

          <option>T20</option>
          <option>ODI</option>
          <option>Test</option>
          <option>Custom</option>

        </select>

        <input
          type="number"
          placeholder="Overs"
          className="border rounded-xl p-3"
        />

      </div>

    </div>

  );

}
