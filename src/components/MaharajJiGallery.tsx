"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  id: string;
  image_url: string;
  caption?: string;
};

export default function MaharajJiGallery({
  images,
  interval = 12000,
}: {
  images: GalleryImage[];
  interval?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Maharaj Ji Gallery
        </h2>

        <div className="relative mx-auto max-w-6xl h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl bg-black">
          <Image
            src={images[current].image_url}
            alt={images[current].caption ?? "Maharaj Ji"}
            fill
            priority
            className="object-contain transition-opacity duration-1000"
          />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Image courtesy: maharajilove.com
        </p>
      </div>
    </section>
  );
}
