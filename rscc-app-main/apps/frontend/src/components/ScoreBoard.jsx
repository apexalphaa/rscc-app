import { formatOvers } from "../utils/cricket";

export default function ScoreBoard({ match }) {

  return (

    <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-3xl p-8 text-white">

      <p className="uppercase tracking-widest">

        LIVE SCORE

      </p>

      <h1 className="text-6xl font-black mt-5">

        {match.score}/{match.wickets}

      </h1>

      <p className="text-2xl mt-5">

        Overs : {formatOvers(match.legalBalls)}

      </p>

    </div>

  );

}
