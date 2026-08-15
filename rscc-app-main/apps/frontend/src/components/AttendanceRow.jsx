import Button from "./common/Button";

export default function AttendanceRow({
  player,
  status,
  onChange,
}) {
  return (
    <tr className="border-b">

      <td className="px-6 py-4 font-medium">

        {player.name}

      </td>

      <td className="px-6 py-4">

        {player.batch}

      </td>

      <td className="px-6 py-4">

        <div className="flex gap-2">

          <Button
            className={
              status === "Present"
                ? "bg-green-600"
                : "bg-slate-300 text-black"
            }
            onClick={() => onChange("Present")}
          >
            Present
          </Button>

          <Button
            className={
              status === "Absent"
                ? "bg-red-600"
                : "bg-slate-300 text-black"
            }
            onClick={() => onChange("Absent")}
          >
            Absent
          </Button>

          <Button
            className={
              status === "Late"
                ? "bg-yellow-500"
                : "bg-slate-300 text-black"
            }
            onClick={() => onChange("Late")}
          >
            Late
          </Button>

        </div>

      </td>

    </tr>
  );
}
