
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
} from "lucide-react";

import { auth } from "@/lib/auth";

export const metadata = {
  title: "Admin Dashboard | EMU CERAMIC",
  description: "Manage EMU CERAMIC store",
};

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

  const dashboardCards = [
    {
      title: "Products",
      description:
        "Add new ceramic tiles, edit product details, update prices and manage your collection.",
      icon: Package,
      href: "/admin/products",
      action: "Manage Products",
      active: true,
    },
    {
      title: "Orders",
      description:
        "Your order management workspace can be connected here as the store develops.",
      icon: ShoppingBag,
      href: null,
      action: null,
      active: false,
    },
    {
      title: "Customers",
      description:
        "Customer management tools can be added here for your growing business.",
      icon: Users,
      href: null,
      action: null,
      active: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F3ED] text-[#0B211D]">
      {/* Dashboard Header */}
      <section className="relative overflow-hidden bg-[#0B211D] px-5 py-10 text-white sm:px-8 lg:px-12 lg:py-14">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-[#D7B47A]/10" />
        <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border border-[#D7B47A]/15" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D7B47A]">
            <ShieldCheck size={16} />
            Secure Administration
          </div>

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#D7B47A]">
                EMU CERAMIC · The Art of Surfaces
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-4 text-sm text-white/65 sm:text-base">
                Welcome back, {adminName}. Manage your store from one place.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 border border-white/15 bg-white/[0.03] px-4 py-3">
              <div className="grid h-10 w-10 place-items-center bg-[#D7B47A] text-[#0B211D]">
                <LayoutDashboard size={20} />
              </div>

              <div>
                <p className="text-sm font-medium">Administrator</p>
                <p className="mt-1 max-w-52 truncate text-xs text-white/55">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Section Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A47743]">
              Store Control
            </p>

            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Manage Your Business
            </h2>

            <p className="mt-2 text-sm text-[#0B211D]/60">
              Your store operations, all in one place.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-sm text-[#0B211D]/70 transition-colors hover:text-[#A47743]"
          >
            View Website
            <ExternalLink size={15} />
          </Link>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="group flex min-h-64 flex-col border border-[#0B211D]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#A47743]/50 hover:shadow-xl sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center bg-[#0B211D] text-[#D7B47A] transition-colors group-hover:bg-[#A47743] group-hover:text-white">
                    <Icon size={23} strokeWidth={1.6} />
                  </div>

                  {card.active ? (
                    <span className="border border-emerald-700/15 bg-emerald-50 px-3 py-1.5 text-[10px] uppercase tracking-wider text-emerald-800">
                      Available
                    </span>
                  ) : (
                    <span className="border border-[#0B211D]/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#0B211D]/45">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {card.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-[#0B211D]/60">
                  {card.description}
                </p>

                {card.href ? (
                  <Link
                    href={card.href}
                    className="mt-6 inline-flex w-fit items-center gap-2 border-b border-[#A47743] pb-1 text-sm font-medium text-[#0B211D] transition-colors hover:text-[#A47743]"
                  >
                    {card.action}
                    <ArrowUpRight size={16} />
                  </Link>
                ) : (
                  <p className="mt-6 text-xs uppercase tracking-wider text-[#A47743]">
                    Module not configured yet
                  </p>
                )}
              </article>
            );
          })}
        </div>

        {/* Quick Access */}
        <div className="mt-10 border border-[#0B211D]/10 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center bg-[#EAE6DC] text-[#A47743]">
              <Settings size={21} />
            </div>

            <div>
              <h2 className="text-xl font-semibold">Quick Access</h2>
              <p className="mt-1 text-xs text-[#0B211D]/55">
                Shortcuts to your store tools
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#0B211D]/60">
            Manage your ceramic tile collection, add new products, update
            prices and maintain your storefront from the product workspace.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 bg-[#0B211D] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#A47743]"
            >
              <Plus size={17} />
              Manage Products
              <ArrowUpRight size={15} />
            </Link>

            <Link
              href="/all-tiles"
              className="inline-flex items-center gap-2 border border-[#0B211D]/20 px-5 py-3 text-sm font-medium transition-colors hover:border-[#A47743] hover:text-[#A47743]"
            >
              <Package size={17} />
              Browse Tiles
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-[#0B211D]/20 px-5 py-3 text-sm font-medium transition-colors hover:border-[#A47743] hover:text-[#A47743]"
            >
              <ExternalLink size={17} />
              Visit Website
            </Link>
          </div>
        </div>

        {/* Featured Shortcut */}
        <div className="relative mt-8 overflow-hidden border-l-2 border-[#A47743] bg-[#EAE6DC] p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-[#A47743]">
                <Sparkles size={23} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#A47743]">
                  Store Management
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  Your products. Your control.
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#0B211D]/65">
                  Open Product Management to add, edit or remove tiles and
                  update the details shown in your collection.
                </p>
              </div>
            </div>

            <Link
              href="/admin/products"
              className="inline-flex w-fit shrink-0 items-center gap-2 border border-[#0B211D]/20 bg-white px-5 py-3 text-sm font-medium transition-colors hover:border-[#A47743] hover:text-[#A47743]"
            >
              Open Products
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-xs tracking-wide text-[#0B211D]/40">
          EMU CERAMIC · ADMINISTRATION PANEL
        </p>
      </section>
    </main>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F5F3ED] p-10 text-[#0B211D]">
          Loading admin dashboard...
        </main>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
