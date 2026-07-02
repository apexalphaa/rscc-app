export default function SummaryCard({
  title,
  value,
  color,
}) {
  return (
    <div className={`${color} rounded-2xl p-6`}>

      <p className="text-slate-600">

        {title}

      </p>

      <h2 className="text-4xl font-black mt-3">

        {value}

      </h2>

    </div>
  );
}
