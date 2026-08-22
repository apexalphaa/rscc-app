import SectionTitle from "./SectionTitle";
import { BarChart3, Dumbbell, HeartPulse, Trophy, Users } from "lucide-react";

const coaches = [
  { name: "Head & Batting Coach", role: "Head Coach", specialization: "Batting & technique", icon: Users },
  { name: "Bowling Coach", role: "Bowling Coach", specialization: "Pace & spin", icon: Trophy },
  { name: "Fitness Coach", role: "Fitness & Strength", specialization: "Conditioning", icon: Dumbbell },
  { name: "Physio & Recovery", role: "Physio", specialization: "Recovery & injury prevention", icon: HeartPulse },
  { name: "Performance Analyst", role: "Performance Analyst", specialization: "Data & match analysis", icon: BarChart3 },
];

export default function Coaches() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Meet Our Coaches & Support Team" subtitle="Technical coaching, fitness, recovery and performance support around the player." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {coaches.map((coach) => {
            const Icon = coach.icon;
            return (
              <div key={coach.role} className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition">
                <div className="h-56 bg-slate-100 grid place-items-center">
                  <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-white bg-blue-50 text-rscc-blue shadow-sm">
                    <Icon size={38}/>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-extrabold uppercase tracking-[.15em] text-rscc-red">{coach.role}</p>
                  <h3 className="text-2xl font-bold mt-2">{coach.name}</h3>
                  <p className="text-slate-600 mt-2">{coach.specialization}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
