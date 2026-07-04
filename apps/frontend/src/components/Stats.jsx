const stats = [
  { value: "400+", label: "Registered Players" },
  { value: "18+", label: "Professional Coaches" },
  { value: "35+", label: "Tournaments Played" },
  { value: "12", label: "Years of Excellence" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <h2 className="text-5xl font-black text-green-700">

                {stat.value}

              </h2>

              <p className="mt-5 text-slate-500 text-lg">

                {stat.label}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
