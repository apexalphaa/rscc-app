const stats = [
  {
    number: "400+",
    title: "Players"
  },
  {
    number: "25+",
    title: "Tournaments"
  },
  {
    number: "12",
    title: "Certified Coaches"
  },
  {
    number: "2014",
    title: "Established"
  }
];

export default function Stats() {
  return (
    <section className="py-20 bg-slate-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item) => (

            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md p-8 text-center"
            >

              <h2 className="text-4xl font-bold text-green-700">
                {item.number}
              </h2>

              <p className="mt-3 text-slate-600">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
