"use client";

import Image from "next/image";

export default function BhaktModal({ bhakt, onClose }: any) {
  if (!bhakt) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full rounded-3xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <div className="relative h-[300px] rounded-2xl overflow-hidden">
          <Image
            src={bhakt.image_url}
            alt={bhakt.name}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          {bhakt.name}
        </h3>

        <p className="text-orange-600 mt-1">
          {bhakt.role}
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          {bhakt.bio}
        </p>
      </div>
    </div>
  );
}
