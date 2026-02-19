"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminLogin from "@/components/AdminLogin";
import AdminContentForm from "@/components/AdminContentForm";
import AdminContentTable from "@/components/AdminContentTable";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch content items
  const fetchItems = async () => {
    const { data } = await supabase
      .from("content_items")
      .select("*")
      .order("created_at", { ascending: false });

    setItems(data || []);
  };

  useEffect(() => {
    // 1️⃣ Initial user check
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    // 2️⃣ Listen to login / logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // 3️⃣ Load content
    fetchItems();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  // 🔐 NOT LOGGED IN → LOGIN PAGE
  if (!user) {
    return <AdminLogin />;
  }

  // ✅ LOGGED IN → ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <div className="max-w-5xl mx-auto">
        <AdminContentForm onAdd={fetchItems} />
        <AdminContentTable items={items} />
      </div>
    </div>
  );
}
