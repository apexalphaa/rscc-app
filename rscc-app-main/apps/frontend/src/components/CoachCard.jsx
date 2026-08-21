export default function CoachCard({ coach }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-lg transition">

      <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto"></div>

      <h2 className="text-xl font-bold text-center mt-5">

        {coach.name}

      </h2>

      <p className="text-center text-green-600 mt-2">

        {coach.role}

      </p>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">
          <span>Specialization</span>
          <span>{coach.specialization}</span>
        </div>

        <div className="flex justify-between">
          <span>Experience</span>
          <span>{coach.experience}</span>
        </div>

        <div className="flex justify-between">
          <span>Batch</span>
          <span>{coach.batch}</span>
        </div>

        <div className="flex justify-between">
          <span>Contact</span>
          <span>{coach.phone}</span>
        </div>

      </div>

    </div>

  );

}
