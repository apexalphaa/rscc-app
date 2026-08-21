const links = [
  "Admissions",
  "Training Schedule",
  "Live Matches",
  "Gallery",
  "Contact",
  "Player Portal",
];

export default function QuickLinks() {
  return (
    <section className="py-16 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

          {links.map((item) => (

            <div
              key={item}
              className="rounded-2xl border p-6 text-center hover:border-green-600 hover:shadow-lg transition cursor-pointer"
            >
              {item}
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
