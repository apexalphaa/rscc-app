import SearchBar from "./SearchBar";
import FilterSelect from "./FilterSelect";
import Button from "./common/Button";

import playerRoles from "../data/playerRoles";
import playerBatches from "../data/playerBatches";

export default function PlayersToolbar({
  onAdd,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="grid lg:grid-cols-4 gap-4">

        <SearchBar
          placeholder="Search by name, phone or player ID..."
        />

        <FilterSelect
          label="Role"
          options={playerRoles}
        />

        <FilterSelect
          label="Batch"
          options={playerBatches}
        />

        <div className="flex items-end">

          <Button
            className="w-full"
            onClick={onAdd}
          >
            Register Player
          </Button>

        </div>

      </div>

    </div>
  );
}
