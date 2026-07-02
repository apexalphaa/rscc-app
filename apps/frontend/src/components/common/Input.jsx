export default function Input({
  type = "text",
  placeholder = "",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-300 p-3 focus:border-green-600 focus:outline-none"
    />
  );
}
