import { Link } from "react-router-dom";
import Button from "./common/Button";

export default function Navbar() {
  return (
    <>
      <div className="bg-green-700 text-white text-center py-2 text-sm font-medium">
        Admissions Open • New Batches Starting Soon
      </div>

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">

        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          <Link
            to="/"
            className="text-3xl font-black text-green-700 tracking-wide"
          >
            RSCC
          </Link>

          <div className="hidden lg:flex gap-10 text-slate-700">

            <a href="#about" className="hover:text-green-700">About</a>

            <a href="#features" className="hover:text-green-700">Features</a>

            <a href="#gallery" className="hover:text-green-700">Gallery</a>

            <a href="#contact" className="hover:text-green-700">Contact</a>

          </div>

          <Link to="/login">
            <Button>
              Member Login
            </Button>
          </Link>

        </div>

      </nav>
    </>
  );
}
