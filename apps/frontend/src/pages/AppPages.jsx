import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, CalendarDays, Check, CircleAlert, Clock3, MapPin, Plus, Search, Trophy, Users } from "lucide-react";
import { AppShell, MobileNav } from "../components/AppShell";
import Home from "./Home";
import { attendanceService, announcementsService, authService, coachesService, equipmentService, eventsService, feesService, matchesService, notificationsService, playersService, reportsService, teamsService } from "../services/api";

const Card = ({ children, className = "" }) => <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgb(15,23,42,0.035)] ${className}`}>{children}</section>;
const Badge = ({ children, tone = "lime" }) => <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${tone === "slate" ? "bg-slate-100 text-slate-600" : tone === "red" ? "bg-red-50 text-red-700" : "bg-blue-50 text-rscc-blue"}`}>{children}</span>;
const Empty = ({ children }) => <Card className="py-12 text-center text-sm text-slate-500">{children}</Card>;
const Page = ({ title, eyebrow, children }) => <><AppShell title={title} eyebrow={eyebrow}>{children}</AppShell><MobileNav /></>;
const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Date to be confirmed";
const playerName = (player) => player?.fullName || player?.name || "Unnamed player";

function useLoad(loader, dependencies = []) {
  const [state, setState] = useState({ loading: true, error: "", data: null });
  useEffect(() => { let active = true; setState({ loading: true, error: "", data: null }); loader().then(data => active && setState({ loading: false, error: "", data })).catch(error => active && setState({ loading: false, error: error?.response?.data?.message || "Unable to load data", data: null })); return () => { active = false; }; }, dependencies);
  return state;
}

export function Landing() { return <Home />; }

export function Dashboard() { const { loading, error, data } = useLoad(async () => { const [players, teams, matches, user] = await Promise.all([playersService.list(), teamsService.list(), matchesService.list(), authService.me().catch(() => ({ data: { user: JSON.parse(localStorage.getItem("user") || "null") } }))]); return { players: players.data.players, teams: teams.data.teams, matches: matches.data.matches, user: user.data.user }; }); const cards = [["Players", data?.players?.length || 0, Users], ["Teams", data?.teams?.length || 0, Users], ["Matches", data?.matches?.length || 0, Trophy]]; return <Page title={`Welcome${data?.user?.name ? `, ${data.user.name}` : ""}.`} eyebrow="Academy overview"><div className="grid gap-4 sm:grid-cols-3">{cards.map(([label, value, Icon]) => <Card key={label}><Icon className="text-rscc-blue" size={20}/><p className="mt-5 text-3xl font-black">{loading ? "—" : value}</p><p className="text-sm text-slate-500">{label}</p></Card>)}</div>{error && <p className="mt-5 text-sm text-red-700">{error}</p>}<div className="mt-5 grid gap-5 lg:grid-cols-2"><Card><h2 className="font-black">Quick actions</h2><div className="mt-4 grid gap-2">{[["Register player", "/players"], ["Mark attendance", "/attendance"], ["Schedule match", "/matches"]].map(([label, to]) => <Link key={to} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold hover:bg-blue-50" to={to}>{label}<Plus size={16}/></Link>)}</div></Card><Card><h2 className="font-black">Upcoming fixtures</h2><div className="mt-4 space-y-3">{data?.matches?.slice(0, 3).map(match => <MatchRow key={match._id} match={match}/>) || <p className="text-sm text-slate-500">Loading fixtures…</p>}</div></Card></div></Page>; }

function PlayerForm({ onSaved, onCancel }) { const [form, setForm] = useState({ fullName: "", age: "", role: "Batsman", category: "U12", gender: "Male", jerseyNumber: "" }); const [error, setError] = useState(""); const submit = async event => { event.preventDefault(); try { await playersService.create({ ...form, age: form.age ? Number(form.age) : undefined, jerseyNumber: form.jerseyNumber ? Number(form.jerseyNumber) : undefined }); onSaved(); } catch (e) { setError(e?.response?.data?.message || "Could not create player"); } }; return <Card className="mb-5"><form onSubmit={submit} className="grid gap-3 sm:grid-cols-2"><input required placeholder="Full name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} className="rounded-xl border p-3"/><input type="number" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} className="rounded-xl border p-3"/><select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="rounded-xl border p-3">{["Batsman", "Bowler", "All Rounder", "Wicket Keeper"].map(x => <option key={x}>{x}</option>)}</select><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="rounded-xl border p-3">{["U12", "U14", "U16", "U19", "Senior"].map(x => <option key={x}>{x}</option>)}</select><input type="number" placeholder="Jersey number" value={form.jerseyNumber} onChange={e => setForm({ ...form, jerseyNumber: e.target.value })} className="rounded-xl border p-3"/><div className="sm:col-span-2 flex gap-3"><button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Save player</button><button type="button" onClick={onCancel} className="rounded-xl border px-4 py-3 text-sm font-bold">Cancel</button>{error && <span className="self-center text-sm text-red-700">{error}</span>}</div></form></Card>; }

export function Players() { const [refresh, setRefresh] = useState(0); const [adding, setAdding] = useState(false); const [query, setQuery] = useState(""); const { loading, error, data } = useLoad(() => playersService.list().then(r => r.data.players), [refresh]); const filtered = useMemo(() => (data || []).filter(p => `${playerName(p)} ${p.role || ""} ${p.category || ""}`.toLowerCase().includes(query.toLowerCase())), [data, query]); const categories = ["U12", "U14", "U16", "U19", "Senior"]; return <Page title="Players" eyebrow="Player management"><div className="mb-5 flex gap-3"><label className="flex flex-1 items-center gap-2 rounded-xl border bg-white px-3"><Search size={17} className="text-slate-400"/><input className="w-full py-3 outline-none" placeholder="Search player, role, or age group" value={query} onChange={e => setQuery(e.target.value)}/></label><button onClick={() => setAdding(!adding)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{adding ? "Close" : "+ Register player"}</button></div>{adding && <PlayerForm onCancel={() => setAdding(false)} onSaved={() => { setAdding(false); setRefresh(x => x + 1); }}/>} {error && <Empty>{error}. Sign in as an administrator or coach to manage players.</Empty>} {loading ? <Empty>Loading players…</Empty> : !error && <div className="space-y-8">{categories.map(category => { const group = filtered.filter(p => (p.category || "U12") === category); return <section key={category}><div className="mb-3 flex items-center gap-3"><h2 className="text-lg font-black">{category === "Senior" ? "Senior Players" : `${category} Players`}</h2><Badge tone="slate">{group.length}</Badge></div>{group.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{group.map(p => <Link key={p._id} to={`/players/${p._id}`}><Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md"><h3 className="font-black">{playerName(p)}</h3><p className="mt-1 text-sm text-slate-500">{p.role || "Player"} · #{p.jerseyNumber || "—"}</p><div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-sm"><span><small className="block text-slate-400">Age</small>{p.age || "—"}</span><span><small className="block text-slate-400">Runs</small>{p.career?.runs || 0}</span></div></Card></Link>)}</div> : <p className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">No {category} players yet.</p>}</section>; })}</div>} {!loading && !error && !filtered.length && <Empty>No players found.</Empty>}</Page>; }

export function PlayerProfile() { const { id } = useParams(); const { loading, error, data: player } = useLoad(() => playersService.get(id).then(r => r.data.player), [id]); if (loading) return <Page title="Player" eyebrow="Player profile"><Empty>Loading player…</Empty></Page>; if (error) return <Page title="Player" eyebrow="Player profile"><Empty>{error}</Empty></Page>; return <Page title={playerName(player)} eyebrow="Player profile"><Card className="max-w-3xl"><h2 className="text-xl font-black">{playerName(player)}</h2><p className="mt-1 text-sm text-slate-500">{player.role || "Player"} · #{player.jerseyNumber || "—"}</p><div className="mt-7 grid grid-cols-2 gap-5 text-sm sm:grid-cols-4">{[["Age", player.age], ["Batting", player.battingStyle], ["Runs", player.career?.runs || 0], ["Wickets", player.career?.wickets || 0]].map(([label, value]) => <span key={label}><small className="block text-slate-400">{label}</small><b>{value || "—"}</b></span>)}</div></Card></Page>; }

export function Attendance() { const today = new Date().toISOString().slice(0, 10); const [date, setDate] = useState(today); const [statuses, setStatuses] = useState({}); const [message, setMessage] = useState(""); const { loading, error, data: players } = useLoad(() => playersService.list().then(r => r.data.players), []); useEffect(() => { attendanceService.getByDate(date).then(r => setStatuses(Object.fromEntries((r.data.attendance?.entries || []).map(x => [x.player?._id || x.player, x.status])))).catch(() => setStatuses({})); }, [date]); const save = async () => { try { await attendanceService.save({ sessionDate: date, sessionName: "Training session", entries: players.map(p => ({ player: p._id, status: statuses[p._id] || "Present" })) }); setMessage("Attendance saved."); } catch (e) { setMessage(e?.response?.data?.message || "Unable to save attendance. You need coach or admin access."); } }; return <Page title="Attendance" eyebrow="Daily training"><Card><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-black">Training session</h2><p className="text-sm text-slate-500">Record attendance for every registered player.</p></div><input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-xl border px-3 py-2"/></div>{loading ? <p>Loading players…</p> : error ? <p className="text-red-700">{error}</p> : <div className="overflow-x-auto"><table className="w-full min-w-[550px] text-left text-sm"><thead className="border-y text-xs uppercase text-slate-400"><tr><th className="py-3">Player</th><th>Role</th><th className="text-right">Status</th></tr></thead><tbody>{players.map(p => <tr key={p._id} className="border-b"><td className="py-3 font-bold">{playerName(p)}</td><td className="text-slate-500">{p.role || "—"}</td><td className="text-right"><select value={statuses[p._id] || "Present"} onChange={e => setStatuses({ ...statuses, [p._id]: e.target.value })} className="rounded-lg border bg-white px-2 py-1.5"><option>Present</option><option>Late</option><option>Absent</option></select></td></tr>)}</tbody></table></div>}<div className="mt-5 flex items-center gap-3"><button onClick={save} disabled={loading || !!error} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Save attendance</button>{message && <span className="text-sm text-slate-600">{message}</span>}</div></Card></Page>; }

const matchTitle = match => `${match.teams?.home?.name || "Home team"} vs ${match.teams?.away?.name || "Away team"}`;
function MatchRow({ match }) { return <Link to={`/matches/${match._id}`} className="block rounded-xl bg-slate-50 p-3 hover:bg-blue-50"><b className="block text-sm">{matchTitle(match)}</b><small className="text-slate-500">{formatDate(match.details?.matchDate)} · {match.details?.ground || match.details?.venue || "Venue TBC"}</small></Link>; }
function MatchForm({ teams, onSaved, onCancel }) { const [form, setForm] = useState({ home: "", away: "", matchType: "Friendly", ground: "", overs: 20, matchDate: "" }); const [error, setError] = useState(""); const save = async event => { event.preventDefault(); try { await matchesService.create({ matchType: form.matchType, teams: { home: form.home, away: form.away }, details: { ground: form.ground, overs: Number(form.overs), matchDate: form.matchDate || undefined }, status: "Ready" }); onSaved(); } catch (e) { setError(e?.response?.data?.message || "Could not create match"); } }; return <Card className="mb-5"><form onSubmit={save} className="grid gap-3 sm:grid-cols-2"><select required value={form.home} onChange={e => setForm({ ...form, home: e.target.value })} className="rounded-xl border p-3"><option value="">Home team</option>{teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}</select><select required value={form.away} onChange={e => setForm({ ...form, away: e.target.value })} className="rounded-xl border p-3"><option value="">Away team</option>{teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}</select><input required placeholder="Ground" value={form.ground} onChange={e => setForm({ ...form, ground: e.target.value })} className="rounded-xl border p-3"/><input type="date" value={form.matchDate} onChange={e => setForm({ ...form, matchDate: e.target.value })} className="rounded-xl border p-3"/><input type="number" min="1" value={form.overs} onChange={e => setForm({ ...form, overs: e.target.value })} className="rounded-xl border p-3"/><select value={form.matchType} onChange={e => setForm({ ...form, matchType: e.target.value })} className="rounded-xl border p-3">{["Friendly", "Practice", "Tournament", "League", "Knockout"].map(x => <option key={x}>{x}</option>)}</select><div className="sm:col-span-2 flex gap-3"><button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Schedule match</button><button type="button" onClick={onCancel} className="rounded-xl border px-4 py-3 text-sm font-bold">Cancel</button>{error && <span className="self-center text-sm text-red-700">{error}</span>}</div></form></Card>; }
export function Matches() { const [refresh, setRefresh] = useState(0); const [creating, setCreating] = useState(false); const { loading, error, data } = useLoad(async () => { const [matches, teams] = await Promise.all([matchesService.list(), teamsService.list()]); return { matches: matches.data.matches, teams: teams.data.teams }; }, [refresh]); return <Page title="Matches" eyebrow="Fixtures & results"><div className="mb-5 flex justify-end"><button onClick={() => setCreating(!creating)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{creating ? "Close" : "+ Schedule match"}</button></div>{creating && <MatchForm teams={data?.teams || []} onCancel={() => setCreating(false)} onSaved={() => { setCreating(false); setRefresh(x => x + 1); }}/>} {loading ? <Empty>Loading fixtures…</Empty> : error ? <Empty>{error}. Sign in as an administrator or coach to manage fixtures.</Empty> : <div className="grid gap-4 lg:grid-cols-2">{data.matches.map(match => <Card key={match._id}><div className="flex justify-between"><Badge tone={match.status === "Completed" ? "slate" : "lime"}>{match.status}</Badge><span className="text-sm text-slate-500">{match.matchType}</span></div><h2 className="mt-5 text-lg font-black">{matchTitle(match)}</h2><p className="mt-3 text-sm text-slate-500"><CalendarDays className="mr-1 inline" size={15}/>{formatDate(match.details?.matchDate)}<br/><MapPin className="mr-1 inline" size={15}/>{match.details?.ground || match.details?.venue || "Venue TBC"} · {match.details?.overs || 20} overs</p><Link to={`/matches/${match._id}`} className="mt-5 inline-flex gap-1 text-sm font-bold text-rscc-blue">Match details <ArrowRight size={15}/></Link></Card>)}</div>}</Page>; }
export function MatchDetails() { const { id } = useParams(); const { loading, error, data: match } = useLoad(() => matchesService.get(id).then(r => r.data.match), [id]); return <Page title="Match details" eyebrow="Fixture"><Card>{loading ? "Loading match…" : error ? error : <><Badge>{match.status}</Badge><h2 className="mt-4 text-2xl font-black">{matchTitle(match)}</h2><p className="mt-3 text-sm text-slate-500">{formatDate(match.details?.matchDate)} · {match.details?.ground || "Venue TBC"} · {match.details?.overs || 20} overs</p><p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Live scoring is the next module to connect to this saved fixture.</p></>}</Card></Page>; }

export function Teams() { const { loading, error, data } = useLoad(() => teamsService.list().then(r => r.data.teams), []); return <Page title="Teams" eyebrow="Squads"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{loading ? <Empty>Loading teams…</Empty> : error ? <Empty>{error}</Empty> : data.map(team => <Card key={team._id}><Badge tone="slate">{team.category}</Badge><h2 className="mt-4 text-xl font-black">{team.name}</h2><p className="mt-2 text-sm text-slate-500">{team.shortName} · {team.players?.length || 0} players</p></Card>)}</div></Page>; }
function ContentForm({ kind, onSaved, onCancel }) { const [form, setForm] = useState(kind === "event" ? { title: "", date: "", time: "", type: "Academy event", place: "", description: "" } : { title: "", category: "General", body: "" }); const [error, setError] = useState(""); const submit = async e => { e.preventDefault(); try { await (kind === "event" ? eventsService.create(form) : announcementsService.create(form)); onSaved(); } catch (err) { setError(err?.response?.data?.message || "Unable to save"); } }; return <Card className="mb-5"><form onSubmit={submit} className="grid gap-3 sm:grid-cols-2"><input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="rounded-xl border p-3"/>{kind === "event" ? <><input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="rounded-xl border p-3"/><input placeholder="Time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="rounded-xl border p-3"/><input placeholder="Event type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="rounded-xl border p-3"/><input placeholder="Location" value={form.place} onChange={e => setForm({ ...form, place: e.target.value })} className="rounded-xl border p-3 sm:col-span-2"/><textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="rounded-xl border p-3 sm:col-span-2"/></> : <><input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="rounded-xl border p-3"/><textarea required placeholder="Announcement" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} className="rounded-xl border p-3 sm:col-span-2"/></>}<div className="sm:col-span-2 flex gap-3"><button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Publish</button><button type="button" onClick={onCancel} className="rounded-xl border px-4 py-3 text-sm font-bold">Cancel</button>{error && <span className="self-center text-sm text-red-700">{error}</span>}</div></form></Card>; }
export function Events() { const [refresh, setRefresh] = useState(0); const [adding, setAdding] = useState(false); const { loading, error, data } = useLoad(() => eventsService.list().then(r => r.data.events), [refresh]); return <Page title="Events" eyebrow="Academy calendar"><div className="mb-5 text-right"><button onClick={() => setAdding(!adding)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{adding ? "Close" : "+ New event"}</button></div>{adding && <ContentForm kind="event" onCancel={() => setAdding(false)} onSaved={() => { setAdding(false); setRefresh(x => x + 1); }}/>} {loading ? <Empty>Loading events…</Empty> : error ? <Empty>{error}. Sign in as an administrator or coach to manage events.</Empty> : <div className="grid gap-4 lg:grid-cols-3">{data.map(event => <Card key={event._id}><Badge tone="slate">{event.type}</Badge><h2 className="mt-4 font-black">{event.title}</h2><p className="mt-3 text-sm text-slate-500">{formatDate(event.date)} {event.time && `· ${event.time}`}<br/>{event.place}</p>{event.description && <p className="mt-3 text-sm text-slate-600">{event.description}</p>}</Card>)}</div>}</Page>; }
export function Announcements() { const [refresh, setRefresh] = useState(0); const [adding, setAdding] = useState(false); const { loading, error, data } = useLoad(() => announcementsService.list().then(r => r.data.announcements), [refresh]); return <Page title="Announcements" eyebrow="Academy updates"><div className="mb-5 text-right"><button onClick={() => setAdding(!adding)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{adding ? "Close" : "+ New announcement"}</button></div>{adding && <ContentForm kind="announcement" onCancel={() => setAdding(false)} onSaved={() => { setAdding(false); setRefresh(x => x + 1); }}/>} {loading ? <Empty>Loading announcements…</Empty> : error ? <Empty>{error}. Sign in as an administrator or coach to publish announcements.</Empty> : <div className="grid gap-4 lg:grid-cols-2">{data.map(item => <Card key={item._id}><div className="flex justify-between"><Badge tone={item.category === "Important" ? "red" : "slate"}>{item.category}</Badge><small className="text-slate-400">{formatDate(item.createdAt)}</small></div><h2 className="mt-4 font-black">{item.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p></Card>)}</div>}</Page>; }
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
  const { loading, error, data: user } = useLoad(() => authService.me().then(r => r.data.user), []);
  return <Page title="My profile" eyebrow="Account">
    <Card className="max-w-2xl">
      {loading ? "Loading profile…" : error ? <><p>{error}</p><Link className="mt-4 inline-block font-bold text-rscc-blue" to="/login">Sign in</Link></> :
      <div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-900 text-2xl font-black text-blue-300">
            {user.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover"/> : (user.name || "U").slice(0, 2).toUpperCase()}
          </div>
          <div><h2 className="text-2xl font-black">{user.name}</h2><p className="mt-1 text-sm text-slate-500">{user.email}</p><Badge tone="slate">{user.role}</Badge></div>
        </div>
        <div className="mt-7 grid gap-4 border-t pt-6 sm:grid-cols-2">
          <div><small className="text-slate-400">Academy</small><p className="mt-1 font-bold">{user.academy || "Rising Star Cricket Club"}</p></div>
          <div><small className="text-slate-400">Phone</small><p className="mt-1 font-bold">{user.phone || "Not added"}</p></div>
          <div><small className="text-slate-400">Account status</small><p className="mt-1 font-bold capitalize">{user.status || "active"}</p></div>
          <div><small className="text-slate-400">Notifications</small><p className="mt-1 font-bold">{Object.values(user.notificationPreferences || {}).filter(Boolean).length} preferences enabled</p></div>
        </div>
        <Link to="/settings" className="mt-7 inline-block rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Edit profile & settings</Link>
      </div>}
    </Card>
  </Page>;
}
export function Equipment() { const [refresh, setRefresh] = useState(0); const [adding, setAdding] = useState(false); const [form, setForm] = useState({ name: "", category: "General", quantity: 1, location: "" }); const [message, setMessage] = useState(""); const { loading, error, data } = useLoad(() => equipmentService.list().then(r => r.data.equipment), [refresh]); const save = async e => { e.preventDefault(); try { await equipmentService.create({ ...form, quantity: Number(form.quantity), available: Number(form.quantity) }); setAdding(false); setRefresh(x => x + 1); } catch (err) { setMessage(err?.response?.data?.message || "Unable to save equipment"); } }; return <Page title="Equipment" eyebrow="Inventory"><div className="mb-5 text-right"><button onClick={() => setAdding(!adding)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{adding ? "Close" : "+ Add equipment"}</button></div>{adding && <Card className="mb-5"><form onSubmit={save} className="grid gap-3 sm:grid-cols-2"><input required placeholder="Item name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="rounded-xl border p-3"/><input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="rounded-xl border p-3"/><input required type="number" min="0" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="rounded-xl border p-3"/><input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, place: e.target.value })} className="rounded-xl border p-3"/><button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Save item</button>{message && <span className="self-center text-sm text-red-700">{message}</span>}</form></Card>}{loading ? <Empty>Loading equipment…</Empty> : error ? <Empty>{error}. Sign in as an administrator or coach to manage inventory.</Empty> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.map(item => <Card key={item._id}><Badge tone={item.condition === "Good" ? "lime" : "red"}>{item.condition}</Badge><h2 className="mt-4 font-black">{item.name}</h2><p className="mt-2 text-sm text-slate-500">{item.category} · {item.available}/{item.quantity} available<br/>{item.location || "No location set"}</p></Card>)}</div>}</Page>; }
export function Coaches() {
  const [refresh, setRefresh] = useState(0);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const empty = { name: "", specialty: "Cricket coach", phone: "", email: "", status: "Active" };
  const [form, setForm] = useState(empty);
  const { loading, error, data } = useLoad(() => coachesService.list().then(r => r.data.coaches), [refresh]);

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (editing) await coachesService.update(editing, form);
      else await coachesService.create(form);
      setForm(empty);
      setEditing(null);
      setRefresh(x => x + 1);
      setMessage(editing ? "Coach updated." : "Coach added.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Unable to save coach.");
    }
  };

  const edit = (coach) => {
    setEditing(coach._id);
    setForm({ name: coach.name || "", specialty: coach.specialty || "Cricket coach", phone: coach.phone || "", email: coach.email || "", status: coach.status || "Active" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this coach?")) return;
    try { await coachesService.remove(id); setRefresh(x => x + 1); }
    catch (err) { setMessage(err?.response?.data?.message || "Unable to delete coach."); }
  };

  return <Page title="Coaches" eyebrow="Coaching staff">
    <Card className="mb-5">
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Coach name" className="rounded-xl border p-3"/>
        <input value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })} placeholder="Specialization" className="rounded-xl border p-3"/>
        <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded-xl border p-3"/>
        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="rounded-xl border p-3"/>
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="rounded-xl border p-3"><option>Active</option><option>Inactive</option></select>
        <div className="flex gap-2">
          <button className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{editing ? "Update coach" : "Add coach"}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm(empty); }} className="rounded-xl border px-4 py-3 text-sm font-bold">Cancel</button>}
        </div>
      </form>
      {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
    </Card>
    {loading ? <Empty>Loading coaches…</Empty> : error ? <Empty>{error}</Empty> :
      data.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.map(c =>
        <Card key={c._id}>
          <div className="flex items-start justify-between gap-3">
            <div><h2 className="font-black">{c.name}</h2><p className="mt-1 text-sm text-rscc-blue">{c.specialty}</p></div>
            <Badge tone={c.status === "Active" ? "lime" : "slate"}>{c.status}</Badge>
          </div>
          <div className="mt-5 space-y-2 text-sm text-slate-600">
            <p>{c.phone || "No phone number"}</p><p className="break-all">{c.email || "No email"}</p>
          </div>
          <div className="mt-5 flex gap-3 border-t pt-4"><button onClick={() => edit(c)} className="text-sm font-bold text-slate-800">Edit</button><button onClick={() => remove(c._id)} className="text-sm font-bold text-red-700">Delete</button></div>
        </Card>
      )}</div> : <Empty>No coaches have been added yet.</Empty>}
  </Page>;
}
export function Fees() {
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const empty = { player: "", amount: "", dueDate: "", status: "Pending", note: "" };
  const [form, setForm] = useState(empty);
  const { loading, error, data } = useLoad(() => feesService.list().then(r => r.data.fees), [refresh]);
  const { data: players = [] } = useLoad(() => playersService.list().then(r => r.data.players), []);

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

  return <Page title="Fees & payments" eyebrow="Academy billing">
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
  </Page>;
}
export function Calendar() {
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const empty = { title: "", date: "", type: "Training", place: "", description: "" };
  const [form, setForm] = useState(empty);
  const { loading, error, data } = useLoad(async () => {
    const [events, matches] = await Promise.all([eventsService.list(), matchesService.list()]);
    return [
      ...events.data.events.map(e => ({ id: e._id, title: e.title, date: e.date, type: e.type || "Event", location: e.place, description: e.description })),
      ...matches.data.matches.map(m => ({ id: m._id, title: matchTitle(m), date: m.details?.matchDate, type: "Match", location: m.details?.ground || m.details?.venue }))
    ].filter(x => x.date).sort((a,b) => new Date(a.date) - new Date(b.date));
  }, [refresh]);

  const createEvent = async (e) => {
    e.preventDefault(); setMessage("");
    try { await eventsService.create(form); setForm(empty); setShowForm(false); setRefresh(x => x + 1); setMessage("Event added to calendar."); }
    catch (err) { setMessage(err?.response?.data?.message || "Unable to create event."); }
  };

  return <Page title="Calendar" eyebrow="Academy schedule">
    <div className="mb-5 flex justify-end"><button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{showForm ? "Close" : "+ Add event"}</button></div>
    {showForm && <Card className="mb-5"><form onSubmit={createEvent} className="grid gap-3 sm:grid-cols-2">
      <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Event title" className="rounded-xl border p-3"/>
      <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="rounded-xl border p-3"/>
      <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="rounded-xl border p-3"><option>Training</option><option>Meeting</option><option>Fitness</option><option>Other</option></select>
      <input value={form.location} onChange={e => setForm({ ...form, place: e.target.value })} placeholder="Location" className="rounded-xl border p-3"/>
      <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="min-h-24 rounded-xl border p-3 sm:col-span-2"/>
      <button className="rounded-xl bg-rscc-blue px-4 py-3 text-sm font-bold text-slate-950">Add to calendar</button>
    </form>{message && <p className="mt-3 text-sm text-slate-600">{message}</p>}</Card>}
    {loading ? <Empty>Loading calendar…</Empty> : error ? <Empty>{error}</Empty> : data.length ? <div className="space-y-3">{data.map(i => <Card key={i.type+i.id}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><Badge tone={i.type === "Match" ? "lime" : "slate"}>{i.type}</Badge><h2 className="mt-3 font-black">{i.title}</h2><p className="mt-1 text-sm text-slate-500">{formatDate(i.date)}</p>{i.location && <p className="mt-1 text-sm text-slate-500">{i.location}</p>}</div><CalendarDays className="text-rscc-blue" size={22}/></div>
    </Card>)}</div> : <Empty>No upcoming calendar items yet.</Empty>}
  </Page>;
}
export function Reports() {
  const { loading, error, data } = useLoad(() => reportsService.academy().then(r => r.data.report), []);
  if (loading) return <Page title="Academy reports" eyebrow="Live summary"><Empty>Loading report…</Empty></Page>;
  if (error) return <Page title="Academy reports" eyebrow="Live summary"><Empty>{error}</Empty></Page>;
  const cards = [["Players", data.players], ["Matches", data.matches], ["Attendance sessions", data.attendanceSessions], ["Fee records", data.totalFees], ["Fees received", `₹${Number(data.paid || 0).toLocaleString("en-IN")}`], ["Fees due", `₹${Number(data.due || 0).toLocaleString("en-IN")}`]];
  return <Page title="Academy reports" eyebrow="Live summary">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label,value]) => <Card key={label}><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></Card>)}</div>
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <Card><h2 className="font-black">Attendance breakdown</h2><div className="mt-5 space-y-3">{Object.entries(data.attendanceBreakdown || {}).map(([label,value]) => <div key={label} className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"><span className="capitalize">{label}</span><b>{value}</b></div>)}</div></Card>
      <Card><h2 className="font-black">Players by age group</h2><div className="mt-5 space-y-3">{Object.entries(data.playersByCategory || {}).map(([label,value]) => <div key={label} className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"><span>{label}</span><b>{value}</b></div>)}</div></Card>
    </div>
    <Card className="mt-5"><h2 className="font-black">Report scope</h2><p className="mt-2 text-sm leading-6 text-slate-500">This report summarizes live academy records from players, fixtures, attendance sessions and fee records. Advanced cricket performance analytics will be added later with the Statistics module.</p></Card>
  </Page>;
}
export function Notifications() { const [refresh, setRefresh] = useState(0); const { loading, error, data } = useLoad(() => notificationsService.list().then(r => r.data), [refresh]); const read = async id => { await notificationsService.markRead(id); setRefresh(x => x + 1); }; return <Page title="Notifications" eyebrow="Academy alerts"><div className="mb-5 text-right"><button onClick={() => notificationsService.markAllRead().then(() => setRefresh(x => x + 1))} className="rounded-xl border px-4 py-3 text-sm font-bold">Mark all read</button></div>{loading ? <Empty>Loading notifications…</Empty> : error ? <Empty>{error}. Sign in to see your notifications.</Empty> : <div className="space-y-3">{data.notifications.map(notification => <Card key={notification._id} className={notification.read ? "opacity-70" : "border-lime-400"}><button onClick={() => !notification.read && read(notification._id)} className="w-full text-left"><div className="flex items-center justify-between gap-4"><h2 className="font-black">{notification.title}</h2>{!notification.read && <Badge>New</Badge>}</div><p className="mt-2 text-sm text-slate-600">{notification.body}</p><small className="mt-2 block text-slate-400">{formatDate(notification.createdAt)}</small></button></Card>)}</div>}</Page>; }
export function Settings() { const { loading, error, data: user } = useLoad(() => authService.me().then(r => r.data.user), []); const [form, setForm] = useState(null); const [message, setMessage] = useState(""); useEffect(() => { if (user) setForm({ name: user.name || "", phone: user.phone || "", avatar: user.avatar || "", notificationPreferences: user.notificationPreferences || { announcements: true, events: true, matches: true } }); }, [user]); const save = async e => { e.preventDefault(); try { await authService.updateMe(form); setMessage("Settings saved."); } catch (err) { setMessage(err?.response?.data?.message || "Unable to save settings"); } }; return <Page title="Settings" eyebrow="Account & notifications">{loading ? <Empty>Loading settings…</Empty> : error || !form ? <Empty>{error || "Sign in to manage settings."}</Empty> : <Card className="max-w-2xl"><form onSubmit={save}><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">Full name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1.5 w-full rounded-xl border p-3 font-normal"/></label><label className="text-sm font-bold">Phone<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-1.5 w-full rounded-xl border p-3 font-normal"/></label>
<label className="text-sm font-bold sm:col-span-2">Avatar URL<input value={form.avatar || ""} onChange={e => setForm({ ...form, avatar: e.target.value })} placeholder="https://..." className="mt-1.5 w-full rounded-xl border p-3 font-normal"/></label></div><h2 className="mt-7 font-black">Notification preferences</h2><div className="mt-3 space-y-3">{[["announcements", "Announcements"], ["events", "Events"], ["matches", "Match updates"]].map(([key, label]) => <label key={key} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm font-bold">{label}<input type="checkbox" checked={form.notificationPreferences[key] !== false} onChange={e => setForm({ ...form, notificationPreferences: { ...form.notificationPreferences, [key]: e.target.checked } })}/></label>)}</div><button className="mt-6 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Save settings</button>{message && <span className="ml-3 text-sm text-slate-600">{message}</span>}</form></Card>}</Page>; }
export function Auth({ mode = "Login" }) { const isRegister = mode === "Create account"; const [form, setForm] = useState({ name: "", email: "", password: "" }); const [error, setError] = useState(""); const [loading, setLoading] = useState(false); const navigate = useNavigate(); const submit = async event => { event.preventDefault(); setLoading(true); setError(""); try { if (isRegister) { await authService.register({ ...form, role: "viewer" }); navigate("/login", { state: { message: "Account created. Please sign in." } }); } else { const { data } = await authService.login({ email: form.email, password: form.password }); localStorage.setItem("accessToken", data.accessToken); localStorage.setItem("refreshToken", data.refreshToken); localStorage.setItem("user", JSON.stringify(data.user)); navigate("/dashboard"); } } catch (e) { setError(e?.response?.data?.message || "Unable to continue"); } finally { setLoading(false); } }; return <div className="grid min-h-screen place-items-center bg-[#f7f8f6] p-6"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"><Link to="/" className="font-black text-rscc-blue">RSCC</Link><h1 className="mt-6 text-3xl font-black">{mode}</h1><p className="mt-2 text-sm text-slate-500">{isRegister ? "Create your academy account." : "Sign in to the academy portal."}</p>{isRegister && <input required placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-6 w-full rounded-xl border p-3"/>}<input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-4 w-full rounded-xl border p-3"/><input required minLength="6" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="mt-4 w-full rounded-xl border p-3"/>{error && <p className="mt-3 text-sm text-red-700">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white disabled:opacity-60">{loading ? "Please wait…" : mode}</button><p className="mt-5 text-center text-sm text-slate-500">{isRegister ? <>Already have an account? <Link className="font-bold text-rscc-blue" to="/login">Log in</Link></> : <>New to RSCC? <Link className="font-bold text-rscc-blue" to="/register">Create account</Link></>}</p></form></div>; }
export function Forgot({ reset = false }) { const [form, setForm] = useState({ email: "", token: "", password: "" }); const [message, setMessage] = useState(""); const submit = async e => { e.preventDefault(); try { const response = reset ? await authService.resetPassword({ token: form.token, password: form.password }) : await authService.forgotPassword({ email: form.email }); setMessage(response.data.resetToken ? `${response.data.message} Development token: ${response.data.resetToken}` : response.data.message); } catch (err) { setMessage(err?.response?.data?.message || "Unable to continue"); } }; return <div className="grid min-h-screen place-items-center bg-[#f7f8f6] p-6"><Card className="w-full max-w-md"><h1 className="text-xl font-black">{reset ? "Set new password" : "Password reset"}</h1><p className="mt-2 text-sm text-slate-600">{reset ? "Enter the reset token and your new password." : "Enter your email to request a 15-minute reset token."}</p><form onSubmit={submit} className="mt-5 space-y-3">{reset ? <><input required placeholder="Reset token" value={form.token} onChange={e => setForm({ ...form, token: e.target.value })} className="w-full rounded-xl border p-3"/><input required minLength="6" type="password" placeholder="New password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border p-3"/></> : <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border p-3"/>}<button className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white">{reset ? "Reset password" : "Request reset"}</button></form>{message && <p className="mt-4 break-all text-sm text-slate-600">{message}</p>}<Link to={reset ? "/login" : "/reset-password"} className="mt-5 inline-block font-bold text-rscc-blue">{reset ? "Back to login" : "I have a reset token"}</Link></Card></div>; }
