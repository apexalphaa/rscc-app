export default function Button({ children }) {
  return (
    <button className="rounded-xl bg-green-600 hover:bg-green-700 transition-all text-white px-6 py-3 font-semibold shadow-md">
      {children}
    </button>
  );
}
