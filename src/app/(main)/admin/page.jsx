
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ShieldCheck,
  Plus,
  Settings,
  ExternalLink,
  Sparkles,
  Layers3,
  ChartNoAxesCombined,
  CircleCheck,
  Clock3,
  ChevronRight,
  Store,
  LockKeyhole,
} from "lucide-react";

import { auth } from "@/lib/auth";

export const metadata = {
  title: "Admin Dashboard | EMU CERAMIC",
  description: "Manage EMU CERAMIC products and store operations.",
};

const dashboardCards = [
  {
    title: "Products",
    description:
      "Add ceramic tiles, update prices, edit product details and manage your collection.",
    icon: Package,
    href: "/admin/products",
    action: "Manage Products",
    status: "Available",
    number: "01",
  },
  {
    title: "Orders",
    description:
      "Create an organized workspace for customer orders and order status tracking.",
    icon: ShoppingBag,
    href: null,
    action: null,
    status: "Coming Soon",
    number: "02",
  },
  {
    title: "Customers",
    description:
      "Build a customer workspace to organize customer information and purchase history.",
    icon: Users,
    href: null,
    action: null,
    status: "Coming Soon",
    number: "03",
  },
];

const quickLinks = [
  {
    title: "Add & Manage Products",
    description: "Manage your ceramic tile collection",
    icon: Package,
    href: "/admin/products",
  },
  {
    title: "Browse Storefront",
    description: "Preview your public tile collection",
    icon: Layers3,
    href: "/all-tiles",
  },
  {
    title: "Visit Website",
    description: "Open your main website",
    icon: ExternalLink,
    href: "/",
  },
];

async function AdminDashboardContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/client");
  }

  const adminName = session.user.name || "Administrator";
  const adminEmail = session.user.email || "";

  return (
    <main className="min-h-screen bg-[#F5F3ED] text-[#0B211D]">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B211D] text-white">
        <div className="mx-auto flex min-h-[72px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center border border-[#D7B47A]/50 text-[#D7B47A]">
              <Layers3 size={22} strokeWidth={1.5} />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.16em] sm:text-base">
                EMU CERAMIC
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.25em] text-[#D7B47A] sm:text-[10px]">
                The Art of Surfaces
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/"
              className="hidden items-center gap-2 text-xs text-white/65 transition hover:text-[#D7B47A] sm:inline-flex"
            >
              View Store
              <ExternalLink size={14} />
            </Link>

            <div className="h-8 w-px bg-white/15" />

            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center bg-[#D7B47A] text-sm font-semibold text-[#0B211D]">
                {adminName.charAt(0).toUpperCase()}
              </div>

              <div className="hidden min-w-0 sm:block">
                <p className="max-w-40 truncate text-xs font-medium">
                  {adminName}
                </p>
                <p className="mt-1 text-[10px] text-white/50">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2 text-xs text-[#0B211D]/45">
          <Store size={14} />
          <span>Store</span>
          <ChevronRight size={13} />
          <span className="font-medium text-[#0B211D]">Dashboard</span>
        </div>

        {/* Welcome banner */}
        <section className="relative overflow-hidden bg-[#0B211D] text-white">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-[#D7B47A]/15" />
          <div className="pointer-events-none absolute -right-5 -top-20 h-60 w-60 rounded-full border border-[#D7B47A]/15" />

          <div className="relative flex flex-col justify-between gap-8 p-6 sm:p-9 lg:flex-row lg:items-end lg:p-12">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 border border-[#D7B47A]/30 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#D7B47A] sm:text-xs">
                <ShieldCheck size={15} />
                Secure Administration
              </div>

              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-white/55">
                EMU CERAMIC · BUSINESS CONTROL
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Welcome back,
                <span className="mt-1 block text-[#D7B47A]">
                  {adminName}
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                Manage your products, maintain your collection and keep your
                ceramic business organized from one workspace.
              </p>
            </div>

            <Link
              href="/admin/products"
              className="inline-flex w-fit shrink-0 items-center gap-3 bg-[#D7B47A] px-5 py-4 text-sm font-semibold text-[#0B211D] transition hover:bg-white"
            >
              <Plus size={18} />
              Manage Products
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="relative grid border-t border-white/10 sm:grid-cols-3">
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4 sm:border-b-0 sm:border-r sm:px-9">
              <CircleCheck size={17} className="text-[#D7B47A]" />
              <div>
                <p className="text-xs font-medium">Admin Access</p>
                <p className="mt-1 text-[10px] text-white/45">
                  Role verified
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4 sm:border-b-0 sm:border-r sm:px-9">
              <LockKeyhole size={17} className="text-[#D7B47A]" />
              <div>
                <p className="text-xs font-medium">Protected Workspace</p>
                <p className="mt-1 text-[10px] text-white/45">
                  Authentication required
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-4 sm:px-9">
              <Settings size={17} className="text-[#D7B47A]" />
              <div>
                <p className="text-xs font-medium">Store Management</p>
                <p className="mt-1 text-[10px] text-white/45">
                  Centralized shortcuts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Overview heading */}
        <section className="mt-10 sm:mt-14">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A47743] sm:text-xs">
                Overview
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Your Business Workspace
              </h2>
              <p className="mt-2 text-sm text-[#0B211D]/55">
                Access your store management tools.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#0B211D]/50">
              <Clock3 size={14} />
              <span>EMU CERAMIC Admin Panel</span>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {dashboardCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="group relative flex min-h-[275px] flex-col border border-[#0B211D]/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#A47743]/50 hover:shadow-xl sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center bg-[#0B211D] text-[#D7B47A] transition-colors group-hover:bg-[#A47743] group-hover:text-white">
                      <Icon size={22} strokeWidth={1.6} />
                    </div>

                    <span className="text-xs tracking-widest text-[#0B211D]/20">
                      {card.number}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{card.title}</h3>

                    <span
                      className={`px-2 py-1 text-[9px] uppercase tracking-wider ${
                        card.href
                          ? "border border-emerald-700/15 bg-emerald-50 text-emerald-800"
                          : "border border-[#0B211D]/10 bg-[#F5F3ED] text-[#0B211D]/50"
                      }`}
                    >
                      {card.status}
                    </span>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-6 text-[#0B211D]/60">
                    {card.description}
                  </p>

                  {card.href ? (
                    <Link
                      href={card.href}
                      className="mt-6 inline-flex w-fit items-center gap-2 border-b border-[#A47743] pb-1 text-sm font-medium transition-colors hover:text-[#A47743]"
                    >
                      {card.action}
                      <ArrowUpRight size={16} />
                    </Link>
                  ) : (
                    <p className="mt-6 text-xs text-[#A47743]">
                      This module has not been connected yet.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Quick actions and admin information */}
        <section className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="border border-[#0B211D]/10 bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#A47743]">
                  Shortcuts
                </p>
                <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                  Quick Access
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#0B211D]/55">
                  Jump directly to your most frequently used store pages.
                </p>
              </div>

              <div className="hidden h-11 w-11 shrink-0 place-items-center bg-[#EAE6DC] text-[#A47743] sm:grid">
                <ChartNoAxesCombined size={22} />
              </div>
            </div>

            <div className="mt-6 divide-y divide-[#0B211D]/10">
              {quickLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex items-center gap-4 py-4 transition-colors hover:bg-[#F5F3ED]/60"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center bg-[#F5F3ED] text-[#0B211D] transition-colors group-hover:bg-[#0B211D] group-hover:text-[#D7B47A]">
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-[#0B211D]/50">
                        {item.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="shrink-0 text-[#0B211D]/35 transition group-hover:text-[#A47743]"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Admin profile */}
          <aside className="flex flex-col border border-[#0B211D]/10 bg-[#EAE6DC] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center bg-[#0B211D] text-[#D7B47A]">
                <ShieldCheck size={22} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#A47743]">
                  Account
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  Admin Profile
                </h2>
              </div>
            </div>

            <div className="mt-7 border border-[#0B211D]/10 bg-white/70 p-5">
              <p className="text-xs text-[#0B211D]/50">Signed in as</p>
              <p className="mt-2 break-words text-base font-semibold">
                {adminName}
              </p>
              <p className="mt-2 break-all text-xs leading-5 text-[#0B211D]/55">
                {adminEmail}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 border border-emerald-700/15 bg-emerald-50 px-3 py-2 text-[10px] uppercase tracking-wider text-emerald-800">
                <ShieldCheck size={13} />
                Verified Admin Role
              </div>
            </div>

            <div className="mt-5 flex-1">
              <h3 className="text-sm font-semibold">Store management tip</h3>
              <p className="mt-2 text-sm leading-6 text-[#0B211D]/60">
                Keep product names, prices, images and tile specifications
                accurate so customers can browse your collection confidently.
              </p>
            </div>

            <Link
              href="/admin/products"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#0B211D] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#A47743]"
            >
              Open Product Management
              <ArrowUpRight size={16} />
            </Link>
          </aside>
        </section>

        {/* Featured banner */}
        <section className="relative mt-8 overflow-hidden border-l-2 border-[#A47743] bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-[#A47743]">
                <Sparkles size={23} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#A47743]">
                  The Art of Surfaces
                </p>
                <h2 className="mt-2 text-lg font-semibold sm:text-xl">
                  Every surface tells a story.
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#0B211D]/60">
                  Maintain a beautiful, accurate and up-to-date tile collection
                  for your customers.
                </p>
              </div>
            </div>

            <Link
              href="/all-tiles"
              className="inline-flex w-fit shrink-0 items-center gap-2 border border-[#0B211D]/20 px-5 py-3 text-sm font-medium transition hover:border-[#A47743] hover:text-[#A47743]"
            >
              Explore Collection
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#0B211D]/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#0B211D]/40">
            EMU CERAMIC · The Art of Surfaces
          </p>

          <p className="text-xs text-[#0B211D]/40">
            Secure Administration Panel
          </p>
        </footer>
      </div>
    </main>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#F5F3ED] px-5 text-[#0B211D]">
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center bg-[#0B211D] text-[#D7B47A]">
              <LayoutDashboard size={23} />
            </div>
            <p className="mt-4 text-sm font-medium">
              Loading EMU CERAMIC Dashboard...
            </p>
            <p className="mt-2 text-xs text-[#0B211D]/50">
              Preparing your admin workspace
            </p>
          </div>
        </main>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
