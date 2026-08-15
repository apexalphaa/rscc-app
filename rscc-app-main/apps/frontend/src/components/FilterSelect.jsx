export default function FilterSelect({
  label,
  options,
}) {
  return (
    <div className="flex flex-col gap-2">

      <label className="text-sm font-medium text-slate-600">
        {label}
      </label>

      <select
        className="border border-slate-300 rounded-xl px-4 py-3 bg-white"
      >
        <option>All</option>

        {options.map((item) => (
          <option
            key={item}
          >
            {item}
          </option>
        ))}

      </select>

    </div>
  );
}
