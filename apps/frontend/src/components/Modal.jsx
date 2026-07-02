export default function Modal({

  open,

  title,

  children,

  onClose,

}) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-auto">

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">

            {title}

          </h2>

          <button

            onClick={onClose}

            className="text-3xl"

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
