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
      className={`px-6 py-3 rounded-xl bg-green-600 text-white font-semibold transition hover:bg-green-700 ${className}`}
    >
      {children}
    </button>
  );
}
