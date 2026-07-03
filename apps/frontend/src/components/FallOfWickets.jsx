const wickets = [

  {
    score:"25/1",
    batter:"Rahul Sharma",
    over:"3.2",
  },

  {
    score:"68/2",
    batter:"Aryan Singh",
    over:"8.5",
  },

];

export default function FallOfWickets() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Fall of Wickets

      </h2>

      <div className="space-y-4">

        {wickets.map((item,index)=>(

          <div
            key={index}
            className="flex justify-between border rounded-xl p-4"
          >

            <div>

              <strong>{item.score}</strong>

              <p>{item.batter}</p>

            </div>

            <div>

              {item.over}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
