export default function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

      <div>

        <h1 className="text-4xl font-bold">
          {title}
        </h1>

        <p className="text-slate-500 mt-2">
          {subtitle}
        </p>

      </div>

      {action}

    </div>
  );
}
