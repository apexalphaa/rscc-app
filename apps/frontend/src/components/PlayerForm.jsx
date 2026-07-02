import Input from "./common/Input";
import Button from "./common/Button";

export default function PlayerForm({ onCancel }) {
  return (
    <form className="space-y-5">

      <Input placeholder="Player Name" />

      <Input type="date" />

      <Input placeholder="Phone Number" />

      <Input placeholder="Parent/Guardian Name" />

      <Input placeholder="Role (Batsman / Bowler / All-rounder / WK)" />

      <Input placeholder="Batting Style" />

      <Input placeholder="Bowling Style" />

      <Input placeholder="Jersey Number" />

      <div>
        <label className="block mb-2 font-medium">
          Profile Photo
        </label>

        <input
          type="file"
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">

        <Button
          type="button"
          className="bg-slate-500 hover:bg-slate-600"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          Save Player
        </Button>

      </div>

    </form>
  );
}
