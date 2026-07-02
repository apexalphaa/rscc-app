import Button from "./common/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-green-900">

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-36">

        <div className="max-w-3xl">

          <p className="uppercase tracking-[6px] text-green-400 font-semibold">
            Rising Star Cricket Club
          </p>

          <h1 className="text-6xl lg:text-7xl font-black text-white mt-6 leading-tight">

            Train Hard.
            <br />
            Play Smart.
            <br />
            Rise Together.

          </h1>

          <p className="text-slate-300 text-xl mt-8 leading-8">

            Building disciplined cricketers through structured coaching,
            competitive matches and performance-driven development.

          </p>

          <div className="flex gap-5 mt-12">

            <Button>
              Join Academy
            </Button>

            <Button className="bg-white text-slate-900 hover:bg-slate-100">
              View Programs
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}
