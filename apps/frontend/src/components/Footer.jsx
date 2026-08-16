import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 text-white">
      <div className="rscc-container grid gap-10 px-5 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo dark />
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
            Rising Star Cricket Club, Sambalpur — developing disciplined, confident and competitive cricketers through structured coaching and match experience.
          </p>
        </div>
        <div>
          <h3 className="font-extrabold">Academy</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <a href="#about" className="block hover:text-white">About</a>
            <a href="#programs" className="block hover:text-white">Programs</a>
            <a href="#coaches" className="block hover:text-white">Coaches</a>
            <a href="#events" className="block hover:text-white">Events</a>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Member portal</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link to="/login" className="block hover:text-white">Member Login</Link>
            <Link to="/register" className="block hover:text-white">Join RSCC</Link>
            <Link to="/forgot-password" className="block hover:text-white">Forgot password</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="rscc-container flex flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Rising Star Cricket Club. All rights reserved.</span>
          <span>Sambalpur, Odisha</span>
        </div>
      </div>
    </footer>
  );
}
