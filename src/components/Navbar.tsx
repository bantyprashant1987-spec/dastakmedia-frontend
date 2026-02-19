"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Maharaj Ji", href: "/maharaj-ji" },
  { label: "Satsang", href: "/satsang" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">

          {/* BRAND */}
          <Link href="/" className="text-xl font-bold">
            DASTAK<span className="font-light text-slate-500">MEDIA</span>
          </Link>

          {/* CENTER NAV */}
          <nav className="hidden md:flex gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            {!user ? (
              <Button asChild>
                <Link href="/admin">Log In</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/admin">Admin</Link>
                </Button>

                <Button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Logout
                </Button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
