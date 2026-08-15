import { Search } from "lucide-react";

export default function GlobalSearch() {

  return (

    <div className="relative">

      <Search
        size={18}
        className="absolute left-4 top-3 text-slate-400"
      />

      <input

        placeholder="Search anywhere..."

        className="pl-11 pr-4 py-3 border rounded-xl w-80"

      />

    </div>

  );

}
