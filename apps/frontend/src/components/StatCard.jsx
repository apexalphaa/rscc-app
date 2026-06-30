export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="text-4xl">{icon}</div>

      <h3 className="mt-4 text-slate-500">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}
