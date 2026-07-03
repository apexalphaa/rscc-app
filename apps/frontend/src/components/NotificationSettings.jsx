export default function NotificationSettings() {

  const settings = [

    "Email Notifications",

    "SMS Alerts",

    "Tournament Updates",

    "Attendance Alerts",

    "Fee Reminders",

  ];

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Notifications

      </h2>

      <div className="space-y-4">

        {settings.map(item=>(

          <label
            key={item}
            className="flex justify-between items-center"
          >

            <span>

              {item}

            </span>

            <input
              type="checkbox"
              defaultChecked
            />

          </label>

        ))}

      </div>

    </div>

  );

}
