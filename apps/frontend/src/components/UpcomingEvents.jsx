const events = [
  {
    title: "Summer Cricket Camp",
    date: "15 June 2026",
  },
  {
    title: "Inter Academy Tournament",
    date: "28 June 2026",
  },
  {
    title: "Fitness Assessment",
    date: "5 July 2026",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-24 bg-slate-100">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          Upcoming Events
        </h2>

        <div className="space-y-6 mt-14">

          {events.map((event) => (

            <div
              key={event.title}
              className="bg-white rounded-2xl p-6 shadow flex justify-between"
            >
              <h3 className="font-semibold">
                {event.title}
              </h3>

              <span className="text-green-700">
                {event.date}
              </span>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
