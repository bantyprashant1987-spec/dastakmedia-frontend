import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import type { ContentItem } from "@/types/content";

export const dynamic = "force-dynamic";

export default async function SatsangPage() {
 const { data: satsangs } = await supabase
  .from("content_items")
  .select("*")
  .eq("type", "satsang")
  .order("created_at", { ascending: false });

  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("type", "satsang")
    .order("event_date", { ascending: false });

  if (error) {
    console.error(error);
    return (
      <div className="p-10 text-center text-red-600">
        Failed to load satsang content
      </div>
    );
  }

  // Group by category
  const grouped = (data as ContentItem[]).reduce<Record<string, ContentItem[]>>(
    (acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <section className="py-20 text-center bg-gradient-to-b from-orange-50 to-white">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Satsang & Spiritual Initiatives
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Explore satsangs, events, and initiatives guided by devotion and service.
        </p>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-6 py-20 space-y-20">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold capitalize mb-8">
              {category.replace("-", " ")}
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border bg-white shadow-sm hover:shadow-lg transition"
                >
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={400}
                      height={250}
                      className="rounded-t-2xl object-cover"
                    />
                  )}

                  <div className="p-6">
                    <h3 className="text-lg font-semibold">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {item.description}
                      </p>
                    )}

                    {item.external_link && (
                      <a
                        href={item.external_link}
                        target="_blank"
                        className="inline-block mt-4 text-orange-600 font-medium"
                      >
                        View →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
