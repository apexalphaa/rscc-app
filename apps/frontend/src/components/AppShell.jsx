import { Bell, CalendarDays, ClipboardList, Dumbbell, FileText, Home, LogOut, Menu, Settings, ShieldCheck, Trophy, UserRound, Users, WalletCards, X } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import BrandLogo from "./BrandLogo";
import { authService } from "../services/api";

const primary = [["/dashboard", "Dashboard", Home]];
const academy = [
  ["/players", "Players", UserRound, ["admin", "coach"]],
  ["/coaches", "Coaches", Users, ["admin", "coach"]],
  ["/teams", "Teams", ShieldCheck, ["admin", "coach", "player"]],
  ["/attendance", "Attendance", ClipboardList, ["admin", "coach"]],
];
const operations = [
  ["/matches", "Matches", Trophy, ["admin", "coach", "player"]],
  ["/calendar", "Calendar", CalendarDays, ["admin", "coach", "player"]],
  ["/events", "Events", CalendarDays, ["admin", "coach", "player"]],
  ["/announcements", "Announcements", Bell, ["admin", "coach", "player"]],
  ["/notifications", "Notifications", Bell, ["admin", "coach", "player"]],
  ["/equipment", "Equipment", Dumbbell, ["admin", "coach"]],
];
const management = [
  ["/fees", "Fees", WalletCards, ["admin", "coach", "player"]],
  ["/reports", "Reports", FileText, ["admin", "coach"]],
];
const future = [
  ["/tournaments", "Tournaments"],
  ["/live-scoring", "Live Scoring"],
  ["/statistics", "Statistics"],
  ["/offline-scoring", "Offline Scoring"],
  ["/analytics", "Advanced Analytics"],
];

const getRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.role === "viewer" ? "player" : user?.role || "player";
  } catch {
    return "player";
  }
};

function Group({ label, items, close, role }) {
  const visible = items.filter(([, , , roles]) => !roles || roles.includes(role));
  if (!visible.length) return null;
  return (
    <div className="mt-6">
      <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-500">{label}</p>
      <div className="space-y-1">
        {visible.map(([to, title, Icon]) => (
          <NavLink key={to} to={to} onClick={close} className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-white text-rscc-blue shadow-sm" : "text-slate-300 hover:bg-white/10 hover:text-white"}`
          }><Icon size={17}/><span>{title}</span></NavLink>
        ))}
      </div>
    </div>
  );
}

function Nav({ close }) {
  const role = getRole();
  return (
    <div>
      <Group label="Main" items={primary} close={close} role={role}/>
      <Group label="Academy" items={academy} close={close} role={role}/>
      <Group label="Operations" items={operations} close={close} role={role}/>
      <Group label="Management" items={management} close={close} role={role}/>
      <div className="mt-6">
        <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-500">Advanced</p>
        <div className="space-y-1">
          {future.map(([to, title]) => (
            <NavLink key={to} to={to} onClick={close} className={({isActive}) =>
              `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive ? "bg-white text-rscc-blue" : "text-slate-400 hover:bg-white/10 hover:text-white"}`
            }><span>{title}</span><span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide">Coming soon</span></NavLink>
          ))}
        </div>
      </div>
      <NavLink to="/profile" onClick={close} className="mt-6 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white">
        <UserRound size={17}/>Profile
      </NavLink>
      <NavLink to="/settings" onClick={close} className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white">
        <Settings size={17}/>Settings
      </NavLink>
    </div>
  );
}

function CurrentUser() {
  const stored = useMemo(() => { try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; } }, []);
  const name = stored?.name || stored?.fullName || "RSCC Member";
  const role = stored?.role === "viewer" ? "player" : stored?.role || "member";
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(x => x[0]).join("").toUpperCase() || "R";
  return { name, role, initials };
}

export function AppShell({ children, title, eyebrow }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = CurrentUser();
  const close = () => setOpen(false);

  const logout = async () => {
    try { await authService.logout({ email: JSON.parse(localStorage.getItem("user") || "{}")?.email }); } catch {}
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-slate-950 p-4 lg:flex">
        <div className="mb-5 rounded-2xl bg-white/5 p-2"><BrandLogo dark size="sm"/></div>
        <div className="min-h-0 flex-1 overflow-y-auto pr-1"><Nav/></div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-400">
          <b className="text-white">Rising Star Cricket Club</b><br/>{user.role === "admin" ? "Administrator" : user.role === "coach" ? "Coach workspace" : "Player workspace"}
          <button onClick={logout} className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left font-bold text-slate-300 hover:bg-white/10 hover:text-white"><LogOut size={15}/>Sign out</button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden" onClick={close}/>}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 p-4 transition-transform lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <button aria-label="Close menu" onClick={close} className="absolute right-4 top-4 rounded-lg p-2 text-white hover:bg-white/10"><X/></button>
        <div className="mb-5 rounded-2xl bg-white/5 p-2"><BrandLogo dark size="sm"/></div>
        <div className="overflow-y-auto pr-1"><Nav close={close}/><button onClick={logout} className="mt-5 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"><LogOut size={17}/>Sign out</button></div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7">
          <button aria-label="Open menu" className="rounded-xl border border-slate-200 p-2 lg:hidden" onClick={() => setOpen(true)}><Menu size={20}/></button>
          <div className="hidden items-center gap-2 text-sm text-slate-400 md:flex"><span className="font-bold text-slate-800">RSCC</span><span>/</span><span>{title}</span></div>
          <div className="ml-auto flex items-center gap-2">
            <Link aria-label="Notifications" to="/notifications" className="relative rounded-xl border border-slate-200 bg-white p-2.5 hover:border-rscc-blue">
              <Bell size={18} className="text-slate-700"/><i className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rscc-red"/>
            </Link>
            <Link to="/profile" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 hover:border-rscc-blue">
              <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-blue-50 text-xs font-extrabold text-rscc-blue">{user.initials}</span>
              <span className="hidden max-w-32 truncate text-sm font-bold sm:block">{user.name}</span>
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-7 sm:px-7 sm:py-9">
          <div className="mb-7">
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-rscc-red">{eyebrow || "RSCC Academy"}</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function MobileNav() {
  const location = useLocation();
  const role = getRole();
  const visible = [
    ...primary,
    ...academy.filter(([, , , roles]) => !roles || roles.includes(role)).slice(0, 3),
  ];
  return <nav className="fixed bottom-0 left-0 right-0 z-20 grid grid-cols-4 border-t border-slate-200 bg-white px-2 py-2 lg:hidden">
    {visible.map(([to,label,Icon]) => <Link key={to} to={to} className={`grid place-items-center gap-1 rounded-lg py-1 text-[10px] ${location.pathname === to ? "font-extrabold text-rscc-blue" : "text-slate-500"}`}><Icon size={18}/>{label}</Link>)}
  </nav>;
}
