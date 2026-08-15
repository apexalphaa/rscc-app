export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-14 items-center">

          <div>

            <h2 className="text-5xl font-bold">
              Why Choose RSCC?
            </h2>

            <p className="mt-8 text-slate-600 leading-8">

              Rising Star Cricket Club provides structured coaching,
              fitness training, match exposure, and player development
              for aspiring cricketers of every age group.

            </p>

            <div className="grid grid-cols-2 gap-5 mt-10">

              <div className="rounded-xl bg-slate-100 p-5">
                🏏 Professional Coaching
              </div>

              <div className="rounded-xl bg-slate-100 p-5">
                💪 Fitness Training
              </div>

              <div className="rounded-xl bg-slate-100 p-5">
                🏆 Tournament Exposure
              </div>

              <div className="rounded-xl bg-slate-100 p-5">
                📊 Performance Analysis
              </div>

            </div>

          </div>

          <img
            src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=900"
            alt="Academy"
            className="rounded-3xl shadow-xl"
          />

        </div>

      </div>
    </section>
  );
}
