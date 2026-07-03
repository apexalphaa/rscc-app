export default function TossCard() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Toss

      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <select className="border rounded-xl p-3">

          <option>Toss Winner</option>

          <option>Team A</option>

          <option>Team B</option>

        </select>

        <select className="border rounded-xl p-3">

          <option>Decision</option>

          <option>Bat First</option>

          <option>Bowl First</option>

        </select>

      </div>

    </div>

  );

}
