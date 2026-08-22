import { ArrowRight, CalendarDays, Dumbbell, HeartPulse, MapPin, Phone, ShieldCheck, Trophy, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BrandLogo from "../components/BrandLogo";
import Footer from "../components/Footer";
import logo from "../assets/rscc-logo.jpg";

const programs = [
  ["Foundation Cricket", "Build strong fundamentals in batting, bowling, fielding and game awareness.", "Ages 7–12"],
  ["Youth Development", "Structured coaching, fitness and match exposure for developing players.", "Ages 13–17"],
  ["Performance Cricket", "Higher-intensity sessions focused on competition, decision-making and consistency.", "Advanced"],
];

const staff = [
  { name: "Head & Batting Coaching", role: "Technical development", icon: Users, text: "Structured batting, technique and match-preparation sessions." },
  { name: "Bowling Coaching", role: "Skills & execution", icon: Trophy, text: "Pace, spin, variations, control and game awareness." },
  { name: "Fitness & Strength", role: "Physical development", icon: Dumbbell, text: "Conditioning and movement work designed for cricket." },
  { name: "Physio & Recovery", role: "Player wellbeing", icon: HeartPulse, text: "Recovery, injury-prevention and return-to-play support." },
  { name: "Performance Analysis", role: "Data & insight", icon: BarChart3, text: "Match review and player-development insights for future growth." },
];

const features = [
  [Users, "Player management", "Profiles, squads and academy records in one place."],
  [CalendarDays, "Training & attendance", "Keep every training session organised and track attendance."],
  [Trophy, "Matches & fixtures", "Schedule academy fixtures and keep the team prepared."],
  [ShieldCheck, "Academy operations", "Coaches, equipment, fees, notices and reports stay connected."],
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(29,78,216,.35),transparent_32%),radial-gradient(circle_at_10%_90%,rgba(201,31,43,.22),transparent_28%)]" />
          <div className="rscc-container relative grid items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-6 lg:py-28">
            <div>
              <div className="mb-7"><BrandLogo dark size="lg" /></div>
              <p className="rscc-eyebrow text-blue-300">Rising Star Cricket Club · Sambalpur</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl">
                Train with purpose.<br /><span className="text-blue-300">Play with confidence.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                A cricket academy focused on disciplined coaching, competitive match exposure, fitness and long-term player development.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-rscc-blue hover:bg-blue-50">Join RSCC <ArrowRight className="ml-1 inline" size={17}/></Link>
                <a href="#about" className="rounded-xl border border-white/25 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10">Explore Academy</a>
                <a href="tel:7978671307" className="rounded-xl border border-white/25 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10"><Phone className="mr-1 inline" size={16}/> Enquire</a>
              </div>
            </div>
            <div className="relative">
              <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="text-sm font-bold text-white">RSCC Academy</span>
                  <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-300">Since 2013</span>
                </div>
                <div className="py-10 text-center">
                  <img src={logo} alt="RSCC" className="mx-auto h-40 w-40 rounded-full object-cover ring-4 ring-white/10" />
                  <p className="mt-6 text-2xl font-black text-white">Train · Compete · Rise</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">A connected academy for players, coaches and cricket operations.</p>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center text-xs text-slate-400">
                  <span><b className="block text-lg text-white">Players</b>Development</span>
                  <span><b className="block text-lg text-white">Teams</b>Competition</span>
                  <span><b className="block text-lg text-white">Coaches</b>Guidance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="rscc-section bg-white">
          <div className="rscc-container grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="rscc-eyebrow">About us</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A place to learn the game and grow through it.</h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-7">
              <p>Founded in 2013, Rising Star Cricket Club, Sambalpur is committed to developing disciplined, confident and competitive cricketers through structured coaching, fitness and match exposure.</p>
              <p>We focus on long-term player development: strong fundamentals, good habits, teamwork, competitive experience and a supportive cricket environment.</p>
            </div>
          </div>
          <div className="rscc-container mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["2013", "Founded"],
              ["🏏", "Structured coaching"],
              ["💪", "Fitness focus"],
              ["🏆", "Match exposure"],
              ["📈", "Player development"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-xl font-black text-rscc-blue">{value}</div>
                <div className="mt-2 text-sm font-semibold text-slate-600">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="programs" className="rscc-section bg-slate-50">
          <div className="rscc-container">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div><p className="rscc-eyebrow">Training programs</p><h2 className="mt-2 text-3xl font-black">Coaching built around the player</h2></div>
              <a href="tel:7978671307" className="text-sm font-bold text-rscc-blue">Enquire about training →</a>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {programs.map(([title, text, level], i) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${i === 1 ? "bg-red-50 text-rscc-red" : "bg-blue-50 text-rscc-blue"}`}><Dumbbell size={20}/></div>
                <span className="mt-6 inline-block text-xs font-bold uppercase tracking-wider text-slate-400">{level}</span>
                <h3 className="mt-2 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </article>)}
            </div>
          </div>
        </section>

        <section id="coaches" className="rscc-section bg-white">
          <div className="rscc-container">
            <p className="rscc-eyebrow">Our coaching & support team</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black">People who stay close to the player</h2>
                <p className="mt-3 max-w-2xl text-slate-600">Coaching is only one part of player development. RSCC is built around technical training, fitness, recovery and performance insight.</p>
              </div>
              <Link to="/public-coaches" className="text-sm font-bold text-rscc-blue">View team →</Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
              {staff.map(({ name, role, icon: Icon, text }) => (
                <div key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-rscc-blue shadow-sm"><Icon size={21}/></div>
                  <h3 className="mt-5 font-black">{name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-rscc-red">{role}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="events" className="rscc-section bg-slate-950 text-white">
          <div className="rscc-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div><p className="rscc-eyebrow text-red-300">Academy life</p><h2 className="mt-2 text-3xl font-black">Training, fixtures and events — organised in one place.</h2><p className="mt-4 max-w-2xl leading-7 text-slate-400">Members get role-based access to the RSCC academy portal, while guests can explore the public academy experience and enquire about training.</p></div>
            <a href="tel:7978671307" className="rounded-xl bg-white px-5 py-3.5 text-center text-sm font-extrabold text-slate-950">Training & Admissions · 79786 71307</a>
          </div>
        </section>

        <section className="rscc-section bg-white">
          <div className="rscc-container">
            <p className="rscc-eyebrow">Academy capabilities</p><h2 className="mt-2 text-3xl font-black">Everything connected around the academy</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([Icon, title, text]) => <div key={title} className="rounded-2xl border border-slate-200 p-5">
                <Icon className="text-rscc-blue" size={22}/><h3 className="mt-5 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>)}
            </div>
          </div>
        </section>

        <section className="rscc-section bg-slate-50">
          <div className="rscc-container grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <p className="rscc-eyebrow">Get in touch</p>
              <h2 className="mt-2 text-3xl font-black">Training & admissions</h2>
              <p className="mt-3 text-slate-600">For coaching, admissions, academy timings and programme enquiries:</p>
              <a href="tel:7978671307" className="mt-6 inline-flex items-center gap-2 text-2xl font-black text-rscc-blue"><Phone size={22}/> 79786 71307</a>
              <p className="mt-3 text-sm text-slate-500">Sambalpur, Odisha</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[.18em] text-blue-300">Website development</p>
              <h2 className="mt-2 text-3xl font-black">Designed & developed by Ankit Sharma</h2>
              <p className="mt-3 text-slate-300">A dedicated web platform for Rising Star Cricket Club.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950" href="https://github.com/apexalphaa" target="_blank" rel="noreferrer">GitHub</a>
                <a className="rounded-xl border border-white/20 px-4 py-3 text-sm font-bold text-white" href="https://portfolio-sigma-one-73.vercel.app/" target="_blank" rel="noreferrer">Portfolio</a>
                <a className="rounded-xl border border-white/20 px-4 py-3 text-sm font-bold text-white" href="https://www.linkedin.com/in/ankit-sharma-1a0673235/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="rounded-xl border border-white/20 px-4 py-3 text-sm font-bold text-white" href="mailto:11.qmsharmankit@gmail.com">Email</a>
              </div>
              <p className="mt-4 text-xs text-slate-400">Developer contact: 9337813060 · 11.qmsharmankit@gmail.com</p>
            </div>
          </div>
        </section>

        <section className="rscc-section bg-slate-50">
          <div className="rscc-container rounded-3xl bg-rscc-blue px-6 py-12 text-center text-white sm:px-10">
            <MapPin className="mx-auto" size={22}/>
            <h2 className="mt-4 text-3xl font-black">Ready to be part of RSCC?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100">Create your member account or speak directly to the academy about training and admissions.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/register" className="rounded-xl bg-white px-5 py-3 font-bold text-rscc-blue">Join RSCC</Link>
              <a href="tel:7978671307" className="rounded-xl border border-white/30 px-5 py-3 font-bold text-white">Call 79786 71307</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
