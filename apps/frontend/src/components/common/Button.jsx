export default function Button({
  children,
  className = "",
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg bg-green-600 hover:bg-green-700 text-white ${className}`}
    >
      {children}
    </button>
  );
}
