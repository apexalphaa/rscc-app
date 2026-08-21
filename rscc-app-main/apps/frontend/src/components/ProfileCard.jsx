export default function ProfileCard() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-8">

      <div className="flex items-center gap-6">

        <div className="w-28 h-28 rounded-full bg-slate-200"></div>

        <div>

          <h2 className="text-3xl font-bold">

            Admin User

          </h2>

          <p className="text-slate-500 mt-2">

            Academy Administrator

          </p>

          <p className="mt-3">

            admin@rscc.com

          </p>

        </div>

      </div>

    </div>

  );

}
