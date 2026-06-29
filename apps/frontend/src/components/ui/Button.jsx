import colors from "../../theme/colors";

export default function Button({
  children,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: colors.secondary,
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        padding: "12px 24px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      {children}
    </button>
  );
}
