import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import PageHeader from "../components/PageHeader";

import CreateAttendanceSession from "../components/CreateAttendanceSession";
import AttendanceSummary from "../components/AttendanceSummary";
import AttendanceToolbar from "../components/AttendanceToolbar";
import AttendanceActions from "../components/AttendanceActions";
import AttendanceTable from "../components/AttendanceTable";

import attendanceDummyPlayers from "../data/attendanceDummyPlayers";

export default function Attendance() {

  const [attendance, setAttendance] = useState({});

  return (

    <DashboardLayout>

      <PageHeader
        title="Attendance"
        subtitle="Track player attendance."
      />

      <div className="mt-8">

        <CreateAttendanceSession />

      </div>

      <div className="mt-8">

        <AttendanceSummary
          attendance={attendance}
        />

      </div>

      <div className="mt-8">

        <AttendanceToolbar />

      </div>

      <div className="mt-8">

        <AttendanceActions
          players={attendanceDummyPlayers}
          setAttendance={setAttendance}
        />

      </div>

      <div className="mt-8">

        <AttendanceTable
          players={attendanceDummyPlayers}
          attendance={attendance}
          setAttendance={setAttendance}
        />

      </div>

    </DashboardLayout>

  );

}
