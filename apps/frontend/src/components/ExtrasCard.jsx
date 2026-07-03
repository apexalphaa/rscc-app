export default function ExtrasCard({ match }) {

  const extras = match.extras;

  const total =
    extras.wide +
    extras.noBall +
    extras.bye +
    extras.legBye;

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Extras

      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">

          <span>Wides</span>

          <span>{extras.wide}</span>

        </div>

        <div className="flex justify-between">

          <span>No Balls</span>

          <span>{extras.noBall}</span>

        </div>

        <div className="flex justify-between">

          <span>Byes</span>

          <span>{extras.bye}</span>

        </div>

        <div className="flex justify-between">

          <span>Leg Byes</span>

          <span>{extras.legBye}</span>

        </div>

        <hr />

        <div className="flex justify-between font-bold">

          <span>Total</span>

          <span>{total}</span>

        </div>

      </div>

    </div>

  );

}
