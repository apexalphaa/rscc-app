export default function EmptyState({
  title,
  description,
  button,
}) {
  return (
    <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 py-20 px-10 text-center">

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <p className="text-slate-500 mt-4 max-w-xl mx-auto">
        {description}
      </p>

      {button && (
        <div className="mt-8">
          {button}
        </div>
      )}

    </div>
  );
}
