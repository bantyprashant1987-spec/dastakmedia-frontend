import Image from "next/image";
import MaharajJiGallery from "@/components/MaharajJiGallery";
import { supabase } from "@/lib/supabaseClient";


import BhaktSection from "@/components/BhaktSection";








export default async function MaharajJiPage() {
  // 1️⃣ Fetch Maharaj Ji (Saint)
  const { data: saint } = await supabase
    .from("saints")
    .select("*")
    .eq("name", "Neem Karoli Baba")
    .single();

  // 2️⃣ Fetch Bhakts
  const { data: bhakts } = await supabase
    .from("bhakts")
    .select("*")
    .order("created_at", { ascending: true });

  // 3️⃣ Fetch Gallery Images
  const { data: gallery } = await supabase
    .from("saint_gallery")
    .select("id, image_url, caption")
    .order("created_at", { ascending: true });

  if (!saint) {
    return <p className="p-10">Saint data not found</p>;
  }

  return (
    <main className="min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-b from-orange-50 to-white py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {saint.name}
            </h1>
            <p className="mt-2 text-xl text-orange-600 font-medium">
              {saint.title}
            </p>
            <p className="mt-6 text-gray-700 leading-relaxed">
              {saint.description}
            </p>
          </div>

          {saint.hero_image && (
            <Image
              src={saint.hero_image}
              alt={saint.name}
              width={520}
              height={520}
              className="rounded-3xl shadow-xl object-cover"
              priority
            />
          )}
        </div>
      </section>

      {/* ================= AUTO ROTATING GALLERY ================= */}
      {gallery && gallery.length > 0 && (
        <MaharajJiGallery images={gallery} interval={12000} />
      )}
{/* BHAKTS SECTION */}
{/* ================= BHAKTS SECTION ================= */}

 <BhaktSection bhakts={bhakts ?? []} />


      {/* ================= PHILOSOPHY ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Teachings & Philosophy
          </h2>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            {saint.philosophy}
          </p>
        </div>
      </section>



      {/* ================= CREDIT ================= */}
      <footer className="pb-10 text-center text-xs text-gray-500">
        Image courtesy: maharajilove.com
      </footer>

    </main>
  );
}
