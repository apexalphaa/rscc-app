export default function AcademySettings() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Academy Information

      </h2>

      <div className="space-y-4">

        <input
          className="w-full border rounded-xl p-3"
          defaultValue="Rising Star Cricket Club"
        />

        <input
          className="w-full border rounded-xl p-3"
          defaultValue="Varanasi, Uttar Pradesh"
        />

        <input
          className="w-full border rounded-xl p-3"
          defaultValue="+91 9876543210"
        />

      </div>

    </div>

  );

}
