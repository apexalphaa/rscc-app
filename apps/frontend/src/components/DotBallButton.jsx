export default function DotBallButton({ onDot }) {

  return (

    <button
      onClick={onDot}
      className="w-full rounded-xl bg-slate-700 text-white py-4 hover:bg-slate-800 transition"
    >

      Dot Ball

    </button>

  );

}
