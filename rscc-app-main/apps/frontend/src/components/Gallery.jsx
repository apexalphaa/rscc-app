const images = [
  "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
  "https://images.unsplash.com/photo-1508098682722-e99c643e7485?w=800",
];

export default function Gallery() {
  return (
   <section
  id="gallery"
  className="py-24 bg-slate-100"
>

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Academy Gallery
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          {images.map((image, index) => (

            <img
              key={index}
              src={image}
              alt="Gallery"
              className="rounded-2xl h-72 w-full object-cover shadow-lg hover:scale-105 transition"
            />

          ))}

        </div>

      </div>

    </section>
  );
}
