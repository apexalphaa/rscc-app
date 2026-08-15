const history=[

"21 July 2026",

"20 July 2026",

"19 July 2026",

"18 July 2026",

];

export default function AttendanceHistory(){

    return(

        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">

                Recent Attendance

            </h2>

            <div className="space-y-3">

                {history.map(day=>(

                    <div
                        key={day}
                        className="border rounded-xl p-4"
                    >

                        {day}

                    </div>

                ))}

            </div>

        </div>

    );

}
