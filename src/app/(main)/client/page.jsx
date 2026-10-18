
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  UserRound,
  ArrowRight,
  LogOut,
  Layers3,
  Headset,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ClientPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogout() {
    setLoggingOut(true);
    setMessage("");

    try {
      const result = await authClient.signOut();

      if (result?.error) {
        setMessage(result.error.message || "Logout failed. Please try again.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setMessage("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  const shortcuts = [
    {
      title: "Explore Tiles",
      description: "Discover surfaces for your space.",
      href: "/all-tiles",
      icon: Layers3,
      label: "Explore collection",
    },
    {
      title: "My Orders",
      description: "Your order section will be available here.",
      href: null,
      icon: Package,
      label: "Coming soon",
    },
    {
      title: "My Account",
      description: "Customer account features are coming soon.",
      href: null,
      icon: UserRound,
      label: "Coming soon",
    },
    {
      title: "Contact Us",
      description: "Need help choosing the right tiles?",
      href: "/contact",
      icon: Headset,
      label: "Get in touch",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-10 text-[#0b211d] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#9a753c]">
              EMU CERAMIC · CUSTOMER SPACE
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Client Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Welcome to your personal customer space.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0b211d]/15 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-[#0b211d]/5 disabled:opacity-60"
          >
            <LogOut size={17} />
            {loggingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>

        {message && (
          <p
            role="alert"
            className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            {message}
          </p>
        )}

        <section className="overflow-hidden rounded-3xl bg-[#0b211d] p-7 text-white sm:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d7b47a]">
              Beauty in Every Detail
            </p>

            <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
              Your space. Your style. Your surfaces.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
              Explore our tile collection and find the perfect finish for your
              home or project.
            </p>

            <Link
              href="/all-tiles"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d7b47a] px-5 py-3 text-sm font-semibold text-[#0b211d] transition hover:bg-[#e6c995]"
            >
              Browse All Tiles
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <div className="mb-5 mt-10 flex items-center gap-3">
          <LayoutDashboard size={21} className="text-[#9a753c]" />
          <h2 className="text-xl font-semibold">Your Dashboard</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shortcuts.map((item) => {
            const Icon = item.icon;

            const content = (
              <div className="flex h-full flex-col rounded-2xl border border-[#0b211d]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5efe4] text-[#9a753c]">
                  <Icon size={23} />
                </div>

                <h3 className="text-lg font-semibold">{item.title}</h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9a753c]">
                  {item.label}
                  {item.href && <ArrowRight size={16} />}
                </span>
              </div>
            );

            return item.href ? (
              <Link key={item.title} href={item.href} className="block">
                {content}
              </Link>
            ) : (
              <div key={item.title}>{content}</div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-[#d7b47a]/30 bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#f5efe4] p-3 text-[#9a753c]">
              <ShoppingBag size={22} />
            </div>

            <div>
              <h3 className="font-semibold">Your orders, all in one place</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Order history and live order tracking can be connected when
                the order management system is ready.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#9a753c] hover:text-[#0b211d]"
              >
                Contact our team
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-gray-400">
          © 2026 EMU CERAMIC. All rights reserved.
        </p>
      </div>
    </main>
  );
}
