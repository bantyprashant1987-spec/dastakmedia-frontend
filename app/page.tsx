import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Home() {
  // 🔹 FETCH DATA FROM SUPABASE
  const { data: updates, error } = await supabase
    .from("updates")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7ed] via-[#fffaf5] to-white">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-orange-200/30 blur-3xl" />
        <div className="relative container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-6 py-32 gap-24">

          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-sm font-medium text-orange-700 mb-8">
              🕉 A Life of Love, Service & Devotion
            </span>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Baba Neem Karoli
              <span className="block text-orange-600 mt-3">
                Maharaj Ji
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              A saint whose presence transformed lives — reminding us that
              <span className="font-medium text-gray-800"> love and service </span>
              are the highest forms of devotion.
            </p>

            <div className="mt-12 flex gap-6 flex-wrap">
              <a
                href="/satsang"
                className="rounded-full bg-orange-600 text-white px-12 py-4 text-base font-medium shadow-lg hover:bg-orange-700 transition"
              >
                Explore Teachings
              </a>
              <a
                href="/satsang"
                className="rounded-full border border-orange-200 bg-white px-12 py-4 text-base font-medium hover:bg-orange-50 transition"
              >
                Events & Satsang
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-10 rounded-full bg-orange-300/20 blur-3xl" />
            <img
              src="/baba-ji.png"
              alt="Baba Neem Karoli Maharaj"
              className="relative w-full max-w-2xl rounded-[2rem] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Latest Updates
          </h2>

          <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
            Watch the latest satsangs, reels, and community updates shared by the channel.
          </p>

          {/* 🔹 SUPABASE UPDATES */}
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {updates?.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <p className="text-sm font-medium capitalize text-gray-500">
                    {item.platform}
                  </p>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-4 font-medium underline"
                  >
                    Open →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
{/* CONNECT WITH US SECTION */}
<section className="bg-slate-50 py-24">
  <div className="container mx-auto px-6">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
      Connect With Us
    </h2>

    <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
      Follow us across platforms to stay connected with satsangs,
      teachings, and community updates.
    </p>

    <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3">

      <ConnectCard
        title="YouTube"
        desc="Watch full satsangs and discourses"
        href="https://youtube.com"
        color="#ef4444"
        icon={
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C17.7 2.5 12 2.5 12 2.5h0s-5.7 0-8.6.4c-.4.1-1.3.1-2.1 1-.6.7-.8 2.3-.8 2.3S0 8 0 9.7v1.6c0 1.7.2 3.5.2 3.5s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.2 8.6.4 8.6.4s5.7 0 8.6-.4c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.7.2-3.5V9.7c0-1.7-.2-3.5-.2-3.5ZM9.5 14.6V7.9l6.3 3.4-6.3 3.3Z" />
          </svg>
        }
      />

      <ConnectCard
        title="Instagram"
        desc="Daily reels & inspirational quotes"
        href="https://instagram.com"
        color="#ec4899"
        icon={<span className="text-xl">📸</span>}
      />

      <ConnectCard
        title="Facebook"
        desc="Community posts & event updates"
        href="https://facebook.com"
        color="#3b82f6"
        icon={<span className="text-xl">📘</span>}
      />

    </div>
  </div>
</section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center text-sm text-gray-600">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://youtube.com" target="_blank">YouTube</a>
          <a href="https://instagram.com" target="_blank">Instagram</a>
          <a href="https://telegram.org" target="_blank">Telegram</a>
        </div>
        <p>© 2025 MyChannel. All rights reserved.</p>
      </footer>
    </main>
  );
}
function ConnectCard({
  title,
  desc,
  href,
  icon,
  color,
}: {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group rounded-2xl border p-6 text-center transition hover:shadow-lg hover:-translate-y-1"
    >
      <div
        className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        {desc}
      </p>

      <span
        className="mt-4 inline-block text-sm font-medium"
        style={{ color }}
      >
        Visit →
      </span>
    </a>
  );
}

