import Button from "./common/Button";

export default function PlayersEmptyState({
  onAdd,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 py-24 text-center">

      <h2 className="text-3xl font-bold">

        No Players Registered

      </h2>

      <p className="text-slate-500 mt-4">

        Start by registering your first academy player.

      </p>

      <Button
        className="mt-8"
        onClick={onAdd}
      >
        Register Player
      </Button>

    </div>
  );
}
