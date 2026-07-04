import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

import AttendanceSessionInfo from "../components/AttendanceSessionInfo";
import AttendanceSummary from "../components/AttendanceSummary";
import AttendancePlayerList from "../components/AttendancePlayerList";
import AttendanceControls from "../components/AttendanceControls";
import AttendanceHistory from "../components/AttendanceHistory";

import attendanceDummyPlayers from "../data/attendanceDummyPlayers";

export default function Attendance() {

  const [players, setPlayers] = useState(attendanceDummyPlayers);

  return (

    <DashboardLayout>

      <PageHeader
        title="Attendance"
        subtitle="Manage Daily Attendance"
      />

      <div className="mt-8">

        <AttendanceSessionInfo/>

      </div>

      <div className="mt-8">

        <AttendanceSummary
          players={players}
        />

      </div>

      <div className="mt-8">

        <AttendanceControls
          setPlayers={setPlayers}
        />

      </div>

      <div className="mt-8">

        <AttendancePlayerList
          players={players}
          setPlayers={setPlayers}
        />

      </div>

      <div className="mt-8">

        <AttendanceHistory/>

      </div>

    </DashboardLayout>

  );

}
