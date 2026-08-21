export default function Select({
  options = [],
}) {
  return (
    <select
      className="w-full rounded-xl border border-slate-300 p-3 focus:outline-none focus:border-green-600"
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  );
}
