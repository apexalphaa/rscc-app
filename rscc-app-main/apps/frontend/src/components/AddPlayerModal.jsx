import { useState } from "react";
import Button from "./common/Button";

export default function AddPlayerModal({ open, onClose }) {

  const [form, setForm] = useState({
    name: "",
    age: "",
    role: "",
    batch: "",
  });

  if (!open) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">

          Add Player

        </h2>

        <div className="space-y-4">

          <input
            name="name"
            placeholder="Player Name"
            className="w-full border rounded-xl p-3"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            className="w-full border rounded-xl p-3"
            value={form.age}
            onChange={handleChange}
          />

          <select
            name="role"
            className="w-full border rounded-xl p-3"
            value={form.role}
            onChange={handleChange}
          >

            <option value="">Role</option>

            <option>Batsman</option>

            <option>Bowler</option>

            <option>All Rounder</option>

            <option>Wicket Keeper</option>

          </select>

          <select
            name="batch"
            className="w-full border rounded-xl p-3"
            value={form.batch}
            onChange={handleChange}
          >

            <option value="">Batch</option>

            <option>U14</option>

            <option>U16</option>

            <option>U19</option>

          </select>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <Button
            className="bg-slate-600"
            onClick={onClose}
          >

            Cancel

          </Button>

          <Button>

            Save Player

          </Button>

        </div>

      </div>

    </div>
  );

}
