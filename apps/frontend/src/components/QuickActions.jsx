import Button from "./common/Button";

const actions = [
  "Register Player",
  "Mark Attendance",
  "Start Match",
  "Create Tournament",
];

export default function QuickActions() {
  return (
    <section className="bg-white rounded-3xl p-8 shadow-sm">

      <h2 className="text-2xl font-bold">

        Quick Actions

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

        {actions.map((action) => (

          <Button
            key={action}
            className="w-full"
          >
            {action}
          </Button>

        ))}

      </div>

    </section>
  );
}
