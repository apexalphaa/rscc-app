export default function SectionTitle({
  title,
  subtitle,
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">

      <h2 className="text-5xl font-bold">
        {title}
      </h2>

      <p className="mt-5 text-slate-500 leading-8">
        {subtitle}
      </p>

    </div>
  );
}
