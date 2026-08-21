import Button from "./common/Button";

export default function ExtraButtons({

  wicket,

  wide,

  noBall,

  dotBall,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-6">

        Ball Events

      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <Button
          onClick={dotBall}
        >
          Dot Ball
        </Button>

        <Button
          className="bg-red-600"
          onClick={wicket}
        >
          Wicket
        </Button>

        <Button
          className="bg-yellow-500"
          onClick={wide}
        >
          Wide
        </Button>

        <Button
          className="bg-blue-600"
          onClick={noBall}
        >
          No Ball
        </Button>

      </div>

    </div>

  );

}
