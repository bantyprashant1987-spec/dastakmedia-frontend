"use client";

import Image from "next/image";

type ImageItem = {
  id: string;
  image_url: string;
  caption?: string;
};

export default function ImageStrip({ images }: { images: ImageItem[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-100 p-6">

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative h-[260px] w-[180px] flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            <Image
              src={img.image_url}
              alt={img.caption || "Maharaj Ji"}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

    </div>
  );
}
