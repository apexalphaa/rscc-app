import { Bell, CalendarDays, ChevronRight, Home, Menu, Search, UserRound, Users, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const items = [
  ["/dashboard", "Dashboard", Home], ["/players", "Players", UserRound], ["/attendance", "Attendance", CalendarDays],
  ["/matches", "Matches", ChevronRight], ["/teams", "Teams", UserRound], ["/events", "Events", CalendarDays], ["/announcements", "Announcements", Bell], ["/equipment", "Equipment", Users], ["/notifications", "Notifications", Bell],
];
const future = [
  ["/tournaments", "Tournaments"],
  ["/live-scoring", "Live Scoring"],
  ["/statistics", "Statistics"],
  ["/offline-scoring", "Offline Scoring"],
  ["/analytics", "Advanced Analytics"],
];

function Nav({ close }) {
  return <nav className="space-y-1">{items.map(([to, label, Icon]) => <NavLink key={to} to={to} onClick={close} className={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-white text-slate-950 shadow-sm" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}><Icon size={18}/>{label}</NavLink>)}<p className="px-3 pt-5 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">Advanced modules</p>{future.map(([to,label]) => <NavLink key={to} to={to} onClick={close} className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/10"><span>{label}</span><span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wide">Soon</span></NavLink>)}<NavLink to="/settings" onClick={close} className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10">Settings</NavLink></nav>
}

export function AppShell({ children, title, eyebrow }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return <div className="min-h-screen bg-[#f7f8f6] text-slate-900"><aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#101b2a] p-5 lg:flex"><Link to="/" className="mb-9 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-lime-400 font-black text-slate-950">R</span><span><strong className="block text-lg tracking-tight text-white">RSCC</strong><small className="text-slate-400">Rising Star Cricket Club</small></span></Link><Nav/><div className="mt-auto rounded-2xl bg-white/10 p-4 text-xs text-slate-300">Need help?<br/><b className="mt-1 block text-white">hello@rscc.academy</b></div></aside>
    {open && <div className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" onClick={() => setOpen(false)}/>}<aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#101b2a] p-5 transition-transform lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}><button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute right-4 top-4 text-white"><X/></button><Link to="/" className="mb-9 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-lime-400 font-black">R</span><span className="text-white"><strong className="block">RSCC</strong><small className="text-slate-400">Rising Star Cricket Club</small></span></Link><Nav close={() => setOpen(false)}/></aside>
    <div className="lg:pl-64"><header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-[#f7f8f6]/90 px-4 backdrop-blur sm:px-7"><button aria-label="Open menu" className="rounded-lg p-2 hover:bg-white lg:hidden" onClick={() => setOpen(true)}><Menu/></button><div className="hidden max-w-sm flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 md:flex"><Search size={16}/> Search players, matches...</div><div className="flex items-center gap-3"><button aria-label="Notifications" className="relative rounded-xl bg-white p-2.5 shadow-sm"><Bell size={18}/><i className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-lime-500"/></button><Link to="/profile" className="flex items-center gap-2 rounded-xl bg-white p-1.5 pr-3 shadow-sm"><span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-xs font-bold text-lime-300">AK</span><span className="hidden text-sm font-semibold sm:block">Aarav Kumar</span></Link></div></header><main className="mx-auto max-w-7xl px-4 py-7 sm:px-7 sm:py-9"><div className="mb-7"><p className="text-xs font-bold uppercase tracking-[.16em] text-lime-700">{eyebrow || "RSCC Academy"}</p><h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{title}</h1></div>{children}</main></div></div>;
}

export function MobileNav() { const location = useLocation(); return <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t border-slate-200 bg-white px-2 py-2 lg:hidden">{items.slice(0,5).map(([to,label,Icon]) => <Link key={to} to={to} className={`grid place-items-center gap-1 text-[10px] ${location.pathname === to ? "font-bold text-lime-700" : "text-slate-500"}`}><Icon size={18}/>{label}</Link>)}</nav> }
