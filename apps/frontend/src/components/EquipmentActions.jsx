import Button from "./common/Button";

export default function EquipmentActions() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Quick Actions

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

        <Button>Add Equipment</Button>

        <Button>Issue Equipment</Button>

        <Button>Return Equipment</Button>

        <Button>Repair Queue</Button>

      </div>

    </div>

  );

}
