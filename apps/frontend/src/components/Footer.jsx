export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-slate-900 text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-12">

          <div>

            <h2 className="text-3xl font-bold">
              RSCC
            </h2>

            <p className="mt-5 text-slate-400 leading-8">

              Rising Star Cricket Club is dedicated to nurturing
              talented cricketers through discipline, hard work,
              and modern coaching methods.

            </p>

          </div>

          <div>

            <h3 className="font-bold text-xl">
              Quick Links
            </h3>

            <ul className="space-y-3 mt-5 text-slate-400">

              <li>
  <a href="#about">About</a>
</li>

<li>
  <a href="#gallery">Gallery</a>
</li>

<li>
  <a href="#portal">Academy Portal</a>
</li>

<li>
  <a href="#contact">Contact</a>
</li>

            </ul>

          </div>

          <div>

            <h3 className="font-bold text-xl">
              Contact
            </h3>

            <p className="mt-5 text-slate-400">
              📍 Rising Star Cricket Club
            </p>

            <p className="text-slate-400">
              📞 +91 XXXXX XXXXX
            </p>

            <p className="text-slate-400">
              ✉ info@rscc.com
            </p>

          </div>

        </div>

        <hr className="my-10 border-slate-700"/>

        <p className="text-center text-slate-500">

         © {new Date().getFullYear()} Rising Star Cricket Club.

        </p>

      </div>
    </footer>
  );
}
