import SectionTitle from "./SectionTitle";

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

        <SectionTitle
          title="Upcoming Events"
          subtitle="Stay updated with training camps, tournaments and academy activities."
        />

        <div className="space-y-6 mt-16">

          {events.map((event) => (
            <div
              key={event.title}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex justify-between items-center"
            >
              <h3 className="font-semibold text-lg">
                {event.title}
              </h3>

              <span className="text-green-700 font-medium">
                {event.date}
              </span>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
