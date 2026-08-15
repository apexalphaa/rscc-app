import Button from "./common/Button";

export default function AttendanceActions({
  players,
  setAttendance,
}) {

  function markAllPresent() {

    const obj = {};

    players.forEach((player) => {
      obj[player.id] = "Present";
    });

    setAttendance(obj);

  }

  function clearAttendance() {

    setAttendance({});

  }

  return (

    <div className="flex gap-4">

      <Button
        onClick={markAllPresent}
      >
        Mark All Present
      </Button>
      <Button
  className="bg-red-600"
  onClick={() => {
    const obj = {};
    players.forEach(player => {
      obj[player.id] = "Absent";
    });
    setAttendance(obj);
  }}
>
  Mark All Absent
</Button>
      <Button
        className="bg-slate-600"
        onClick={clearAttendance}
      >
        Clear
      </Button>

    </div>

  );

}
