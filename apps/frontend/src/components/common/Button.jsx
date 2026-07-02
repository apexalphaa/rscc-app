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
      className={`px-7 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-700 ${className}`}
    >
      {children}
    </button>
  );
}
