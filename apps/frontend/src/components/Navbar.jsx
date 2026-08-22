import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
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
        Admissions & training enquiries are open · <a className="underline underline-offset-2" href="tel:7978671307">Call 79786 71307</a>
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
            <a href="tel:7978671307" className="rounded-xl px-3 py-2.5 text-sm font-bold text-rscc-blue hover:bg-blue-50"><Phone className="mr-1 inline" size={15}/> Enquire</a>
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
              <a href="tel:7978671307" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-rscc-blue"><Phone size={16}/> Call 79786 71307</a>
              <div className="mt-1 grid grid-cols-2 gap-2">
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
