import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["#about", "About"],
    ["#programs", "Programs"],
    ["#coaches", "Coaches"],
    ["#events", "Events"],
    ["#contact", "Contact"],
  ];

  return (
    <>
      <div className="bg-rscc-blue text-white text-center py-2 px-4 text-xs sm:text-sm font-semibold">
        Admissions & training enquiries are open · Rising Star Cricket Club, Sambalpur
      </div>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="rscc-container relative flex h-18 items-center justify-between px-5 lg:px-6">
          <BrandLogo />
          <div className="hidden items-center gap-7 lg:flex">
            {links.map(([href, label]) => (
              <a key={href} href={href} className="text-sm font-semibold text-slate-700 transition hover:text-rscc-blue">{label}</a>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/login" className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100">Member Login</Link>
            <Link to="/register" className="rscc-primary rounded-xl px-4 py-2.5 text-sm font-bold">Join RSCC</Link>
          </div>
          <button className="rounded-xl border border-slate-200 p-2 lg:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
            {open ? <X size={21}/> : <Menu size={21}/>}
          </button>
        </nav>
        {open && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-slate-700 hover:bg-slate-50">{label}</a>)}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setOpen(false)} className="rscc-outline rounded-xl px-4 py-3 text-center text-sm font-bold">Member Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="rscc-primary rounded-xl px-4 py-3 text-center text-sm font-bold">Join RSCC</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
