import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Bell, CalendarDays, Check, CircleAlert, Clock3, Eye, EyeOff, MapPin, Plus, Search, Trophy, Users, WalletCards } from "lucide-react";
import { AppShell, MobileNav } from "../components/AppShell";
import Home from "./Home";
import logo from "../assets/rscc-logo.jpg";
import { attendanceService, announcementsService, authService, coachesService, equipmentService, eventsService, feesService, matchesService, notificationsService, playersService, reportsService, teamsService } from "../services/api";

const Card = ({ children, className = "" }) => <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgb(15,23,42,0.035)] ${className}`}>{children}</section>;
const Badge = ({ children, tone = "lime" }) => <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${tone === "slate" ? "bg-slate-100 text-slate-600" : tone === "red" ? "bg-red-50 text-red-700" : "bg-blue-50 text-rscc-blue"}`}>{children}</span>;
const Empty = ({ children }) => <Card className="py-12 text-center text-sm text-slate-500">{children}</Card>;
const Page = ({ title, eyebrow, children }) => <><AppShell title={title} eyebrow={eyebrow}>{children}</AppShell><MobileNav /></>;
const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Date to be confirmed";
const compressAvatar = (file) => new Promise((resolve, reject) => {
  if (!file) return resolve("");
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      const size = 480;
      const scale = Math.min(1, size / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = reject;
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});
const playerName = (player) => player?.fullName || player?.name || "Unnamed player";
const calendarEmoji = (type) => {
  const value = String(type || "").toLowerCase();
  if (value.includes("match")) return "🏏";
  if (value.includes("training") || value.includes("practice")) return "🏃";
  if (value.includes("fitness")) return "💪";
  if (value.includes("meeting")) return "👥";
  if (value.includes("holiday")) return "🌴";
  if (value.includes("trial")) return "🎯";
  if (value.includes("tournament")) return "🏆";
  return "📅";
};

function useLoad(loader, dependencies = []) {
  const [state, setState] = useState({ loading: true, error: "", data: null });
  useEffect(() => { let active = true; setState({ loading: true, error: "", data: null }); loader().then(data => active && setState({ loading: false, error: "", data })).catch(error => active && setState({ loading: false, error: error?.response?.data?.message || "Unable to load data", data: null })); return () => { active = false; }; }, dependencies);
  return state;
}

export function Landing() { return <Home />; }

export function Dashboard() {
  const storedUser = (() => { try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; } })();
  const role = storedUser?.role === "viewer" ? "player" : storedUser?.role || "player";
  const { loading, error, data } = useLoad(async () => {
    const [matches, user] = await Promise.all([
      matchesService.list(),
      authService.me().catch(() => ({ data: { user: storedUser } })),
    ]);
    const base = { matches: matches.data.matches || [], user: user.data.user || storedUser };
    if (role === "player") {
      const fees = await feesService.mine().catch(() => ({ data: { fees: [] } }));
      return { ...base, fees: fees.data.fees || [] };
    }
    const [players, teams] = await Promise.all([playersService.list(), teamsService.list()]);
    return { ...base, players: players.data.players || [], teams: teams.data.teams || [] };
  }, [role]);

  const name = data?.user?.name || storedUser?.name || "RSCC Member";
  const cards = role === "player"
    ? [
        ["Upcoming matches", data?.matches?.length || 0, Trophy],
        ["My fees", data?.fees?.length || 0, WalletCards],
        ["Notifications", "View", Bell],
      ]
    : [
        ["Players", data?.players?.length || 0, Users],
        ["Teams", data?.teams?.length || 0, Users],
        ["Matches", data?.matches?.length || 0, Trophy],
      ];

  const quickActions = role === "admin"
    ? [["Register player", "/players"], ["Add coach", "/coaches"], ["Mark attendance", "/attendance"], ["Record fee", "/fees"]]
    : role === "coach"
      ? [["Register player", "/players"], ["Mark attendance", "/attendance"], ["Schedule match", "/matches"], ["View reports", "/reports"]]
      : [["My fees", "/fees"], ["My fixtures", "/matches"], ["Academy calendar", "/calendar"], ["Notifications", "/notifications"]];

  return <Page title={`Welcome, ${name}.`} eyebrow={role === "admin" ? "Administrator dashboard" : role === "coach" ? "Coach dashboard" : "Player dashboard"}>
    <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
      <p className="text-sm font-bold text-rscc-blue">RSCC {role === "admin" ? "Administrator" : role === "coach" ? "Coach" : "Player"} workspace</p>
      <p className="mt-1 text-sm text-slate-600">{role === "player" ? "Your fixtures, fees, events and academy updates are available here." : "Manage the academy from one connected workspace."}</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map(([label, value, Icon], index) => <Card key={label}><Icon className="text-rscc-blue" size={20}/><p className="mt-5 text-3xl font-black">{loading ? "—" : value}</p><p className="text-sm text-slate-500">{label}</p>{role === "player" && index === 1 && <Link to="/fees" className="mt-3 inline-block text-xs font-bold text-rscc-blue">Open fees →</Link>}{role === "player" && index === 2 && <Link to="/notifications" className="mt-3 inline-block text-xs font-bold text-rscc-blue">Open notifications →</Link>}</Card>)}
    </div>

    {error && <p className="mt-5 text-sm text-red-700">{error}</p>}

    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <Card>
        <h2 className="font-black">Quick actions</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {quickActions.map(([label, to]) => <Link key={to} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold hover:bg-blue-50" to={to}>{label}<Plus size={16}/></Link>)}
        </div>
      </Card>
      <Card>
        <h2 className="font-black">{role === "player" ? "Upcoming fixtures" : "Upcoming fixtures"}</h2>
        <div className="mt-4 space-y-3">{data?.matches?.slice(0, 3).map(match => <MatchRow key={match._id} match={match}/>) || <p className="text-sm text-slate-500">No fixtures available.</p>}</div>
      </Card>
    </div>
  </Page>;
}

function PlayerForm({ onSaved, onCancel }) { const [form, setForm] = useState({ fullName: "", age: "", role: "Batsman", category: "U12", gender: "Male", jerseyNumber: "" }); const [error, setError] = useState(""); const submit = async event => { event.preventDefault(); try { await playersService.create({ ...form, age: form.age ? Number(form.age) : undefined, jerseyNumber: form.jerseyNumber ? Number(form.jerseyNumber) : undefined }); onSaved(); } catch (e) { setError(e?.response?.data?.message || "Could not create player"); } }; return <Card className="mb-5"><form onSubmit={submit} className="grid gap-3 sm:grid-cols-2"><input required placeholder="Full name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} className="rounded-xl border p-3"/><input type="number" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} className="rounded-xl border p-3"/><select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="rounded-xl border p-3">{["Batsman", "Bowler", "All Rounder", "Wicket Keeper"].map(x => <option key={x}>{x}</option>)}</select><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="rounded-xl border p-3">{["U12", "U14", "U16", "U19", "Senior"].map(x => <option key={x}>{x}</option>)}</select><input type="number" placeholder="Jersey number" value={form.jerseyNumber} onChange={e => setForm({ ...form, jerseyNumber: e.target.value })} className="rounded-xl border p-3"/><div className="sm:col-span-2 flex gap-3"><button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Save player</button><button type="button" onClick={onCancel} className="rounded-xl border px-4 py-3 text-sm font-bold">Cancel</button>{error && <span className="self-center text-sm text-red-700">{error}</span>}</div></form></Card>; }

export function Players() {
  const stored = (() => { try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; } })();
  const canApprove = ["admin", "coach"].includes(stored?.role);
  const [refresh, setRefresh] = useState(0);
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const { loading, error, data } = useLoad(() => playersService.list().then(r => r.data.players), [refresh]);
  const pending = useLoad(() => canApprove ? authService.pendingMembers().then(r => r.data.users) : Promise.resolve([]), [refresh, canApprove]);

  const filtered = useMemo(
    () => (data || []).filter(p => `${playerName(p)} ${p.role || ""} ${p.category || ""}`.toLowerCase().includes(query.toLowerCase())),
    [data, query]
  );
  const categories = ["U12", "U14", "U16", "U19", "Senior"];

  const approve = async (id, name) => {
    try { await authService.approveMember(id); setMessage(`${name} has been approved and their player profile is now active.`); setRefresh(x => x + 1); }
    catch (e) { setMessage(e?.response?.data?.message || "Unable to approve this request."); }
  };
  const reject = async (id, name) => {
    try { await authService.rejectMember(id); setMessage(`${name}'s membership request was rejected.`); setRefresh(x => x + 1); }
    catch (e) { setMessage(e?.response?.data?.message || "Unable to reject this request."); }
  };

  return <Page title="Players" eyebrow="Player management">
    {canApprove && <Card className="mb-5 border-amber-200 bg-amber-50/60">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">Approval queue</p>
          <h2 className="mt-1 text-lg font-black">Pending player memberships</h2>
          <p className="mt-1 text-sm text-slate-600">Review the complete player information submitted during registration. Approval activates the existing player record.</p>
        </div>
        <Badge tone="slate">{pending.data?.length || 0} pending</Badge>
      </div>

      {pending.loading ? <p className="mt-4 text-sm text-slate-500">Loading requests…</p> :
        pending.error ? <p className="mt-4 text-sm text-red-700">{pending.error}</p> :
        <div className="mt-4 space-y-3">
          {(pending.data || []).map(u => {
            const p = u.player || {};
            return <div key={u._id || u.id} className="rounded-2xl border border-amber-100 bg-white p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="font-black">{p.fullName || u.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{u.email}{u.phone ? ` · ${u.phone}` : ""}</p>
                  <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:grid-cols-4">
                    <span><small className="block text-slate-400">Age</small><b>{p.age || "—"}</b></span>
                    <span><small className="block text-slate-400">Category</small><b>{p.category || "—"}</b></span>
                    <span><small className="block text-slate-400">Playing role</small><b>{p.role || "—"}</b></span>
                    <span><small className="block text-slate-400">Jersey</small><b>#{p.jerseyNumber || "—"}</b></span>
                    <span><small className="block text-slate-400">Gender</small><b>{p.gender || "—"}</b></span>
                    <span><small className="block text-slate-400">Batting</small><b>{p.battingStyle || "—"}</b></span>
                    <span><small className="block text-slate-400">Parent</small><b>{p.parentName || "—"}</b></span>
                    <span><small className="block text-slate-400">Parent phone</small><b>{p.parentPhone || "—"}</b></span>
                  </div>
                  {p.address && <p className="mt-3 text-xs text-slate-500">Address: {p.address}</p>}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => approve(u._id || u.id, u.name)} className="rounded-xl bg-rscc-blue px-4 py-2.5 text-xs font-bold text-white">Approve</button>
                  <button onClick={() => reject(u._id || u.id, u.name)} className="rounded-xl border border-red-200 px-4 py-2.5 text-xs font-bold text-red-700">Reject</button>
                </div>
              </div>
            </div>;
          })}
          {!pending.data?.length && <p className="text-sm text-slate-500">No pending player approvals.</p>}
        </div>}
      {message && <p className="mt-3 text-sm font-semibold text-slate-700">{message}</p>}
    </Card>}

    <div className="mb-5 flex gap-3">
      <label className="flex flex-1 items-center gap-2 rounded-xl border bg-white px-3">
        <Search size={17} className="text-slate-400"/>
        <input className="w-full py-3 outline-none" placeholder="Search player, role, or age group" value={query} onChange={e => setQuery(e.target.value)}/>
      </label>
      {canApprove && <button onClick={() => setAdding(!adding)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{adding ? "Close" : "+ Register player"}</button>}
    </div>

    {adding && <PlayerForm onCancel={() => setAdding(false)} onSaved={() => { setAdding(false); setRefresh(x => x + 1); }}/>}
    {error && <Empty>{error}. Sign in as an administrator or coach to manage players.</Empty>}
    {loading ? <Empty>Loading players…</Empty> : !error && <div className="space-y-8">
      {categories.map(category => {
        const group = filtered.filter(p => (p.category || "U12") === category);
        return <section key={category}>
          <div className="mb-3 flex items-center gap-3"><h2 className="text-lg font-black">{category === "Senior" ? "Senior Players" : `${category} Players`}</h2><Badge tone="slate">{group.length}</Badge></div>
          {group.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{group.map(p => <Link key={p._id} to={`/players/${p._id}`}><Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md"><h3 className="font-black">{playerName(p)}</h3><p className="mt-1 text-sm text-slate-500">{p.role || "Player"} · #{p.jerseyNumber || "—"}</p><div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-sm"><span><small className="block text-slate-400">Age</small>{p.age || "—"}</span><span><small className="block text-slate-400">Runs</small>{p.career?.runs || 0}</span></div></Card></Link>)}</div>
          : <p className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">No {category} players yet.</p>}
        </section>;
      })}
    </div>}
    {!loading && !error && !filtered.length && <Empty>No players found.</Empty>}
  </Page>;
}

export function PlayerProfile() {
  const { id } = useParams();
  const { loading, error, data: player } = useLoad(() => playersService.get(id).then(r => r.data.player), [id]);
  if (loading) return <Page title="Player" eyebrow="Player profile"><Empty>Loading player…</Empty></Page>;
  if (error) return <Page title="Player" eyebrow="Player profile"><Empty>{error}</Empty></Page>;
  return <Page title={playerName(player)} eyebrow="Player profile">
    <Card className="max-w-3xl">
      <div className="flex items-center gap-4">
        <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-blue-50 text-xl font-black text-rscc-blue">
          {player.user?.avatar ? <img src={player.user.avatar} alt="" className="h-full w-full object-cover"/> : playerName(player).slice(0,2).toUpperCase()}
        </div>
        <div><h2 className="text-xl font-black">{playerName(player)}</h2><p className="mt-1 text-sm text-slate-500">{player.role || "Player"} · #{player.jerseyNumber || "—"}</p></div>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-5 text-sm sm:grid-cols-4">{[["Age", player.age], ["Category", player.category], ["Batting", player.battingStyle], ["Bowling", player.bowlingStyle], ["Runs", player.career?.runs || 0], ["Wickets", player.career?.wickets || 0]].map(([label, value]) => <span key={label}><small className="block text-slate-400">{label}</small><b>{value || "—"}</b></span>)}</div>
    </Card>
  </Page>;
}

export function Attendance() { const today = new Date().toISOString().slice(0, 10); const [date, setDate] = useState(today); const [statuses, setStatuses] = useState({}); const [message, setMessage] = useState(""); const { loading, error, data: players } = useLoad(() => playersService.list().then(r => r.data.players), []); useEffect(() => { attendanceService.getByDate(date).then(r => setStatuses(Object.fromEntries((r.data.attendance?.entries || []).map(x => [x.player?._id || x.player, x.status])))).catch(() => setStatuses({})); }, [date]); const save = async () => { try { await attendanceService.save({ sessionDate: date, sessionName: "Training session", entries: players.map(p => ({ player: p._id, status: statuses[p._id] || "Present" })) }); setMessage("Attendance saved."); } catch (e) { setMessage(e?.response?.data?.message || "Unable to save attendance. You need coach or admin access."); } }; return <Page title="Attendance" eyebrow="Daily training"><Card><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-black">Training session</h2><p className="text-sm text-slate-500">Record attendance for every registered player.</p></div><input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-xl border px-3 py-2"/></div>{loading ? <p>Loading players…</p> : error ? <p className="text-red-700">{error}</p> : <div className="overflow-x-auto"><table className="w-full min-w-[550px] text-left text-sm"><thead className="border-y text-xs uppercase text-slate-400"><tr><th className="py-3">Player</th><th>Role</th><th className="text-right">Status</th></tr></thead><tbody>{players.map(p => <tr key={p._id} className="border-b"><td className="py-3 font-bold">{playerName(p)}</td><td className="text-slate-500">{p.role || "—"}</td><td className="text-right"><select value={statuses[p._id] || "Present"} onChange={e => setStatuses({ ...statuses, [p._id]: e.target.value })} className="rounded-lg border bg-white px-2 py-1.5"><option>Present</option><option>Late</option><option>Absent</option></select></td></tr>)}</tbody></table></div>}<div className="mt-5 flex items-center gap-3"><button onClick={save} disabled={loading || !!error} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Save attendance</button>{message && <span className="text-sm text-slate-600">{message}</span>}</div></Card></Page>; }

const matchTitle = match => `${match.teams?.home?.name || "Home team"} vs ${match.teams?.away?.name || "Away team"}`;
function MatchRow({ match }) { return <Link to={`/matches/${match._id}`} className="block rounded-xl bg-slate-50 p-3 hover:bg-blue-50"><b className="block text-sm">{matchTitle(match)}</b><small className="text-slate-500">{formatDate(match.details?.matchDate)} · {match.details?.ground || match.details?.venue || "Venue TBC"}</small></Link>; }
function MatchForm({ teams, onSaved, onCancel }) { const [form, setForm] = useState({ home: "", away: "", matchType: "Friendly", ground: "", overs: 20, matchDate: "" }); const [error, setError] = useState(""); const save = async event => { event.preventDefault(); try { await matchesService.create({ matchType: form.matchType, teams: { home: form.home, away: form.away }, details: { ground: form.ground, overs: Number(form.overs), matchDate: form.matchDate || undefined }, status: "Ready" }); onSaved(); } catch (e) { setError(e?.response?.data?.message || "Could not create match"); } }; return <Card className="mb-5"><form onSubmit={save} className="grid gap-3 sm:grid-cols-2"><select required value={form.home} onChange={e => setForm({ ...form, home: e.target.value })} className="rounded-xl border p-3"><option value="">Home team</option>{teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}</select><select required value={form.away} onChange={e => setForm({ ...form, away: e.target.value })} className="rounded-xl border p-3"><option value="">Away team</option>{teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}</select><input required placeholder="Ground" value={form.ground} onChange={e => setForm({ ...form, ground: e.target.value })} className="rounded-xl border p-3"/><input type="date" value={form.matchDate} onChange={e => setForm({ ...form, matchDate: e.target.value })} className="rounded-xl border p-3"/><input type="number" min="1" value={form.overs} onChange={e => setForm({ ...form, overs: e.target.value })} className="rounded-xl border p-3"/><select value={form.matchType} onChange={e => setForm({ ...form, matchType: e.target.value })} className="rounded-xl border p-3">{["Friendly", "Practice", "Tournament", "League", "Knockout"].map(x => <option key={x}>{x}</option>)}</select><div className="sm:col-span-2 flex gap-3"><button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Schedule match</button><button type="button" onClick={onCancel} className="rounded-xl border px-4 py-3 text-sm font-bold">Cancel</button>{error && <span className="self-center text-sm text-red-700">{error}</span>}</div></form></Card>; }
export function Matches() { const [refresh, setRefresh] = useState(0); const [creating, setCreating] = useState(false); const { loading, error, data } = useLoad(async () => { const [matches, teams] = await Promise.all([matchesService.list(), teamsService.list()]); return { matches: matches.data.matches, teams: teams.data.teams }; }, [refresh]); return <Page title="Matches" eyebrow="Fixtures & results"><div className="mb-5 flex justify-end"><button onClick={() => setCreating(!creating)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{creating ? "Close" : "+ Schedule match"}</button></div>{creating && <MatchForm teams={data?.teams || []} onCancel={() => setCreating(false)} onSaved={() => { setCreating(false); setRefresh(x => x + 1); }}/>} {loading ? <Empty>Loading fixtures…</Empty> : error ? <Empty>{error}. Sign in as an administrator or coach to manage fixtures.</Empty> : <div className="grid gap-4 lg:grid-cols-2">{data.matches.map(match => <Card key={match._id}><div className="flex justify-between"><Badge tone={match.status === "Completed" ? "slate" : "lime"}>{match.status}</Badge><span className="text-sm text-slate-500">{match.matchType}</span></div><h2 className="mt-5 text-lg font-black">{matchTitle(match)}</h2><p className="mt-3 text-sm text-slate-500"><CalendarDays className="mr-1 inline" size={15}/>{formatDate(match.details?.matchDate)}<br/><MapPin className="mr-1 inline" size={15}/>{match.details?.ground || match.details?.venue || "Venue TBC"} · {match.details?.overs || 20} overs</p><Link to={`/matches/${match._id}`} className="mt-5 inline-flex gap-1 text-sm font-bold text-rscc-blue">Match details <ArrowRight size={15}/></Link></Card>)}</div>}</Page>; }
export function MatchDetails() { const { id } = useParams(); const { loading, error, data: match } = useLoad(() => matchesService.get(id).then(r => r.data.match), [id]); return <Page title="Match details" eyebrow="Fixture"><Card>{loading ? "Loading match…" : error ? error : <><Badge>{match.status}</Badge><h2 className="mt-4 text-2xl font-black">{matchTitle(match)}</h2><p className="mt-3 text-sm text-slate-500">{formatDate(match.details?.matchDate)} · {match.details?.ground || "Venue TBC"} · {match.details?.overs || 20} overs</p><p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Live scoring is the next module to connect to this saved fixture.</p></>}</Card></Page>; }

export function Teams() {
  const stored=(()=>{try{return JSON.parse(localStorage.getItem("user")||"null")}catch{return null}})();
  const canManage=["admin","coach"].includes(stored?.role);
  const [refresh,setRefresh]=useState(0),[adding,setAdding]=useState(false),[editing,setEditing]=useState(null),[message,setMessage]=useState("");
  const empty={name:"",shortName:"",category:"U14",logo:""}; const [form,setForm]=useState(empty);
  const {loading,error,data}=useLoad(()=>teamsService.list().then(r=>r.data.teams),[refresh]);
  const submit=async e=>{e.preventDefault();try{if(editing)await teamsService.update(editing,form);else await teamsService.create(form);setForm(empty);setEditing(null);setAdding(false);setRefresh(x=>x+1);setMessage("Team saved.")}catch(err){setMessage(err?.response?.data?.message||"Unable to save team.")}};
  const remove=async id=>{if(!confirm("Delete this team?"))return;try{await teamsService.remove(id);setRefresh(x=>x+1)}catch(err){setMessage(err?.response?.data?.message||"Unable to delete team.")}};
  return <Page title="Teams" eyebrow="Squads & academy groups">
    {canManage&&<div className="mb-5 flex justify-end"><button onClick={()=>setAdding(v=>!v)} className="rounded-xl bg-rscc-blue px-4 py-3 text-sm font-bold text-white">{adding?"Close":"+ Create team"}</button></div>}
    {adding&&<Card className="mb-5"><form onSubmit={submit} className="grid gap-3 sm:grid-cols-2"><input required placeholder="Team name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="rounded-xl border p-3"/><input required placeholder="Short name" value={form.shortName} onChange={e=>setForm({...form,shortName:e.target.value})} className="rounded-xl border p-3"/><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="rounded-xl border p-3"><option>U14</option><option>U16</option><option>U19</option><option>Senior</option><option>Visitor</option></select><input placeholder="Logo URL (optional)" value={form.logo} onChange={e=>setForm({...form,logo:e.target.value})} className="rounded-xl border p-3"/><button className="rounded-xl bg-rscc-red px-4 py-3 text-sm font-bold text-white sm:col-span-2">{editing?"Update team":"Create team"}</button></form>{message&&<p className="mt-3 text-sm">{message}</p>}</Card>}
    {loading?<Empty>Loading teams…</Empty>:error?<Empty>{error}</Empty>:<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{(data||[]).map(team=><Card key={team._id}>{team.logo&&<img src={team.logo} alt="" className="mb-4 h-14 w-14 rounded-xl object-cover"/>}<Badge tone="slate">{team.category}</Badge><h2 className="mt-4 text-xl font-black">{team.name}</h2><p className="mt-2 text-sm text-slate-500">{team.shortName} · {team.players?.length||0} players · {team.coaches?.length||0} coaches</p>{canManage&&<div className="mt-4 flex gap-2"><button onClick={()=>{setEditing(team._id);setForm({name:team.name,shortName:team.shortName,category:team.category,logo:team.logo||""});setAdding(true)}} className="rounded-lg border px-3 py-2 text-xs font-bold">Edit</button>{stored?.role==="admin"&&<button onClick={()=>remove(team._id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700">Delete</button>}</div>}</Card>)}</div>}
  </Page>;
}

export function Events() {
  const role=(()=>{try{return JSON.parse(localStorage.getItem("user")||"null")?.role}catch{return null}})(), canManage=["admin","coach"].includes(role);
  const [refresh,setRefresh]=useState(0),[adding,setAdding]=useState(false),[editing,setEditing]=useState(null),[message,setMessage]=useState("");
  const empty={title:"",date:"",time:"",type:"Academy event",place:"",description:""};const [form,setForm]=useState(empty);
  const {loading,error,data}=useLoad(()=>eventsService.list().then(r=>r.data.events),[refresh]);
  const save=async e=>{e.preventDefault();try{if(editing)await eventsService.update(editing,form);else await eventsService.create(form);setForm(empty);setEditing(null);setAdding(false);setRefresh(x=>x+1);setMessage("Event saved.")}catch(err){setMessage(err?.response?.data?.message||"Unable to save event.")}};
  const remove=async id=>{if(!confirm("Delete this event?"))return;await eventsService.remove(id);setRefresh(x=>x+1)};
  return <Page title="Events" eyebrow="Academy events"><div className="mb-5 flex justify-end">{canManage&&<button onClick={()=>setAdding(v=>!v)} className="rounded-xl bg-rscc-blue px-4 py-3 text-sm font-bold text-white">{adding?"Close":"+ New event"}</button>}</div>{adding&&<Card className="mb-5"><form onSubmit={save} className="grid gap-3 sm:grid-cols-2"><input required placeholder="Event title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="rounded-xl border p-3"/><input required type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="rounded-xl border p-3"/><input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} className="rounded-xl border p-3"/><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="rounded-xl border p-3"><option>Academy event</option><option>Training</option><option>Meeting</option><option>Trial</option><option>Holiday</option></select><input placeholder="Location" value={form.place} onChange={e=>setForm({...form,place:e.target.value})} className="rounded-xl border p-3"/><textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="rounded-xl border p-3 sm:col-span-2"/><button className="rounded-xl bg-rscc-blue py-3 font-bold text-white sm:col-span-2">{editing?"Update event":"Create event"}</button></form>{message&&<p className="mt-3 text-sm">{message}</p>}</Card>}{loading?<Empty>Loading events…</Empty>:error?<Empty>{error}</Empty>:<div className="grid gap-4 lg:grid-cols-3">{(data||[]).map(event=><Card key={event._id}><Badge tone="slate">{event.type}</Badge><h2 className="mt-4 font-black">{event.title}</h2><p className="mt-2 text-sm text-slate-500">{formatDate(event.date)} {event.time&&`· ${event.time}`}<br/>{event.place||"Location TBC"}</p>{event.description&&<p className="mt-3 text-sm text-slate-600">{event.description}</p>}{canManage&&<div className="mt-4 flex gap-2"><button onClick={()=>{setEditing(event._id);setForm({title:event.title,date:event.date?.slice(0,10)||"",time:event.time||"",type:event.type||"Academy event",place:event.place||"",description:event.description||""});setAdding(true)}} className="rounded-lg border px-3 py-2 text-xs font-bold">Edit</button><button onClick={()=>remove(event._id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700">Delete</button></div>}</Card>)}</div>}</Page>;
}

export function Announcements() {
  const role=(()=>{try{return JSON.parse(localStorage.getItem("user")||"null")?.role}catch{return null}})(), canManage=["admin","coach"].includes(role);
  const [refresh,setRefresh]=useState(0),[adding,setAdding]=useState(false),[editing,setEditing]=useState(null),[message,setMessage]=useState("");
  const empty={title:"",category:"General",body:""};const [form,setForm]=useState(empty);
  const {loading,error,data}=useLoad(()=>announcementsService.list().then(r=>r.data.announcements),[refresh]);
  const save=async e=>{e.preventDefault();try{if(editing)await announcementsService.update(editing,form);else await announcementsService.create(form);setForm(empty);setEditing(null);setAdding(false);setRefresh(x=>x+1);setMessage("Announcement saved.")}catch(err){setMessage(err?.response?.data?.message||"Unable to save announcement.")}};
  const remove=async id=>{if(!confirm("Delete this announcement?"))return;await announcementsService.remove(id);setRefresh(x=>x+1)};
  return <Page title="Announcements" eyebrow="Academy communication"><div className="mb-5 flex justify-end">{canManage&&<button onClick={()=>setAdding(v=>!v)} className="rounded-xl bg-rscc-blue px-4 py-3 text-sm font-bold text-white">{adding?"Close":"+ New announcement"}</button>}</div>{adding&&<Card className="mb-5"><form onSubmit={save} className="space-y-3"><input required placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full rounded-xl border p-3"/><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full rounded-xl border p-3"><option>General</option><option>Important</option><option>Training</option><option>Match</option><option>Fees</option></select><textarea required placeholder="Announcement message" value={form.body} onChange={e=>setForm({...form,body:e.target.value})} className="min-h-32 w-full rounded-xl border p-3"/><button className="rounded-xl bg-rscc-blue px-4 py-3 font-bold text-white">{editing?"Update":"Publish announcement"}</button></form>{message&&<p className="mt-3 text-sm">{message}</p>}</Card>}{loading?<Empty>Loading announcements…</Empty>:error?<Empty>{error}</Empty>:<div className="grid gap-4 lg:grid-cols-2">{(data||[]).map(item=><Card key={item._id}><div className="flex justify-between gap-3"><Badge tone={item.category==="Important"?"red":"slate"}>{item.category}</Badge><small className="text-slate-400">{formatDate(item.createdAt)}</small></div><h2 className="mt-4 font-black">{item.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>{canManage&&<div className="mt-4 flex gap-2"><button onClick={()=>{setEditing(item._id);setForm({title:item.title,category:item.category||"General",body:item.body});setAdding(true)}} className="rounded-lg border px-3 py-2 text-xs font-bold">Edit</button><button onClick={()=>remove(item._id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700">Delete</button></div>}</Card>)}</div>}</Page>;
}

export function FutureModule({ type }) {
  const descriptions = {
    Tournaments: "Tournament management is currently under development.",
    "Live Scoring": "Live cricket scoring is currently under development.",
    Statistics: "Cricket statistics are currently under development.",
    "Offline Scoring": "Offline scoring is currently under development.",
    "Advanced Analytics": "Advanced analytics are currently under development.",
  };
  return <Page title={type} eyebrow="Advanced module">
    <Card className="min-h-[420px] flex flex-col items-center justify-center text-center">
      <Badge>Coming soon</Badge>
      <h2 className="mt-7 text-5xl font-black tracking-tight text-slate-950 sm:text-7xl">COMING SOON</h2>
      <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">{descriptions[type]}</p>
      <Link to="/dashboard" className="mt-8 rounded-xl bg-rscc-blue px-5 py-3 text-sm font-bold text-white hover:bg-rscc-blue-dark">Back to Dashboard</Link>
    </Card>
  </Page>;
}

export function Profile() {
  const { loading, error, data: loadedUser } = useLoad(() => authService.me().then(r => r.data.user), []);
  const [user, setUser] = useState(null);
  const [photoMessage, setPhotoMessage] = useState("");
  useEffect(() => { if (loadedUser) setUser(loadedUser); }, [loadedUser]);

  const player = user?.player;

  const uploadPhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoMessage("Please choose an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setPhotoMessage("Please choose an image smaller than 8 MB.");
      return;
    }
    try {
      setPhotoMessage("Saving photo…");
      const avatar = await compressAvatar(file);
      const response = await authService.updateMe({ avatar });
      setUser(current => ({ ...current, avatar: response.data.user.avatar || avatar }));
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...stored, avatar: response.data.user.avatar || avatar }));
      setPhotoMessage("Profile photo updated. Admins and coaches can now see it.");
    } catch (err) {
      setPhotoMessage(err?.response?.data?.message || "Unable to save profile photo.");
    } finally {
      event.target.value = "";
    }
  };

  return <Page title="My profile" eyebrow="Account & membership">
    <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
      <Card>
        {loading ? "Loading profile…" : error ? <><p>{error}</p><Link className="mt-4 inline-block font-bold text-rscc-blue" to="/login">Sign in</Link></> :
        <div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative h-28 w-28 shrink-0">
              <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-2xl bg-blue-50 text-2xl font-black text-rscc-blue">
                {user?.avatar ? <img src={user.avatar} alt={`${user.name || "Player"} profile`} className="h-full w-full object-cover"/> : (user?.name || "U").slice(0, 2).toUpperCase()}
              </div>
              <label className="absolute -bottom-2 -right-2 cursor-pointer rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-white shadow-lg">
                Add photo
                <input type="file" accept="image/*" className="hidden" onChange={uploadPhoto}/>
              </label>
            </div>
            <div><h2 className="text-2xl font-black">{user?.name}</h2><p className="mt-1 text-sm text-slate-500">{user?.email}</p><div className="mt-2 flex gap-2"><Badge tone="slate">{user?.role === "admin" ? "Administrator" : user?.role === "coach" ? "Coach" : "Player"}</Badge><Badge tone={user?.status === "active" ? "blue" : "red"}>{user?.status}</Badge></div>{photoMessage&&<p className="mt-3 text-xs font-semibold text-slate-600">{photoMessage}</p>}</div>
          </div>
          <div className="mt-7 grid gap-5 border-t pt-6 sm:grid-cols-2">
            <div><small className="text-slate-400">Academy</small><p className="mt-1 font-bold">{user?.academy || "Rising Star Cricket Club"}</p></div>
            <div><small className="text-slate-400">Phone</small><p className="mt-1 font-bold">{user?.phone || "Not added"}</p></div>
            {player && <>
              <div><small className="text-slate-400">Age group</small><p className="mt-1 font-bold">{player.category || "—"}</p></div>
              <div><small className="text-slate-400">Playing role</small><p className="mt-1 font-bold">{player.role || "—"}</p></div>
              <div><small className="text-slate-400">Jersey number</small><p className="mt-1 font-bold">#{player.jerseyNumber || "—"}</p></div>
              <div><small className="text-slate-400">Player status</small><p className="mt-1 font-bold">{player.academyStatus || "—"}</p></div>
              <div><small className="text-slate-400">Batting style</small><p className="mt-1 font-bold">{player.battingStyle || "—"}</p></div>
              <div><small className="text-slate-400">Bowling style</small><p className="mt-1 font-bold">{player.bowlingStyle || "—"}</p></div>
            </>}
          </div>
          <Link to="/settings" className="mt-7 inline-block rounded-xl bg-rscc-blue px-4 py-3 text-sm font-bold text-white">Edit profile & settings</Link>
        </div>}
      </Card>

      <Card>
        <h2 className="font-black">Profile visibility</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Your profile photo and academy details are visible to RSCC administrators and coaches. Public member-to-member profile viewing will be enabled in a later module.</p>
        <div className="mt-4 space-y-3 text-sm">
          <Link to="/settings" className="flex items-center justify-between rounded-xl bg-slate-50 p-4 font-bold">Profile details <ArrowRight size={16}/></Link>
          <Link to="/settings" className="flex items-center justify-between rounded-xl bg-slate-50 p-4 font-bold">Notification preferences <ArrowRight size={16}/></Link>
          <Link to="/forgot-password" className="flex items-center justify-between rounded-xl bg-slate-50 p-4 font-bold">Change password <ArrowRight size={16}/></Link>
        </div>
      </Card>
    </div>
  </Page>;
}
export function Equipment() {
  const stored=(()=>{try{return JSON.parse(localStorage.getItem("user")||"null")}catch{return null}})(), canManage=["admin","coach"].includes(stored?.role);
  const [refresh,setRefresh]=useState(0),[adding,setAdding]=useState(false),[editing,setEditing]=useState(null),[message,setMessage]=useState("");
  const empty={name:"",category:"Cricket",quantity:1,available:1,condition:"Good",status:"Available",assignedTo:"",location:"",purchaseDate:"",purchasePrice:"",notes:""}; const [form,setForm]=useState(empty);
  const {loading,error,data}=useLoad(()=>equipmentService.list().then(r=>r.data.equipment),[refresh]);
  const save=async e=>{e.preventDefault();try{const payload={...form,quantity:Number(form.quantity),available:Number(form.available),purchasePrice:Number(form.purchasePrice||0)};if(editing)await equipmentService.update(editing,payload);else await equipmentService.create(payload);setForm(empty);setEditing(null);setAdding(false);setRefresh(x=>x+1);setMessage("Equipment saved.")}catch(err){setMessage(err?.response?.data?.message||"Unable to save equipment.")}};
  const remove=async id=>{if(!confirm("Delete this equipment record?"))return;await equipmentService.remove(id);setRefresh(x=>x+1)};
  const issue=async item=>{const assignedTo=window.prompt("Assign to (player/coach name):",item.assignedTo||"");if(!assignedTo)return;const quantity=window.prompt("How many units?", "1");try{await equipmentService.issue(item._id,{assignedTo,quantity:Number(quantity||1)});setMessage("Equipment issued.");setRefresh(x=>x+1)}catch(err){setMessage(err?.response?.data?.message||"Unable to issue equipment.")}};
  const returnItem=async item=>{const quantity=window.prompt("How many units returned?","1");try{await equipmentService.returnItem(item._id,{quantity:Number(quantity||1)});setMessage("Equipment returned.");setRefresh(x=>x+1)}catch(err){setMessage(err?.response?.data?.message||"Unable to return equipment.")}};
  const sendRepair=async item=>{try{await equipmentService.sendToRepair(item._id);setMessage("Equipment moved to repair queue.");setRefresh(x=>x+1)}catch(err){setMessage(err?.response?.data?.message||"Unable to move equipment to repair.")}};
  const completeRepair=async item=>{try{await equipmentService.completeRepair(item._id);setMessage("Repair completed and equipment marked available.");setRefresh(x=>x+1)}catch(err){setMessage(err?.response?.data?.message||"Unable to complete repair.")}};
  const items=data||[], repair=items.filter(x=>x.status==="Under Repair"||x.condition==="Needs repair"), assigned=items.filter(x=>x.status==="Assigned"), available=items.reduce((s,x)=>s+Number(x.available||0),0);
  return <Page title="Equipment" eyebrow="Inventory, assignment & repairs">
    <div className="grid gap-4 sm:grid-cols-4 mb-5"><Card><p className="text-sm text-slate-500">Items</p><b className="mt-2 block text-3xl">{items.length}</b></Card><Card><p className="text-sm text-slate-500">Available units</p><b className="mt-2 block text-3xl">{available}</b></Card><Card><p className="text-sm text-slate-500">Assigned records</p><b className="mt-2 block text-3xl">{assigned.length}</b></Card><Card><p className="text-sm text-slate-500">Repair queue</p><b className="mt-2 block text-3xl text-red-600">{repair.length}</b></Card></div>
    {canManage&&<div className="mb-5 flex justify-end"><button onClick={()=>setAdding(v=>!v)} className="rounded-xl bg-rscc-blue px-4 py-3 text-sm font-bold text-white">{adding?"Close":"+ Add equipment"}</button></div>}
    {adding&&<Card className="mb-5"><form onSubmit={save} className="grid gap-3 sm:grid-cols-2"><input required placeholder="Item name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="rounded-xl border p-3"/><input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="rounded-xl border p-3"/><input required type="number" min="0" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value,available:e.target.value})} className="rounded-xl border p-3"/><input type="number" min="0" placeholder="Available" value={form.available} onChange={e=>setForm({...form,available:e.target.value})} className="rounded-xl border p-3"/><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="rounded-xl border p-3"><option>Available</option><option>Assigned</option><option>Under Repair</option><option>Retired</option></select><select value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})} className="rounded-xl border p-3"><option>Good</option><option>Needs repair</option><option>Retired</option></select><input placeholder="Assigned to" value={form.assignedTo} onChange={e=>setForm({...form,assignedTo:e.target.value})} className="rounded-xl border p-3"/><input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className="rounded-xl border p-3"/><input type="date" value={form.purchaseDate} onChange={e=>setForm({...form,purchaseDate:e.target.value})} className="rounded-xl border p-3"/><input type="number" min="0" placeholder="Purchase price" value={form.purchasePrice} onChange={e=>setForm({...form,purchasePrice:e.target.value})} className="rounded-xl border p-3"/><textarea placeholder="Notes / repair details" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className="rounded-xl border p-3 sm:col-span-2"/><button className="rounded-xl bg-rscc-blue px-4 py-3 font-bold text-white sm:col-span-2">{editing?"Update equipment":"Add equipment"}</button></form>{message&&<p className="mt-3 text-sm">{message}</p>}</Card>}
    {loading?<Empty>Loading equipment…</Empty>:error?<Empty>{error}</Empty>:<div className="grid gap-4 md:grid-cols-2">{items.map(item=><Card key={item._id}><div className="flex justify-between gap-4"><div><Badge tone={item.status==="Under Repair"||item.condition==="Needs repair"?"red":item.status==="Retired"?"slate":"lime"}>{item.status||item.condition}</Badge><h2 className="mt-3 text-lg font-black">{item.name}</h2><p className="text-sm text-slate-500">{item.category} · {item.location||"Location not set"}</p></div><div className="text-right text-sm"><b>{item.available||0}/{item.quantity||0}</b><p className="text-slate-400">available</p></div></div>{(item.assignedTo||item.notes)&&<div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm"><b>{item.assignedTo?"Assigned to: ":""}</b>{item.assignedTo}{item.notes&&<p className="mt-1 text-slate-600">{item.notes}</p>}</div>}{canManage&&<div className="mt-4 flex flex-wrap gap-2">
      <button onClick={()=>{setEditing(item._id);setForm({...empty,...item,purchaseDate:item.purchaseDate?item.purchaseDate.slice(0,10):"",purchasePrice:item.purchasePrice||""});setAdding(true)}} className="rounded-lg border px-3 py-2 text-xs font-bold">Edit</button>
      {item.status!=="Retired"&&item.status!=="Under Repair"&&<button onClick={()=>issue(item)} className="rounded-lg border px-3 py-2 text-xs font-bold">Issue</button>}
      {item.status==="Assigned"&&<button onClick={()=>returnItem(item)} className="rounded-lg border px-3 py-2 text-xs font-bold">Return</button>}
      {item.status!=="Under Repair"&&item.status!=="Retired"&&<button onClick={()=>sendRepair(item)} className="rounded-lg border border-amber-200 px-3 py-2 text-xs font-bold text-amber-700">Send to repair</button>}
      {item.status==="Under Repair"&&<button onClick={()=>completeRepair(item)} className="rounded-lg bg-rscc-blue px-3 py-2 text-xs font-bold text-white">Repair complete</button>}
      {stored?.role==="admin"&&<button onClick={()=>remove(item._id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700">Delete</button>}
    </div>}</Card>)}</div>}
  </Page>;
}

export function Coaches() {
  const stored = (() => { try { return JSON.parse(localStorage.getItem("user")||"null"); } catch { return null; }})();
  const isAdmin = stored?.role === "admin";
  const [refresh,setRefresh]=useState(0), [editing,setEditing]=useState(null), [message,setMessage]=useState("");
  const [form,setForm]=useState({name:"",specialty:"Cricket coach",phone:"",email:"",status:"Active"});
  const {loading,error,data}=useLoad(()=>coachesService.list().then(r=>r.data.coaches),[refresh]);
  const users=useLoad(()=>isAdmin?authService.academyUsers().then(r=>r.data.users):Promise.resolve([]),[refresh,isAdmin]);

  const submit=async e=>{
    e.preventDefault();
    try {
      if(editing) await coachesService.update(editing,form);
      else await coachesService.create(form);
      setEditing(null);
      setForm({name:"",specialty:"Cricket coach",phone:"",email:"",status:"Active"});
      setMessage("Coach saved.");
      setRefresh(x=>x+1);
    } catch(err) { setMessage(err?.response?.data?.message||"Unable to save coach."); }
  };

  const grant=async id=>{
    try { await authService.setRole(id,"coach"); setMessage("Coach access granted."); setRefresh(x=>x+1); }
    catch(err) { setMessage(err?.response?.data?.message||"Unable to grant coach access."); }
  };

  const revoke=async id=>{
    try { await authService.setRole(id,"player"); setMessage("Coach access removed. Player access restored."); setRefresh(x=>x+1); }
    catch(err) { setMessage(err?.response?.data?.message||"Unable to change access."); }
  };

  const remove=async id=>{
    if(!confirm("Delete this coach record?")) return;
    await coachesService.remove(id);
    setRefresh(x=>x+1);
  };

  return <Page title="Coaches" eyebrow="Coaching staff">
    {isAdmin&&<Card className="mb-5 border-rscc-red/20 bg-red-50/30">
      <h2 className="font-black">Coach access</h2>
      <p className="mt-1 text-sm text-slate-500">Only administrators can grant or remove coach permissions. Membership approval is handled in the Players section.</p>
      <div className="mt-4 space-y-2">
        {(users.data||[]).filter(u=>u.role==="player" && u.status==="active").map(u=>
          <div key={u.id || u._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-3">
            <div><b>{u.name}</b><p className="text-xs text-slate-500">{u.email}</p></div>
            <button onClick={()=>grant(u.id || u._id)} className="rounded-lg bg-rscc-blue px-3 py-2 text-xs font-bold text-white">Grant coach access</button>
          </div>
        )}
        {!users.loading && !(users.data||[]).filter(u=>u.role==="player" && u.status==="active").length &&
          <p className="text-sm text-slate-500">No active players are currently eligible for coach access.</p>}
      </div>
    </Card>}

    {isAdmin&&<Card className="mb-5">
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <input required placeholder="Coach name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="rounded-xl border p-3"/>
        <input placeholder="Specialty" value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} className="rounded-xl border p-3"/>
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="rounded-xl border p-3"/>
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="rounded-xl border p-3"/>
        <button className="rounded-xl bg-rscc-blue px-4 py-3 text-sm font-bold text-white sm:col-span-2">{editing?"Update coach":"Add coach"}</button>
      </form>
      {message&&<p className="mt-3 text-sm text-slate-600">{message}</p>}
    </Card>}

    {loading?<Empty>Loading coaches…</Empty>:error?<Empty>{error}</Empty>:<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {(data||[]).map(c=><Card key={c._id}>
        <div className="flex items-start justify-between"><Badge tone={c.status==="Active"?"lime":"slate"}>{c.status}</Badge><Users className="text-rscc-blue"/></div>
        <h2 className="mt-4 text-xl font-black">{c.name}</h2>
        <p className="mt-1 text-sm text-slate-500">{c.specialty}</p>
        <p className="mt-3 text-sm">{c.email||"No email"}<br/>{c.phone||"No phone"}</p>
        {c.user?.email&&<p className="mt-3 rounded-lg bg-blue-50 p-2 text-xs font-bold text-rscc-blue">Account: {c.user.email}</p>}
        {isAdmin&&<div className="mt-4 flex flex-wrap gap-2">
          <button onClick={()=>{setEditing(c._id);setForm({name:c.name||"",specialty:c.specialty||"",phone:c.phone||"",email:c.email||"",status:c.status||"Active"})}} className="rounded-lg border px-3 py-2 text-xs font-bold">Edit</button>
          <button onClick={()=>remove(c._id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700">Delete</button>
          {c.user&&<button onClick={()=>revoke(c.user._id)} className="rounded-lg border px-3 py-2 text-xs font-bold">Remove access</button>}
        </div>}
      </Card>)}
    </div>}
  </Page>;
}

export function Fees() {
  const storedUser = (() => { try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; } })();
  const role = storedUser?.role === "viewer" ? "player" : storedUser?.role;
  const isPlayer = role === "player";
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const empty = { player: "", amount: "", dueDate: "", status: "Pending", note: "" };
  const [form, setForm] = useState(empty);

  const { loading, error, data } = useLoad(
    () => (isPlayer ? feesService.mine().then(r => r.data.fees) : feesService.list().then(r => r.data.fees)),
    [refresh, isPlayer]
  );
  const { data: players = [] } = useLoad(() => isPlayer ? Promise.resolve([]) : playersService.list().then(r => r.data.players), [isPlayer]);

  const submit = async (e) => {
    e.preventDefault(); setMessage("");
    try {
      await feesService.create({ ...form, amount: Number(form.amount) });
      setForm(empty); setShowForm(false); setRefresh(x => x + 1); setMessage("Fee record created.");
    } catch (err) { setMessage(err?.response?.data?.message || "Unable to create fee record."); }
  };

  const toggleStatus = async (fee) => {
    try { await feesService.update(fee._id, { status: fee.status === "Paid" ? "Pending" : "Paid" }); setRefresh(x => x + 1); }
    catch (err) { setMessage(err?.response?.data?.message || "Unable to update fee."); }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this fee record?")) return;
    try { await feesService.remove(id); setRefresh(x => x + 1); } catch (err) { setMessage(err?.response?.data?.message || "Unable to delete fee."); }
  };

  const paid = (data || []).filter(f => f.status === "Paid").reduce((s, f) => s + Number(f.amount || 0), 0);
  const due = (data || []).filter(f => f.status !== "Paid").reduce((s, f) => s + Number(f.amount || 0), 0);

  return <Page title={isPlayer ? "My fees" : "Fees & payments"} eyebrow={isPlayer ? "My academy account" : "Academy billing"}>
    {isPlayer ? (
      <>
        <Card className="mb-5 border-rscc-blue/20 bg-blue-50/40">
          <p className="text-xs font-extrabold uppercase tracking-wider text-rscc-blue">Your fee account</p>
          <h2 className="mt-2 text-xl font-black">Stay on top of your academy payments</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Your due date, amount and payment status are shown below. RSCC will surface a notification when a fee is due soon or overdue.</p>
        </Card>
        {loading ? <Empty>Loading your fees…</Empty> : error ? <Empty>{error}</Empty> : data?.length ? (
          <div className="space-y-4">
            {data.map(f => {
              const dueDate = new Date(f.dueDate);
              const days = Math.ceil((dueDate - new Date()) / 86400000);
              const status = f.status === "Paid" ? "Paid" : days < 0 ? "Overdue" : days <= 7 ? "Due Soon" : "Pending";
              const tone = status === "Paid" ? "bg-green-50 text-green-700" : status === "Overdue" ? "bg-red-50 text-red-700" : status === "Due Soon" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-rscc-blue";
              return <Card key={f._id}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">{f.note || "Academy fee"}</p>
                    <h2 className="mt-2 text-2xl font-black">₹{Number(f.amount).toLocaleString("en-IN")}</h2>
                    <p className="mt-1 text-sm text-slate-500">Due {formatDate(f.dueDate)}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${tone}`}>{status}</span>
                    <p className="mt-2 text-sm font-bold text-slate-600">
                      {status === "Paid" ? `Paid ${f.paidAt ? formatDate(f.paidAt) : ""}` : days < 0 ? `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue` : days === 0 ? "Due today" : `Due in ${days} day${days === 1 ? "" : "s"}`}
                    </p>
                  </div>
                </div>
              </Card>;
            })}
          </div>
        ) : <Empty>No fee records have been assigned to your player account yet.</Empty>}
      </>
    ) : (
      <>
        <div className="mb-5 grid gap-4 sm:grid-cols-3">
          <Card><p className="text-sm text-slate-500">Fee records</p><p className="mt-2 text-3xl font-black">{data?.length || 0}</p></Card>
          <Card><p className="text-sm text-slate-500">Collected</p><p className="mt-2 text-3xl font-black">₹{paid.toLocaleString("en-IN")}</p></Card>
          <Card><p className="text-sm text-slate-500">Outstanding</p><p className="mt-2 text-3xl font-black">₹{due.toLocaleString("en-IN")}</p></Card>
        </div>
        <div className="mb-5 flex justify-end"><button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{showForm ? "Close" : "+ Add fee record"}</button></div>
        {showForm && <Card className="mb-5"><form onSubmit={submit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <select required value={form.player} onChange={e => setForm({ ...form, player: e.target.value })} className="rounded-xl border p-3"><option value="">Select player</option>{players.map(p => <option key={p._id} value={p._id}>{playerName(p)}{p.category ? ` · ${p.category}` : ""}</option>)}</select>
          <input required type="number" min="0" step="0.01" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="Amount" className="rounded-xl border p-3"/>
          <input required type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className="rounded-xl border p-3"/>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="rounded-xl border p-3"><option>Pending</option><option>Paid</option><option>Overdue</option></select>
          <input value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} placeholder="Note (optional)" className="rounded-xl border p-3"/>
          <button className="rounded-xl bg-rscc-blue px-4 py-3 text-sm font-bold text-slate-950">Save fee</button>
        </form>{message && <p className="mt-3 text-sm text-slate-600">{message}</p>}</Card>}
        {loading ? <Empty>Loading fees…</Empty> : error ? <Empty>{error}</Empty> :
          data.length ? <div className="space-y-3">{data.map(f => <Card key={f._id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div><h2 className="font-black">{playerName(f.player)}</h2><p className="mt-1 text-sm text-slate-500">₹{Number(f.amount).toLocaleString("en-IN")} · due {formatDate(f.dueDate)}{f.note ? ` · ${f.note}` : ""}</p></div>
              <div className="flex items-center gap-2"><button onClick={() => toggleStatus(f)} className={`rounded-xl px-3 py-2 text-sm font-bold ${f.status === "Paid" ? "bg-green-100 text-green-700" : f.status === "Overdue" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{f.status}</button><button onClick={() => remove(f._id)} className="rounded-xl border px-3 py-2 text-sm font-bold text-red-700">Delete</button></div>
            </div>
          </Card>)}</div> : <Empty>No fee records yet. Add the first fee record above.</Empty>}
      </>
    )}
  </Page>;
}
export function Calendar() {
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [month, setMonth] = useState(() => new Date());
  const empty = { title: "", date: "", type: "Training", place: "", description: "" };
  const [form, setForm] = useState(empty);

  const { loading, error, data } = useLoad(async () => {
    const [events, matches] = await Promise.all([eventsService.list(), matchesService.list()]);
    return [
      ...(events.data.events || []).map(e => ({ id: e._id, title: e.title, date: e.date, type: e.type || "Event", location: e.place, description: e.description })),
      ...(matches.data.matches || []).map(m => ({ id: m._id, title: matchTitle(m), date: m.details?.matchDate, type: "Match", location: m.details?.ground || m.details?.venue }))
    ].filter(x => x.date).sort((a,b) => new Date(a.date) - new Date(b.date));
  }, [refresh]);

  const createEvent = async (e) => {
    e.preventDefault(); setMessage("");
    try { await eventsService.create(form); setForm(empty); setShowForm(false); setRefresh(x => x + 1); setMessage("Event added to calendar."); }
    catch (err) { setMessage(err?.response?.data?.message || "Unable to create event."); }
  };

  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const end = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const firstDay = start.getDay();
  const days = Array.from({ length: firstDay + end.getDate() }, (_, i) => i < firstDay ? null : i - firstDay + 1);
  const monthItems = (data || []).filter(item => {
    const d = new Date(item.date);
    return d.getFullYear() === month.getFullYear() && d.getMonth() === month.getMonth();
  });
  const eventsForDay = day => monthItems.filter(item => new Date(item.date).getDate() === day);
  const changeMonth = delta => setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));

  return <Page title="Calendar" eyebrow="Academy schedule">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button onClick={() => changeMonth(-1)} className="rounded-xl border px-3 py-2 font-bold">←</button>
        <h2 className="min-w-40 text-center font-black">{month.toLocaleDateString("en-IN",{month:"long",year:"numeric"})}</h2>
        <button onClick={() => changeMonth(1)} className="rounded-xl border px-3 py-2 font-bold">→</button>
      </div>
      <button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-rscc-blue px-4 py-3 text-sm font-bold text-white">{showForm ? "Close" : "+ Add event"}</button>
    </div>

    {showForm && <Card className="mb-5"><form onSubmit={createEvent} className="grid gap-3 sm:grid-cols-2">
      <input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Event title" className="rounded-xl border p-3"/>
      <input required type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="rounded-xl border p-3"/>
      <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="rounded-xl border p-3"><option>Training</option><option>Meeting</option><option>Fitness</option><option>Other</option></select>
      <input value={form.place} onChange={e=>setForm({...form,place:e.target.value})} placeholder="Location" className="rounded-xl border p-3"/>
      <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" className="min-h-24 rounded-xl border p-3 sm:col-span-2"/>
      <button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Add to calendar</button>
    </form>{message&&<p className="mt-3 text-sm text-slate-600">{message}</p>}</Card>}

    {loading ? <Empty>Loading calendar…</Empty> : error ? <Empty>{error}</Empty> : <>
      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-7 border-b bg-slate-50 text-center text-xs font-extrabold text-slate-500">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day=><div key={day} className="p-3">{day}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day,index) => <div key={index} className="min-h-24 border-b border-r p-2 sm:min-h-28">
            {day && <><span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${day===new Date().getDate() && month.getMonth()===new Date().getMonth() && month.getFullYear()===new Date().getFullYear() ? "bg-rscc-blue text-white" : "text-slate-600"}`}>{day}</span>
            <div className="mt-2 space-y-1">{eventsForDay(day).slice(0,3).map(item=><Link key={item.type+item.id} title={`${calendarEmoji(item.type)} ${item.title}`} to={item.type==="Match"?`/matches/${item.id}`:"/events"} className="block truncate rounded-md bg-blue-50 px-1.5 py-1 text-[10px] font-bold text-rscc-blue">{calendarEmoji(item.type)} {item.title}</Link>)}</div></>}
          </div>)}
        </div>
      </Card>
      <div className="mt-5">
        <h2 className="mb-3 font-black">Upcoming schedule</h2>
        <div className="space-y-3">{(data||[]).filter(x=>new Date(x.date)>=new Date(new Date().setHours(0,0,0,0))).slice(0,8).map(i=><Card key={i.type+i.id}><div className="flex items-center justify-between gap-3"><div><Badge tone={i.type==="Match"?"blue":"slate"}>{calendarEmoji(i.type)} {i.type}</Badge><h3 className="mt-2 font-black">{i.title}</h3><p className="text-sm text-slate-500">{formatDate(i.date)}{i.location?` · ${i.location}`:""}</p></div><CalendarDays className="text-rscc-blue" size={22}/></div></Card>)}</div>
      </div>
    </>}
  </Page>;
}
export function Reports() {
  const [refresh,setRefresh]=useState(0);
  const { loading, error, data } = useLoad(() => reportsService.academy().then(r => r.data.report), [refresh]);
  const exportReport = () => {
    if (!data) return;
    const rows = [
      ["Metric","Value"],
      ["Players",data.players],["Matches",data.matches],["Attendance sessions",data.attendanceSessions],
      ["Fee records",data.totalFees],["Fees received",data.paid],["Fees due",data.due],
      ...Object.entries(data.playersByCategory||{}).map(([k,v])=>[`Players - ${k}`,v]),
      ...Object.entries(data.attendanceBreakdown||{}).map(([k,v])=>[`Attendance - ${k}`,v]),
    ];
    const csv = rows.map(row=>row.map(value=>`"${String(value??"").replace(/"/g,'""')}"`).join(",")).join("\\n");
    const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download=`rscc-academy-report-${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url);
  };
  if (loading) return <Page title="Academy reports" eyebrow="Live management report"><Empty>Loading report…</Empty></Page>;
  if (error) return <Page title="Academy reports" eyebrow="Live management report"><Empty>{error}</Empty></Page>;
  const cards = [["Players", data.players],["Matches",data.matches],["Attendance sessions",data.attendanceSessions],["Fee records",data.totalFees],["Fees received",`₹${Number(data.paid||0).toLocaleString("en-IN")}`],["Fees due",`₹${Number(data.due||0).toLocaleString("en-IN")}`]];
  return <Page title="Academy reports" eyebrow="Live management report">
    <div className="mb-5 flex flex-wrap justify-end gap-2"><button onClick={()=>setRefresh(x=>x+1)} className="rounded-xl border px-4 py-3 text-sm font-bold">Refresh</button><button onClick={exportReport} className="rounded-xl bg-rscc-blue px-4 py-3 text-sm font-bold text-white">Export CSV</button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label,value])=><Card key={label}><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></Card>)}</div>
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <Card><h2 className="font-black">Players by age group</h2><div className="mt-5 space-y-3">{Object.entries(data.playersByCategory||{}).map(([label,value])=><div key={label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"><span>{label}</span><b>{value}</b></div>)}</div></Card>
      <Card><h2 className="font-black">Attendance breakdown</h2><div className="mt-5 space-y-3">{Object.entries(data.attendanceBreakdown||{}).map(([label,value])=><div key={label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"><span className="capitalize">{label}</span><b>{value}</b></div>)}</div></Card>
    </div>
    <Card className="mt-5"><h2 className="font-black">Upcoming academy events</h2><div className="mt-4 space-y-2">{(data.upcomingEvents||[]).map(event=><div key={event._id} className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"><span><b>{event.title}</b><span className="ml-2 text-slate-500">{event.type||"Event"}</span></span><span className="text-slate-500">{formatDate(event.date)}</span></div>)}{!(data.upcomingEvents||[]).length&&<p className="text-sm text-slate-500">No upcoming events.</p>}</div></Card>
    <p className="mt-4 text-xs text-slate-400">Generated {formatDate(data.generatedAt)}. Advanced cricket performance analytics remain part of the future Statistics module.</p>
  </Page>;
}
export function Notifications() {
  const [refresh, setRefresh] = useState(0);
  const { loading, error, data } = useLoad(() => notificationsService.list().then(r => r.data), [refresh]);
  const read = async id => { try { await notificationsService.markRead(id); } finally { setRefresh(x => x + 1); } };
  return <Page title="Notifications" eyebrow="Academy alerts">
    <div className="mb-5 flex items-center justify-between gap-3">
      <p className="text-sm text-slate-500">{data?.unreadCount || 0} unread notification{(data?.unreadCount || 0) === 1 ? "" : "s"}</p>
      <button onClick={() => notificationsService.markAllRead().then(() => setRefresh(x => x + 1))} className="rounded-xl border px-4 py-3 text-sm font-bold">Mark all read</button>
    </div>
    {loading ? <Empty>Loading notifications…</Empty> : error ? <Empty>{error}. Sign in to see your notifications.</Empty> :
      !(data?.notifications || []).length ? <Empty>You’re all caught up. Important academy updates will appear here.</Empty> :
      <div className="space-y-3">{data.notifications.map(notification =>
        <Card key={notification._id} className={notification.read ? "opacity-70" : "border-lime-400"}>
          <div className="flex items-start justify-between gap-4">
            <button onClick={() => !notification.read && read(notification._id)} className="min-w-0 flex-1 text-left">
              <div className="flex items-center gap-2"><h2 className="font-black">{notification.title}</h2>{!notification.read && <Badge>New</Badge>}</div>
              <p className="mt-2 text-sm text-slate-600">{notification.body}</p>
              <small className="mt-2 block text-slate-400">{formatDate(notification.createdAt)}</small>
            </button>
            {notification.link && <Link to={notification.link} onClick={() => !notification.read && read(notification._id)} className="shrink-0 rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-rscc-blue">Open</Link>}
          </div>
        </Card>)}</div>}
  </Page>;
}
export function Settings() { const { loading, error, data: user } = useLoad(() => authService.me().then(r => r.data.user), []); const [form, setForm] = useState(null); const [message, setMessage] = useState(""); useEffect(() => { if (user) setForm({ name: user.name || "", phone: user.phone || "", avatar: user.avatar || "", notificationPreferences: user.notificationPreferences || { announcements: true, events: true, matches: true, fees: true } }); }, [user]); const save = async e => { e.preventDefault(); try { await authService.updateMe(form); setMessage("Settings saved."); } catch (err) { setMessage(err?.response?.data?.message || "Unable to save settings"); } }; return <Page title="Settings" eyebrow="Account & notifications">{loading ? <Empty>Loading settings…</Empty> : error || !form ? <Empty>{error || "Sign in to manage settings."}</Empty> : <Card className="max-w-2xl"><form onSubmit={save}><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">Full name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1.5 w-full rounded-xl border p-3 font-normal"/></label><label className="text-sm font-bold">Phone<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-1.5 w-full rounded-xl border p-3 font-normal"/></label>
<label className="text-sm font-bold sm:col-span-2">Avatar URL<input value={form.avatar || ""} onChange={e => setForm({ ...form, avatar: e.target.value })} placeholder="https://..." className="mt-1.5 w-full rounded-xl border p-3 font-normal"/></label></div><h2 className="mt-7 font-black">Notification preferences</h2><div className="mt-3 space-y-3">{[["announcements", "Announcements"], ["events", "Events"], ["matches", "Match updates"], ["fees", "Fee reminders"]].map(([key, label]) => <label key={key} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm font-bold">{label}<input type="checkbox" checked={form.notificationPreferences[key] !== false} onChange={e => setForm({ ...form, notificationPreferences: { ...form.notificationPreferences, [key]: e.target.checked } })}/></label>)}</div><button className="mt-6 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Save settings</button>{message && <span className="ml-3 text-sm text-slate-600">{message}</span>}</form></Card>}</Page>; }
export function Auth({ mode = "Login" }) {
  const isRegister = mode === "Create account";
  const emptyForm = {
    name: "", phone: "", email: "", password: "",
    age: "", category: "U12", gender: "Male", role: "Batsman",
    jerseyNumber: "", dateOfBirth: "", battingStyle: "", bowlingStyle: "",
    parentName: "", parentPhone: "", address: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (key, value) => setForm(current => ({ ...current, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); setError(""); if (!submitted) setMessage("");
    try {
      if (isRegister) {
        const response = await authService.register({
          ...form,
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          age: form.age ? Number(form.age) : undefined,
          jerseyNumber: form.jerseyNumber ? Number(form.jerseyNumber) : undefined,
          parentName: form.parentName.trim(),
          parentPhone: form.parentPhone.trim(),
          address: form.address.trim(),
        });
        if (response.data.pendingApproval) {
          setMessage("Your request has been delivered to Rising Star Cricket Club. Please wait for approval from an administrator or coach. Once approved, your player profile will already be set up and you can sign in without entering these details again.");
          setSubmitted(true);
        } else {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken || "");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/dashboard", { replace: true });
        }
      } else {
        const { data } = await authService.login({ email: form.email.trim().toLowerCase(), password: form.password });
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken || "");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard", { replace: true });
      }
    } catch (e) {
      setError(e?.response?.data?.message || "Unable to continue. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:grid sm:place-items-center">
      <div className={`mx-auto w-full ${isRegister ? "max-w-3xl" : "max-w-md"}`}>
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border-2 border-rscc-red bg-white">
              <img src={logo} alt="Rising Star Cricket Club" className="h-full w-full object-cover"/>
            </span>
            <span className="text-left"><b className="block text-lg font-black text-rscc-blue">RSCC</b><small className="text-xs text-slate-500">Rising Star Cricket Club</small></span>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
          <h1 className="text-3xl font-black">{isRegister ? "Join RSCC" : "Welcome back"}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {isRegister
              ? "Create your player account and submit your membership request. Coach access can only be granted later by an RSCC administrator."
              : "Sign in to your academy workspace."}
          </p>

          {isRegister ? (
            <>
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
                <b className="text-rscc-blue">What happens next?</b>
                <p className="mt-1">Your details are saved with your membership request. An admin or coach reviews the request, and your player profile is activated after approval.</p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-bold">Full name<input required value={form.name} onChange={e=>set("name",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3" placeholder="Full name"/></label>
                <label className="text-sm font-bold">Phone<input value={form.phone} onChange={e=>set("phone",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3" placeholder="Phone number"/></label>
                <label className="text-sm font-bold">Date of birth<input type="date" value={form.dateOfBirth} onChange={e=>set("dateOfBirth",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3"/></label>
                <label className="text-sm font-bold">Age<input type="number" min="4" max="60" value={form.age} onChange={e=>set("age",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3" placeholder="Age"/></label>
                <label className="text-sm font-bold">Category<select value={form.category} onChange={e=>set("category",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3">{["U12","U14","U16","U19","Senior"].map(x=><option key={x}>{x}</option>)}</select></label>
                <label className="text-sm font-bold">Playing role<select value={form.role} onChange={e=>set("role",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3">{["Batsman","Bowler","All Rounder","Wicket Keeper"].map(x=><option key={x}>{x}</option>)}</select></label>
                <label className="text-sm font-bold">Gender<select value={form.gender} onChange={e=>set("gender",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3"><option>Male</option><option>Female</option></select></label>
                <label className="text-sm font-bold">Jersey number<input type="number" min="0" max="99" value={form.jerseyNumber} onChange={e=>set("jerseyNumber",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3" placeholder="Optional"/></label>
                <label className="text-sm font-bold">Batting style<select value={form.battingStyle} onChange={e=>set("battingStyle",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3"><option value="">Select</option><option>Right Hand Bat</option><option>Left Hand Bat</option></select></label>
                <label className="text-sm font-bold">Bowling style<select value={form.bowlingStyle} onChange={e=>set("bowlingStyle",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3"><option value="">Select</option><option>Right-arm fast</option><option>Left-arm fast</option><option>Right-arm medium</option><option>Left-arm medium</option><option>Right-arm medium-fast</option><option>Left-arm medium-fast</option><option>Right-arm off spin</option><option>Right-arm leg spin</option><option>Left-arm orthodox spin</option><option>Left-arm chinaman</option><option>Right-arm googly / leg break</option><option>None</option></select></label>
                <label className="text-sm font-bold">Parent/guardian name<input value={form.parentName} onChange={e=>set("parentName",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3" placeholder="For junior players"/></label>
                <label className="text-sm font-bold">Parent/guardian phone<input value={form.parentPhone} onChange={e=>set("parentPhone",e.target.value)} className="mt-1.5 w-full rounded-xl border p-3"/></label>
                <label className="text-sm font-bold sm:col-span-2">Address<textarea value={form.address} onChange={e=>set("address",e.target.value)} className="mt-1.5 min-h-20 w-full rounded-xl border p-3" placeholder="Residential address"/></label>
              </div>
            </>
          ) : null}

          <label className="mt-4 block text-sm font-bold">Email
            <input required type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="you@example.com" className="mt-1.5 w-full rounded-xl border p-3"/>
          </label>
          <label className="mt-4 block text-sm font-bold">Password
            <span className="relative mt-1.5 block">
              <input required minLength="6" type={showPassword?"text":"password"} value={form.password} onChange={e=>set("password",e.target.value)} placeholder="At least 6 characters" className="w-full rounded-xl border p-3 pr-11"/>
              <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={()=>setShowPassword(v=>!v)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500">{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button>
            </span>
          </label>

          {!isRegister && <div className="mt-3 text-right"><Link to="/forgot-password" className="text-sm font-bold text-rscc-blue">Forgot password?</Link></div>}
          {message && <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold leading-6 text-green-800"><b>Request submitted</b><p className="mt-1 font-medium">{message}</p></div>}
          {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          <button disabled={loading || (isRegister && submitted)} className="mt-6 w-full rounded-xl bg-rscc-blue py-3.5 text-sm font-extrabold text-white disabled:opacity-60">
            {loading ? "Please wait…" : isRegister ? (submitted ? "Request submitted" : "Submit membership request") : "Sign in"}
          </button>
          <div className="mt-6 border-t pt-5 text-center text-sm text-slate-500">
            {isRegister ? <>Already have an account? <Link className="font-bold text-rscc-blue" to="/login">Sign in</Link></> : <>New to RSCC? <Link className="font-bold text-rscc-blue" to="/register">Create account</Link></>}
          </div>
        </form>
        <Link to="/" className="mt-5 block text-center text-sm font-bold text-slate-500">← Back to RSCC</Link>
      </div>
    </div>
  );
}

export function Forgot({ reset = false }) {
  const [form, setForm] = useState({ email: "", token: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = reset
        ? await authService.resetPassword({ token: form.token.trim(), password: form.password })
        : await authService.forgotPassword({ email: form.email.trim().toLowerCase() });

      if (reset) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.resetToken
          ? `${response.data.message} Use the reset token below.`
          : response.data.message);
        if (response.data.resetToken) setForm(current => ({ ...current, token: response.data.resetToken }));
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to continue");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:grid sm:place-items-center">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link to="/" className="text-xl font-black text-rscc-blue">RSCC</Link>
          <p className="mt-1 text-xs text-slate-500">Rising Star Cricket Club</p>
        </div>
        <Card>
          <h1 className="text-2xl font-black">{reset ? "Set a new password" : "Forgot password?"}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">{reset ? "Enter the reset token you received and choose a new password." : "Enter your registered email and we'll start the password reset process."}</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {reset ? <>
              <input required placeholder="Reset token" value={form.token} onChange={e => setForm({ ...form, token: e.target.value })} className="w-full rounded-xl border border-slate-300 p-3"/>
              <span className="relative block">
                <input required minLength="6" type={showPassword ? "text" : "password"} placeholder="New password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border border-slate-300 p-3 pr-11"/>
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
              </span>
            </> : <input required type="email" placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-300 p-3"/>}
            {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
            {message && <p className="rounded-xl bg-blue-50 p-3 text-sm font-semibold text-rscc-blue">{message}</p>}
            <button className="w-full rounded-xl bg-rscc-blue py-3 text-sm font-extrabold text-white">{reset ? "Reset password" : "Send reset request"}</button>
          </form>
          <Link to="/login" className="mt-5 inline-block text-sm font-bold text-rscc-blue">← Back to login</Link>
        </Card>
      </div>
    </div>
  );
}


