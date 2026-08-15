export default function RunRateCardAdvanced({

  current,

  required,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Run Rates

      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">

          <span>Current RR</span>

          <strong>{current}</strong>

        </div>

        <div className="flex justify-between">

          <span>Required RR</span>

          <strong>{required}</strong>

        </div>

      </div>

    </div>

  );

}
