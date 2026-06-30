export default function Input({
  type = "text",
  placeholder = "",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
    />
  );
}
