import { Link } from "react-router-dom";
import logo from "../assets/rscc-logo.jpg";

export default function BrandLogo({ to = "/", size = "md", showName = true, dark = false }) {
  const sizes = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  };
  return (
    <Link to={to} className="flex items-center gap-3 shrink-0" aria-label="Rising Star Cricket Club home">
      <img
        src={logo}
        alt="Rising Star Cricket Club logo"
        className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-sm`}
      />
      {showName && (
        <span className={`leading-tight ${dark ? "text-white" : "text-slate-950"}`}>
          <strong className="block text-base font-extrabold tracking-tight">Rising Star</strong>
          <span className={`block text-xs font-semibold ${dark ? "text-slate-300" : "text-slate-500"}`}>Cricket Club · Sambalpur</span>
        </span>
      )}
    </Link>
  );
}
