import Input from "./common/Input";
import Button from "./common/Button";
import FormField from "./FormField";
import Select from "./Select";
import TextArea from "./TextArea";

export default function PlayerForm({ onCancel }) {
  return (
    <form className="grid md:grid-cols-2 gap-6">

      <FormField label="Player Name" required>
        <Input placeholder="Enter player name" />
      </FormField>

      <FormField label="Date of Birth" required>
        <Input type="date" />
      </FormField>

      <FormField label="Phone Number">
        <Input placeholder="9876543210" />
      </FormField>

      <FormField label="Parent / Guardian">
        <Input placeholder="Guardian Name" />
      </FormField>

      <FormField label="Role">
        <Select
          options={[
            "Batsman",
            "Bowler",
            "All Rounder",
            "Wicket Keeper",
          ]}
        />
      </FormField>

      <FormField label="Batting Style">
        <Select
          options={[
            "Right Hand",
            "Left Hand",
          ]}
        />
      </FormField>

      <FormField label="Bowling Style">
        <Select
          options={[
            "Right Arm Fast",
            "Right Arm Medium",
            "Left Arm Fast",
            "Left Arm Spin",
            "Off Spin",
            "Leg Spin",
          ]}
        />
      </FormField>

      <FormField label="Jersey Number">
        <Input placeholder="7" />
      </FormField>

      <div className="md:col-span-2">

        <FormField label="Address">
          <TextArea
            placeholder="Enter complete address"
          />
        </FormField>

      </div>

      <div className="md:col-span-2">

        <FormField label="Profile Photo">
          <input
            type="file"
            className="w-full border rounded-xl p-3"
          />
        </FormField>

      </div>

      <div className="md:col-span-2 flex justify-end gap-4">

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
