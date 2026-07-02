import DashboardLayout from "../layouts/DashboardLayout";

import PageHeader from "../components/PageHeader";

import CreateAttendanceSession from "../components/CreateAttendanceSession";

import AttendanceSummary from "../components/AttendanceSummary";

import AttendanceToolbar from "../components/AttendanceToolbar";

export default function Attendance() {

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

        <AttendanceSummary />

      </div>

      <div className="mt-8">

        <AttendanceToolbar />

      </div>

      <div className="mt-8 bg-white rounded-3xl border-2 border-dashed border-slate-300 h-96 flex items-center justify-center">

        Attendance table will be added in Pack 2.

      </div>

    </DashboardLayout>

  );

}
