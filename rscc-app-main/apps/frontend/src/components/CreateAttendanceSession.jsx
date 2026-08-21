import batches from "../data/batches";
import Button from "./common/Button";

export default function CreateAttendanceSession() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h2 className="text-2xl font-bold">

        Create Attendance Session

      </h2>

      <div className="grid lg:grid-cols-4 gap-5 mt-8">

        <input
          type="date"
          className="border rounded-xl p-3"
        />

        <select className="border rounded-xl p-3">

          {batches.map((batch) => (

            <option
              key={batch}
            >
              {batch}
            </option>

          ))}

        </select>

        <input
          placeholder="Ground"
          className="border rounded-xl p-3"
        />

        <Button>

          Create Session

        </Button>

      </div>

    </div>

  );

}
