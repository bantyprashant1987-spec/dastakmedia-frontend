"use client";

import { useEffect, useRef, useState } from "react";
import BhaktCard from "./BhaktCard";
import BhaktModal from "./BhaktModal";

export default function BhaktSection({ bhakts }: { bhakts: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      el.scrollBy({ left: 340, behavior: "smooth" });

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Maharaj Ji Bhakts
        </h2>

        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
          Devotees whose lives were transformed by the grace of Maharaj Ji.
        </p>

        <div
          ref={scrollRef}
          className="mt-16 flex gap-14 overflow-x-auto scrollbar-hide px-4"
        >
          {bhakts.map((bhakt) => (
            <div key={bhakt.id} onClick={() => setSelected(bhakt)}>
              <BhaktCard bhakt={bhakt} />
            </div>
          ))}
        </div>
      </div>

      <BhaktModal bhakt={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
