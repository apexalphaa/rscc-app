import Button from "./common/Button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-green-700">
            RSCC
          </h1>
        </div>

        <div className="hidden md:flex gap-8 font-medium text-slate-700">

          <a href="/">Home</a>

          <a href="#about">About</a>

          <a href="#features">Features</a>

          <a href="#contact">Contact</a>

        </div>

        <Button>
          Login
        </Button>

      </div>
    </nav>
  );
}
