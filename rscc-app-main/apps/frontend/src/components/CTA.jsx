import Button from "./common/Button";

export default function CTA() {
  return (
    <section className="bg-green-700 text-white py-24">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold">
          Ready to Begin Your Cricket Journey?
        </h2>

        <p className="mt-6 text-lg">
          Join Rising Star Cricket Club and train with experienced coaches.
        </p>

        <div className="mt-10">

          <Button className="bg-white text-green-700 hover:bg-slate-100">
            Join Academy
          </Button>

        </div>

      </div>
    </section>
  );
}
