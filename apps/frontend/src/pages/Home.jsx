import Button from "../components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      <section className="flex flex-col items-center justify-center text-center py-32">

        <h1 className="text-6xl font-bold text-slate-900">
          Rising Star Cricket Club
        </h1>

        <p className="mt-6 text-xl text-slate-600 max-w-2xl">
          Train Hard. Play Smart. Rise Together.
        </p>

        <div className="flex gap-5 mt-10">

          <Button>
            Join Academy
          </Button>

          <Button>
            Live Scores
          </Button>

        </div>

      </section>

    </div>
  );
}
