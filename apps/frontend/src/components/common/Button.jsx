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
      className={`rounded-xl bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 font-semibold shadow ${className}`}
    >
      {children}
    </button>
  );
}
