import { useState } from "react";

export default function ImageUpload() {

  const [preview, setPreview] = useState(null);

  function handleChange(e) {

    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

  }

  return (
    <div>

      <label className="block mb-2 font-medium">

        Player Photo

      </label>

      {preview ? (

        <img
          src={preview}
          className="w-32 h-32 rounded-full object-cover border mb-4"
        />

      ) : (

        <div className="w-32 h-32 rounded-full border flex items-center justify-center bg-slate-100 mb-4">

          No Photo

        </div>

      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

    </div>
  );

}
