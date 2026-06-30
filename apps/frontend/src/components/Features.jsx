const features = [
  {
    title: "Match Scoring",
    icon: "🏏",
    desc: "Live scoring with ball-by-ball updates."
  },
  {
    title: "Attendance",
    icon: "📅",
    desc: "Track player attendance digitally."
  },
  {
    title: "Player Analytics",
    icon: "📈",
    desc: "Performance statistics and trends."
  },
  {
    title: "Tournament",
    icon: "🏆",
    desc: "Fixtures, points table and results."
  }
];

export default function Features() {
  return (
   <section
  id="features"
  className="py-24 bg-white"
>

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="rounded-2xl border p-8 hover:shadow-xl transition"
            >

              <div className="text-5xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-600">
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
