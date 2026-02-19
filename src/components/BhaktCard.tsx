import Image from "next/image";

export default function BhaktCard({ bhakt }: any) {
  return (
    <div className="w-[280px] shrink-0 text-center cursor-pointer group">

      <div className="relative h-[380px] w-full rounded-3xl overflow-hidden bg-slate-100 shadow-md">
        <Image
          src={bhakt.image_url}
          alt={bhakt.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="280px"
        />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-gray-900">
        {bhakt.name}
      </h3>

      <p className="text-sm text-orange-600">
        {bhakt.role}
      </p>
    </div>
  );
}
