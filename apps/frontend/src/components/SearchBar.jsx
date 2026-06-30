export default function SearchBar({
  placeholder,
}) {
  return (
    <input
      placeholder={placeholder}
      className="w-full md:w-96 border rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
    />
  );
}
