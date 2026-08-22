import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 text-white">
      <div className="rscc-container grid gap-10 px-5 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo dark />
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
            Founded in 2013, Rising Star Cricket Club, Sambalpur develops disciplined, confident and competitive cricketers through structured coaching, fitness and match experience.
          </p>
          <div className="mt-5 text-sm text-slate-300">
            <a href="tel:7978671307" className="font-bold hover:text-white">Training & Admissions: 79786 71307</a>
            <span className="mx-2 text-slate-600">·</span>
            <span>Sambalpur, Odisha</span>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Academy</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <a href="#about" className="block hover:text-white">About Us</a>
            <a href="#programs" className="block hover:text-white">Programs</a>
            <Link to="/public-coaches" className="block hover:text-white">Coaching Team</Link>
            <a href="#events" className="block hover:text-white">Academy Life</a>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Member portal</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link to="/login" className="block hover:text-white">Member Login</Link>
            <Link to="/register" className="block hover:text-white">Join RSCC</Link>
            <Link to="/forgot-password" className="block hover:text-white">Forgot password</Link>
            <a href="tel:7978671307" className="block hover:text-white">Training enquiry · 79786 71307</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="rscc-container flex flex-col gap-4 px-5 py-5 text-xs text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <span>© {new Date().getFullYear()} Rising Star Cricket Club. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-3">
            <span>Website developed by Ankit Sharma</span>
            <a href="https://github.com/apexalphaa" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <a href="https://portfolio-sigma-one-73.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-white">Portfolio</a>
            <a href="https://www.linkedin.com/in/ankit-sharma-1a0673235/" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            <a href="mailto:11.qmsharmankit@gmail.com" className="hover:text-white">Email</a>
          </div>
        </div>
        <div className="border-t border-white/5 px-5 py-3 text-center text-[11px] text-slate-600 lg:hidden">
          Developer contact: 9337813060 · 11.qmsharmankit@gmail.com
        </div>
      </div>
    </footer>
  );
}
