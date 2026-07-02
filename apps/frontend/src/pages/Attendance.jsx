import AttendanceSessionInfo from "../components/AttendanceSessionInfo";
import AttendanceProgress from "../components/AttendanceProgress";
import AttendanceNotes from "../components/AttendanceNotes";
import AttendanceFooter from "../components/AttendanceFooter";

<div className="mt-8">

  <AttendanceSessionInfo />

</div>

<div className="mt-8">

  <AttendanceProgress
    attendance={attendance}
    totalPlayers={attendanceDummyPlayers.length}
  />

</div>

<div className="mt-8">

  <AttendanceNotes />

</div>

<div className="mt-8">

  <AttendanceFooter />

</div>
