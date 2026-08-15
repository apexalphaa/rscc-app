const features = [
  {
    title: "Digital Attendance",
    desc: "Track every training session digitally."
  },
  {
    title: "Live Match Scoring",
    desc: "Professional scoring for academy matches."
  },
  {
    title: "Performance Analytics",
    desc: "Detailed statistics for every player."
  },
  {
    title: "Tournament Management",
    desc: "Fixtures, points table and schedules."
  }
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          Everything Your Academy Needs
        </h2>

        <p className="text-center mt-5 text-slate-500 max-w-2xl mx-auto">
          A complete platform to manage players, coaches, tournaments and training.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mt-16">

          {features.map((item) => (

            <div
              key={item.title}
              className="border rounded-3xl p-10 hover:shadow-2xl hover:border-green-600 transition-all"
            >
              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-5 text-slate-600 leading-8">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
