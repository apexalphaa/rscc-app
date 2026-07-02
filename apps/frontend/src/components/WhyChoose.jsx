import SectionTitle from "./SectionTitle";

const reasons = [
  {
    title: "Professional Coaching",
    desc: "Experienced coaches focused on technical and mental development.",
  },
  {
    title: "Match Exposure",
    desc: "Regular practice matches and tournaments for every age group.",
  },
  {
    title: "Fitness Programs",
    desc: "Structured strength, endurance and agility sessions.",
  },
  {
    title: "Performance Analytics",
    desc: "Track progress using detailed player statistics.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          title="Why Choose RSCC?"
          subtitle="Our structured coaching and player development programs help every cricketer reach their full potential."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-4 text-slate-600 leading-7">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
