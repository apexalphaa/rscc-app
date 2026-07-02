const stats = [
  { value: "400+", label: "Registered Players" },
  { value: "18+", label: "Professional Coaches" },
  { value: "35+", label: "Tournaments Played" },
  { value: "12", label: "Years of Excellence" },
];

export default function Stats() {
  return (
    <section className="-mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-6">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 transition duration-300"
            >
              <h2 className="text-5xl font-black text-green-700">
                {stat.value}
              </h2>

              <p className="mt-4 text-slate-500">
                {stat.label}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
