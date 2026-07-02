export default function Input({
  type = "text",
  placeholder = "",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
    />
  );
}
