export default function AttendanceControls({

  setPlayers,

}) {

  function updateAll(status){

    setPlayers(prev=>

      prev.map(player=>({

        ...player,

        status,

      }))

    );

  }

  return(

    <div className="flex flex-wrap gap-4">

      <button
        onClick={()=>updateAll("Present")}
        className="bg-green-600 text-white px-6 py-3 rounded-xl"
      >

        Mark All Present

      </button>

      <button
        onClick={()=>updateAll("Absent")}
        className="bg-red-600 text-white px-6 py-3 rounded-xl"
      >

        Mark All Absent

      </button>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >

        Save Attendance

      </button>

    </div>

  );

}
