"use client";

import { supabase } from "@/lib/supabaseClient";

export default function AdminContentTable({
  items,
}: {
  items: any[];
}) {
  async function deleteItem(id: string) {
    if (!confirm("Delete this item?")) return;

    await supabase
      .from("content_items")
      .delete()
      .eq("id", id);

    location.reload();
  }

  return (
    <table className="w-full text-sm border border-slate-300 bg-white rounded-xl overflow-hidden">
  <thead className="bg-slate-200 text-slate-800">
    <tr>
      <th className="p-3 text-left">Title</th>
      <th className="p-3 text-left">Type</th>
      <th className="p-3 text-left">Category</th>
      <th className="p-3 text-left">Action</th>
    </tr>
  </thead>

  <tbody>
    {items.map((item) => (
      <tr
        key={item.id}
        className="border-t hover:bg-slate-50 transition"
      >
        <td className="p-3">{item.title}</td>
        <td className="p-3 capitalize">{item.type}</td>
        <td className="p-3">{item.category}</td>
        <td className="p-3">
          <button
            className="text-red-600 hover:underline"
            onClick={() => deleteItem(item.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  );
}
