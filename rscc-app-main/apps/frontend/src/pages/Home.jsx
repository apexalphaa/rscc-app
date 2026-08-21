import { ArrowRight, CalendarDays, ChevronRight, Dumbbell, ShieldCheck, Trophy, Users, MapPin } from "lucide-react";
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
                A cricket academy focused on disciplined coaching, competitive match exposure and long-term player development.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-rscc-blue hover:bg-blue-50">Join RSCC <ArrowRight className="ml-1 inline" size={17}/></Link>
                <a href="#about" className="rounded-xl border border-white/25 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10">Explore Academy</a>
              </div>
            </div>
            <div className="relative">
              <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="text-sm font-bold text-white">RSCC Academy</span>
                  <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-300">Since Sambalpur</span>
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
              <p className="rscc-eyebrow">About RSCC</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A place to learn the game and grow through it.</h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-7">
              <p>Rising Star Cricket Club is built around structured coaching, regular practice, match experience and a supportive cricket community.</p>
              <p>The academy portal brings the day-to-day work of players, coaches and academy management into one organised space.</p>
            </div>
          </div>
        </section>

        <section id="programs" className="rscc-section bg-slate-50">
          <div className="rscc-container">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div><p className="rscc-eyebrow">Training programs</p><h2 className="mt-2 text-3xl font-black">Coaching built around the player</h2></div>
              <Link to="/register" className="text-sm font-bold text-rscc-blue">Enquire about training <ChevronRight className="inline" size={16}/></Link>
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
            <p className="rscc-eyebrow">Our coaches</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-black">Guidance that stays close to the game</h2>
              <Link to="/coaches" className="text-sm font-bold text-rscc-blue">View coaching team →</Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {["Batting & Technique", "Bowling & Skills", "Fitness & Match Preparation"].map((x, i) => <div key={x} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-rscc-blue shadow-sm"><Users size={21}/></div>
                <h3 className="mt-5 font-black">{x}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Structured sessions designed to help players build consistency and confidence.</p>
              </div>)}
            </div>
          </div>
        </section>

        <section id="events" className="rscc-section bg-slate-950 text-white">
          <div className="rscc-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div><p className="rscc-eyebrow text-red-300">Academy life</p><h2 className="mt-2 text-3xl font-black">Training, fixtures and events — organised in one place.</h2><p className="mt-4 max-w-2xl leading-7 text-slate-400">Once signed in, members can access their relevant academy information, while guests can explore the public side of RSCC.</p></div>
            <Link to="/login" className="rounded-xl bg-white px-5 py-3.5 text-center text-sm font-extrabold text-slate-950">Member Login</Link>
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
          <div className="rscc-container rounded-3xl bg-rscc-blue px-6 py-12 text-center text-white sm:px-10">
            <MapPin className="mx-auto" size={22}/>
            <h2 className="mt-4 text-3xl font-black">Ready to be part of RSCC?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100">Create your member account or speak to the academy about training and admissions.</p>
            <div className="mt-7 flex justify-center gap-3">
              <Link to="/register" className="rounded-xl bg-white px-5 py-3 font-bold text-rscc-blue">Join RSCC</Link>
              <Link to="/login" className="rounded-xl border border-white/30 px-5 py-3 font-bold text-white">Member Login</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
