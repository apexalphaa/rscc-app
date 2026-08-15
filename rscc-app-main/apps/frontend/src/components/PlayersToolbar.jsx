import { useState } from "react";
import Button from "./common/Button";
import AddPlayerModal from "./AddPlayerModal";

export default function PlayersToolbar({

  search,

  setSearch,

  batch,

  setBatch,

  role,

  setRole,

}) {

  const [open, setOpen] = useState(false);

  return (

    <>

      <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col lg:flex-row gap-4">

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search Player..."
          className="border rounded-xl p-3 flex-1"
        />

        <select
          value={batch}
          onChange={(e)=>setBatch(e.target.value)}
          className="border rounded-xl p-3"
        >

          <option value="">All Batches</option>

          <option>U14</option>

          <option>U16</option>

          <option>U19</option>

        </select>

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          className="border rounded-xl p-3"
        >

          <option value="">All Roles</option>

          <option>Batsman</option>

          <option>Bowler</option>

          <option>All Rounder</option>

          <option>Wicket Keeper</option>

        </select>

        <Button
          onClick={()=>setOpen(true)}
        >

          Add Player

        </Button>

      </div>

      <AddPlayerModal
        open={open}
        onClose={()=>setOpen(false)}
      />

    </>

  );

}
