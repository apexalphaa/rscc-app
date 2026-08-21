export default function SearchBar({
  placeholder,
}) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
    />
  );
}
