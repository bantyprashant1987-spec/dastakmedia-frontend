import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { aboutData } from "@/data/about";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            {aboutData.hero.title}
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            {aboutData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-3">
          {aboutData.visionMission?.map((item, idx) => (
            <Card key={idx}>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Our Team
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {aboutData.team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto h-40 w-40">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
