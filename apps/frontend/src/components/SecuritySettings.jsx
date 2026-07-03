import Button from "./common/Button";

export default function SecuritySettings() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Security

      </h2>

      <div className="space-y-4">

        <Button>

          Change Password

        </Button>

        <Button>

          Enable Two Factor Authentication

        </Button>

        <Button className="bg-red-600">

          Logout

        </Button>

      </div>

    </div>

  );

}
