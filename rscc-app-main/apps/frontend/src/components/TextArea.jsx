export default function TextArea({
  placeholder,
}) {
  return (
    <textarea
      rows="4"
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-300 p-3 resize-none focus:outline-none focus:border-green-600"
    />
  );
}
