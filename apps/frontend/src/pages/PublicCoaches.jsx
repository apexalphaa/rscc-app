import { ArrowLeft, BarChart3, Dumbbell, HeartPulse, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BrandLogo from "../components/BrandLogo";

const staff = [
  { name: "Head & Batting Coach", role: "Technical development", icon: Users, summary: "Technique, batting fundamentals, match preparation and player mentoring." },
  { name: "Bowling Coach", role: "Skills & execution", icon: Trophy, summary: "Pace, spin, variations, control and game awareness." },
  { name: "Fitness Coach", role: "Strength & conditioning", icon: Dumbbell, summary: "Cricket-specific conditioning, speed, mobility and fitness." },
  { name: "Physio & Recovery", role: "Player wellbeing", icon: HeartPulse, summary: "Recovery, injury-prevention and return-to-play support." },
  { name: "Performance Analyst", role: "Data & insight", icon: BarChart3, summary: "Match review, player development insight and performance tracking." },
];

export default function PublicCoaches() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="rscc-container px-5 sm:px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white">← Back to RSCC</Link>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
              <div>
                <div className="mb-6"><BrandLogo dark size="md" /></div>
                <p className="rscc-eyebrow text-red-300">Coaching & support team</p>
                <h1 className="mt-3 text-4xl font-black sm:text-6xl">People behind the player.</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">RSCC brings technical coaching, fitness, recovery and performance support together around long-term player development.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <p className="text-sm font-bold text-slate-300">Training & Admissions</p>
                <a href="tel:7978671307" className="mt-2 block text-2xl font-black text-white">79786 71307</a>
                <p className="mt-2 text-sm text-slate-400">Sambalpur, Odisha</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rscc-section bg-white">
          <div className="rscc-container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {staff.map(({ name, role, icon: Icon, summary }) => (
                <article key={name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex h-72 items-center justify-center bg-slate-100">
                    <div className="grid h-28 w-28 place-items-center rounded-full border-4 border-white bg-blue-50 text-rscc-blue shadow-sm">
                      <Icon size={44}/>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-extrabold uppercase tracking-[.15em] text-rscc-red">{role}</p>
                    <h2 className="mt-2 text-xl font-black">{name}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rscc-section bg-slate-50">
          <div className="rscc-container rounded-3xl border border-slate-200 bg-white p-8 text-center">
            <p className="rscc-eyebrow">Training enquiry</p>
            <h2 className="mt-2 text-3xl font-black">Want to speak to the academy?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">You do not need a member account to ask about programmes, timings or admissions.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="tel:7978671307" className="rounded-xl bg-rscc-blue px-5 py-3 font-bold text-white">Call 79786 71307</a>
              <a href="mailto:11.qmsharmankit@gmail.com?subject=RSCC%20website%20enquiry" className="rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-800">Email enquiry</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
