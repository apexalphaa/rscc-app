import Button from "./common/Button";

export default function Hero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600"
        alt="Cricket"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-36 text-center">

        <p className="uppercase tracking-[8px] text-green-400 font-semibold">
          Welcome To
        </p>

        <h1 className="mt-5 text-6xl md:text-7xl font-black leading-tight">
          Rising Star Cricket Club
        </h1>

        <p className="mt-8 max-w-3xl mx-auto text-xl text-slate-200 leading-8">
          Developing the next generation of disciplined, skilled and confident
          cricketers through professional coaching and competitive cricket.
        </p>

        <div className="flex justify-center gap-5 mt-12">

          <Button>Join Academy</Button>

          <Button className="bg-white text-slate-900 hover:bg-slate-200">
            Live Scores
          </Button>

        </div>

      </div>
    </section>
  );
}
