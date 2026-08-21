import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

import ProfileCard from "../components/ProfileCard";
import AcademySettings from "../components/AcademySettings";
import NotificationSettings from "../components/NotificationSettings";
import SecuritySettings from "../components/SecuritySettings";

export default function Settings() {

  return (

    <DashboardLayout>

      <PageHeader
        title="Settings"
        subtitle="Manage Academy Settings"
      />

      <div className="mt-8">

        <ProfileCard />

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <AcademySettings />

        <NotificationSettings />

      </div>

      <div className="mt-8">

        <SecuritySettings />

      </div>

    </DashboardLayout>

  );

}
