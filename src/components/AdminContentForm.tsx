"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminContentForm({
  onAdd,
}: {
  onAdd?: () => void;
}) {
  const [form, setForm] = useState({
    type: "event",
    category: "general",
    title: "",
    description: "",
    image_url: "",
    external_link: "",
    platform: "youtube",
    event_date: "",
    is_featured: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
const payload: any = {
  type: form.type,
  category: form.category,
  title: form.title,
  description: form.description,
  image_url: form.image_url,
  external_link: form.external_link,
  platform: form.platform,
  is_featured: form.is_featured,
};

if (form.event_date) {
  payload.event_date = form.event_date;
}

await supabase.from("content_items").insert([payload]);

    const { error } = await supabase
      .from("content_items")
      .insert([payload]);

    if (error) {
      alert(error.message);
      return;
    }

    onAdd?.();

    setForm({
      type: "event",
      category: "general",
      title: "",
      description: "",
      image_url: "",
      external_link: "",
      platform: "youtube",
      event_date: "",
      is_featured: false,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-10 space-y-4"
    >
      <h2 className="text-xl font-semibold text-slate-800">
        Add New Content
      </h2>

      <select
        className="w-full border p-2 rounded text-slate-900"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="">Select Type</option>
        <option value="satsang">Satsang</option>
        <option value="event">Event</option>
        <option value="initiative">Initiative</option>
      </select>

      <input
        type="text"
        placeholder="Category (e.g. dastak-zindagi)"
        className="w-full border p-2 rounded text-slate-900"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2 rounded text-slate-900"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded text-slate-900"
        rows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="text"
        placeholder="Image URL"
        className="w-full border p-2 rounded text-slate-900"
        value={form.image_url}
        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
      />

      <input
        type="text"
        placeholder="External Link (YouTube / Website)"
        className="w-full border p-2 rounded text-slate-900"
        value={form.external_link}
        onChange={(e) => setForm({ ...form, external_link: e.target.value })}
      />

      <input
        type="date"
        className="w-full border p-2 rounded text-slate-900"
        value={form.event_date || ""}
        onChange={(e) => setForm({ ...form, event_date: e.target.value })}
      />

      <label className="flex items-center gap-2 text-slate-700">
        <input
          type="checkbox"
          checked={form.is_featured}
          onChange={(e) =>
            setForm({ ...form, is_featured: e.target.checked })
          }
        />
        Featured
      </label>

      <button
        type="submit"
        className="bg-orange-600 text-white px-6 py-2 rounded"
      >
        Add Content
      </button>
    </form>
  );
}
