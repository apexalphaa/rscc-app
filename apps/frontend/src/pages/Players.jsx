import Button from "../components/common/Button";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import PlayerCard from "../components/PlayerCard";

const players = [];

export default function Players() {
  return (
    <div className="p-8">

      <PageHeader
        title="Players"
        subtitle="Manage academy players"
        action={
          <Button>
            + Add Player
          </Button>
        }
      />

      <div className="flex justify-between items-center mb-8">

        <SearchBar
          placeholder="Search player..."
        />

      </div>

      {players.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-16 text-center">

          <h2 className="text-2xl font-bold">
            No Players Yet
          </h2>

          <p className="text-slate-500 mt-3">

            Click "Add Player" to register your first player.

          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {players.map((player) => (

            <PlayerCard
              key={player.id}
              player={player}
            />

          ))}

        </div>

      )}

    </div>
  );
}
