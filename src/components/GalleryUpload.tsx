"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function GalleryUpload() {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!supabase) {
    return <p className="text-red-600">Supabase unavailable.</p>;
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!imageUrl.trim()) {
      setError("Please enter an image URL");
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from("saint_gallery")
        .insert([{ image_url: imageUrl, caption }]);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      setSuccess("Image added successfully!");
      setImageUrl("");
      setCaption("");
      setLoading(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to upload image");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleUpload} className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Image URL</label>
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-purple-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Caption (Optional)</label>
        <textarea
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-purple-600"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white p-2 rounded font-bold hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Add Image"}
      </button>
    </form>
  );
}