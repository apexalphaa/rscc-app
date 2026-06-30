import { Link } from "react-router-dom";
import Button from "./common/Button";

export default function Navbar() {
  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-green-700 text-white text-center text-sm py-2">
        🏏 Admissions Open for 2026 • Join Rising Star Cricket Club Today!
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

          <Link
            to="/"
            className="text-3xl font-black text-green-700"
          >
            RSCC
          </Link>

          <div className="hidden md:flex gap-8 font-medium">

            <a href="#about" className="hover:text-green-700">
              About
            </a>

            <a href="#features" className="hover:text-green-700">
              Features
            </a>

            <a href="#gallery" className="hover:text-green-700">
              Gallery
            </a>

            <a href="#contact" className="hover:text-green-700">
              Contact
            </a>

          </div>

          <Link to="/login">
            <Button className="px-8">
    Member Login
</Button>
          </Link>

        </div>
      </nav>
    </>
  );
}
