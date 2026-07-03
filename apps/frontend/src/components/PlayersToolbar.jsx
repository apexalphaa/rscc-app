import Button from "./common/Button";

export default function PlayersToolbar() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col lg:flex-row gap-4">

      <input
        placeholder="Search Player..."
        className="border rounded-xl p-3 flex-1"
      />

      <select className="border rounded-xl p-3">

        <option>All Batches</option>
        <option>U14</option>
        <option>U16</option>
        <option>U19</option>

      </select>

      <Button>

        Add Player

      </Button>

    </div>

  );

}
