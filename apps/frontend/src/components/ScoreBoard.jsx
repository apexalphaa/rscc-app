export default function ScoreBoard({

    score,

    wickets,

    overs

}){

    return(

        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white rounded-3xl p-8">

            <p className="uppercase tracking-widest">

                LIVE SCORE

            </p>

            <h1 className="text-6xl font-black mt-4">

                {score}/{wickets}

            </h1>

            <p className="text-2xl mt-4">

                {overs.toFixed(1)} Overs

            </p>

        </div>

    )

}
