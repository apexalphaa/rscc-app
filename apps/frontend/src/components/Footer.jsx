export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-slate-900 text-white pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Academy Info */}

          <div>

            <h2 className="text-3xl font-black text-green-500">
              RSCC
            </h2>

            <p className="mt-5 text-slate-400 leading-8">

              Rising Star Cricket Club is dedicated to developing
              disciplined, confident and skilled cricketers through
              professional coaching, structured practice sessions,
              competitive matches and modern training methods.

            </p>

          </div>

          {/* Website */}

          <div>

            <h3 className="text-xl font-bold">

              Website

            </h3>

            <ul className="space-y-3 mt-5 text-slate-400">

              <li>
                <a
                  href="#about"
                  className="hover:text-green-400 transition"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#gallery"
                  className="hover:text-green-400 transition"
                >
                  Gallery
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="hover:text-green-400 transition"
                >
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* Academy Portal */}

          <div>

            <h3 className="text-xl font-bold">

              Academy Portal

            </h3>

            <ul className="space-y-3 mt-5 text-slate-400">

              <li>
                <a
                  href="#academy-portal"
                  className="hover:text-green-400 transition"
                >
                  Open Portal
                </a>
              </li>

              <li>
                <a
                  href="#academy-portal"
                  className="hover:text-green-400 transition"
                >
                  Players
                </a>
              </li>

              <li>
                <a
                  href="#academy-portal"
                  className="hover:text-green-400 transition"
                >
                  Live Scoring
                </a>
              </li>

              <li>
                <a
                  href="#academy-portal"
                  className="hover:text-green-400 transition"
                >
                  Statistics
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold">

              Contact

            </h3>

            <div className="space-y-4 mt-5 text-slate-400">

              <p>

                📍 Rising Star Cricket Club

              </p>

              <p>

                📞 +91 XXXXX XXXXX

              </p>

              <p>

                ✉ info@rscc.com

              </p>

            </div>

          </div>

        </div>

        <hr className="border-slate-700 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-center">

            © {new Date().getFullYear()} Rising Star Cricket Club. All Rights Reserved.

          </p>

          <p className="text-slate-500 text-sm">

            Designed & Developed with ❤️ for RSCC

          </p>

        </div>

      </div>
    </footer>
  );
}
