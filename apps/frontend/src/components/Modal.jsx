export default function Modal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-500"
          >
            ×
          </button>

        </div>

        <div className="p-8">

          {children}

        </div>

      </div>

    </div>
  );
}
