"use client";

import { useState } from "react";

export default function GalleryLightbox({ images }: { images: any[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.image_url}
            alt={img.caption || "Gallery image"}
            onClick={() => setActive(img.image_url)}
            className="cursor-pointer rounded-xl object-cover h-64 w-full hover:opacity-90 transition"
          />
        ))}
      </div>

      {/* LIGHTBOX */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setActive(null)}
        >
          <img
            src={active}
            alt="Full view"
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
          />
        </div>
      )}
    </>
  );
}
