export default function TimelineCard({ match }) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Timeline

      </h2>

      <div className="space-y-3 max-h-80 overflow-y-auto">

        {match.timeline.length===0 && (

          <p className="text-slate-500">

            No deliveries yet.

          </p>

        )}

        {match.timeline.map((ball,index)=>(

          <div

            key={index}

            className="flex justify-between border rounded-xl p-3"

          >

            <span>

              Ball {index+1}

            </span>

            <span>

              {ball.type}

              {ball.runs!==undefined && ` (${ball.runs})`}

            </span>

          </div>

        ))}

      </div>

    </div>

  );

}
