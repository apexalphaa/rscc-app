export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-xl bg-green-600 hover:bg-green-700 transition-all duration-300 text-white px-6 py-3 font-semibold shadow-md ${className}`}
    >
      {children}
    </button>
  );
}
