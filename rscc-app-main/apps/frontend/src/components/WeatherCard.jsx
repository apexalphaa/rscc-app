import { CloudSun } from "lucide-react";

export default function WeatherCard() {
  return (

    <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl text-white p-6">

      <div className="flex items-center gap-3">

        <CloudSun size={36}/>

        <div>

          <h2 className="text-2xl font-bold">

            31°C

          </h2>

          <p>

            Sunny

          </p>

        </div>

      </div>

      <p className="mt-5 opacity-90">

        Perfect weather for outdoor practice.

      </p>

    </div>

  );
}
