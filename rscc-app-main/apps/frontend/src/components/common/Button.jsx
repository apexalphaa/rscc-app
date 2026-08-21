export default function Button({
  children, className = "", onClick, type = "button", disabled = false,
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-rscc-blue px-5 py-3 font-bold text-white shadow-sm transition hover:bg-rscc-blue-dark disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
      {children}
    </button>
  );
}
