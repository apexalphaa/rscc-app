import { Link } from "react-router-dom";
import Input from "../components/common/Input";

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

        <h1 className="text-4xl font-bold text-center text-green-700">
          RSCC
        </h1>

        <p className="text-center text-slate-500 mt-3">
          Rising Star Cricket Club
        </p>

        <h2 className="text-2xl font-bold mt-10">
          Member Login
        </h2>

        <p className="text-slate-500 mt-2">
          Welcome back.
        </p>

        <button
          className="w-full mt-8 py-3 rounded-xl border hover:bg-slate-100 transition"
        >
          Continue with Google
        </button>

        <div className="text-center my-6 text-slate-400">
          OR
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl p-3 mt-4"
        />

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 mt-6"
        >
          Login
        </button>

        <Link
          to="/"
          className="block text-center mt-8 text-green-700"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}
