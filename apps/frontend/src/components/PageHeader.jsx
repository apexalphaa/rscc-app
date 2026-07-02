export default function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>

        <h1 className="text-4xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-slate-500">
          {subtitle}
        </p>

      </div>

      {action}

    </div>
  );
}
