export default function TournamentHeaderCard() {

  return (

    <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-3xl text-white p-8">

      <p className="uppercase tracking-widest opacity-80">

        Current Tournament

      </p>

      <h2 className="text-4xl font-black mt-3">

        RSCC Summer Cup 2026

      </h2>

      <div className="flex flex-wrap gap-8 mt-8">

        <div>

          <p className="text-green-100">

            Teams

          </p>

          <h3 className="text-3xl font-bold">

            8

          </h3>

        </div>

        <div>

          <p className="text-green-100">

            Matches

          </p>

          <h3 className="text-3xl font-bold">

            24

          </h3>

        </div>

        <div>

          <p className="text-green-100">

            Status

          </p>

          <h3 className="text-3xl font-bold">

            LIVE

          </h3>

        </div>

      </div>

    </div>

  );

}
