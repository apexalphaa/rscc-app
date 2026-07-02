export default function AttendanceNotes() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-xl font-bold mb-5">
        Coach Notes
      </h2>

      <textarea
        rows="5"
        placeholder="Write today's observations..."
        className="w-full border rounded-xl p-4"
      />

    </div>
  );
}
