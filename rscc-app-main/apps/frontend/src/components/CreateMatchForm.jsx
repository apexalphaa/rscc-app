import matchTypes from "../data/matchTypes";
import Button from "./common/Button";

export default function CreateMatchForm() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h2 className="text-3xl font-bold">

        Create Match

      </h2>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <input
          placeholder="Team A"
          className="border rounded-xl p-3"
        />

        <input
          placeholder="Team B"
          className="border rounded-xl p-3"
        />

        <input
          placeholder="Ground"
          className="border rounded-xl p-3"
        />

        <input
          type="date"
          className="border rounded-xl p-3"
        />

        <input
          type="time"
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          placeholder="Overs"
          className="border rounded-xl p-3"
        />

        <select
          className="border rounded-xl p-3"
        >

          {matchTypes.map((item)=>(

            <option
              key={item}
            >

              {item}

            </option>

          ))}

        </select>

        <Button>

          Create Match

        </Button>

      </div>

    </div>
  );
}
