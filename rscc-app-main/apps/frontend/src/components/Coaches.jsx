import SectionTitle from "./SectionTitle";

const coaches = [
  {
    name: "Coach Name",
    role: "Head Coach",
  },
  {
    name: "Coach Name",
    role: "Batting Coach",
  },
  {
    name: "Coach Name",
    role: "Bowling Coach",
  },
];

export default function Coaches() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          title="Meet Our Coaches"
          subtitle="Experienced mentors dedicated to developing the next generation of cricketers."
        />

        <div className="grid md:grid-cols-3 gap-10 mt-16">

          {coaches.map((coach) => (
            <div
              key={coach.role}
              className="rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition"
            >
              <div className="h-72 bg-slate-200"></div>

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {coach.name}
                </h3>

                <p className="text-green-700 mt-2">
                  {coach.role}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
