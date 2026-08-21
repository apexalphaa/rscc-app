import Button from "./common/Button";

export default function AttendanceFooter() {
  return (
    <div className="flex justify-end gap-4">

      <Button className="bg-slate-500">

        Cancel

      </Button>

      <Button>

        Save Attendance

      </Button>

    </div>
  );
}
