import Button from "./common/Button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">

      <div className="max-w-7xl mx-auto px-6 py-28 text-center">

        <h1 className="text-6xl font-bold">
          Rising Star Cricket Club
        </h1>

        <p className="text-xl text-slate-300 mt-6 max-w-3xl mx-auto">
          Train Hard. Play Smart. Rise Together.
        </p>

        <div className="flex justify-center gap-5 mt-10">

          <Button>
            Join Academy
          </Button>

          <Button>
            Live Scores
          </Button>

        </div>

      </div>

    </section>
  );
}
