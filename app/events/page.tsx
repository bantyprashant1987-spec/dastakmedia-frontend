"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from("content_items")
        .select("*")
        .eq("type", "event")
        .order("event_date", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setEvents(data || []);
      }

      setLoading(false);
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading events...</p>;
  }

  return (
    <main className="py-20">
      <h1 className="text-4xl font-bold text-center mb-12">
        Events
      </h1>

      {events.length === 0 && (
        <p className="text-center text-gray-500">
          No events published yet.
        </p>
      )}

      <div className="max-w-5xl mx-auto grid gap-8 px-6">
        {events.map((e) => (
          <div
            key={e.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold">{e.title}</h2>

            {e.event_date && (
              <p className="text-sm text-gray-500 mt-1">
                {new Date(e.event_date).toDateString()}
              </p>
            )}

            <p className="text-gray-600 mt-3">
              {e.description}
            </p>

            {e.external_link && (
              <a
                href={e.external_link}
                target="_blank"
                className="inline-block mt-4 text-orange-600 font-medium"
              >
                View →
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
