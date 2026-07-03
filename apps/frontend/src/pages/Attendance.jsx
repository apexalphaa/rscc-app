import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

import AttendanceSessionInfo from "../components/AttendanceSessionInfo";
import AttendanceProgress from "../components/AttendanceProgress";
import AttendanceNotes from "../components/AttendanceNotes";
import AttendanceFooter from "../components/AttendanceFooter";

import attendanceDummyPlayers from "../data/attendanceDummyPlayers";

export default function Attendance() {

  const attendance = attendanceDummyPlayers.filter(
    (player) => player.present
  ).length;

  return (

    <DashboardLayout>

      <PageHeader
        title="Attendance"
        subtitle="Track daily attendance"
      />

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

    </DashboardLayout>

  );

}
