import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

import EquipmentOverview from "../components/EquipmentOverview";
import EquipmentActions from "../components/EquipmentActions";
import EquipmentInventory from "../components/EquipmentInventory";
import EquipmentRepairQueue from "../components/EquipmentRepairQueue";
import EquipmentAlerts from "../components/EquipmentAlerts";

export default function Equipment() {

  return (

    <DashboardLayout>

      <PageHeader
        title="Equipment"
        subtitle="Academy Equipment Management"
      />

      <div className="mt-8">

        <EquipmentOverview />

      </div>

      <div className="mt-8">

        <EquipmentActions />

      </div>

      <div className="mt-8">

        <EquipmentInventory />

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <EquipmentRepairQueue />

        <EquipmentAlerts />

      </div>

    </DashboardLayout>

  );

}
