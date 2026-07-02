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
      className={`px-5 py-3 rounded-xl text-white font-medium transition ${className}`}
    >
      {children}
    </button>
  );
}
