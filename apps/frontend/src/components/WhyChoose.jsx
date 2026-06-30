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

        <h2 className="text-5xl font-bold text-center">
          Why Choose RSCC?
        </h2>

        <p className="text-center text-slate-500 mt-4 max-w-3xl mx-auto">
          We focus on long-term player development with modern coaching methods.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md p-8"
            >
              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-4 text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
