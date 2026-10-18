
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  ChartNoAxesCombined,
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  ExternalLink,
  Wallet,
  AlertTriangle,
  CreditCard,
  Banknote,
  Smartphone,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin" },
  { label: "Performance", icon: TrendingUp, href: "/admin#performance" },
  { label: "Products", icon: Package, href: "/admin/products" },
  { label: "Orders", icon: ShoppingBag, href: "/admin#orders" },
  { label: "Customers", icon: Users, href: "/admin#customers" },
  { label: "Analytics", icon: ChartNoAxesCombined, href: "/admin#analytics" },
  { label: "Settings", icon: Settings, href: "/admin#settings" },
];

const paymentPeriods = ["Daily", "Weekly", "Monthly"];

function EmptyState({ children = "No data available yet." }) {
  return (
    <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-white/10 px-4 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}

function MetricCard({ title, icon: Icon }) {
  return (
    <article className="rounded-xl border border-white/[0.08] bg-[#151F1C] p-5 transition hover:border-[#D7B47A]/40">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{title}</p>
        <span className="rounded-lg bg-[#D7B47A]/10 p-2 text-[#D7B47A]">
          <Icon size={19} />
        </span>
      </div>
      <p className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        ৳0.00
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Sales data not connected yet
      </p>
    </article>
  );
}

function Panel({ title, subtitle, action, children, id }) {
  return (
    <section
      id={id}
      className="min-w-0 rounded-xl border border-white/[0.08] bg-[#151F1C] p-5 sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-white">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function SalesChart() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 text-xs text-slate-400">
        {[
          ["Net Income", "#D7B47A"],
          ["Total Sales", "#7CC7A2"],
          ["Total Revenue", "#82A9F0"],
        ].map(([label, color]) => (
          <span key={label} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            {label}
          </span>
        ))}
      </div>
      <EmptyState>
        Sales chart will appear when real transaction records are available.
      </EmptyState>
    </div>
  );
}

function PaymentChart({ period, setPeriod }) {
  const methods = [
    { name: "Cash", icon: Banknote },
    { name: "Card", icon: CreditCard },
    { name: "Wallet", icon: Smartphone },
  ];

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-1 rounded-lg bg-[#0D1512] p-1">
        {paymentPeriods.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPeriod(item)}
            className={`flex-1 rounded-md px-3 py-2 text-xs transition ${
              period === item
                ? "bg-[#D7B47A] font-semibold text-[#0B211D]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative grid h-36 w-36 shrink-0 place-items-center rounded-full border-[15px] border-[#293832]">
          <div className="text-center">
            <p className="text-xl font-semibold text-white">—</p>
            <p className="text-[10px] text-slate-500">Transactions</p>
          </div>
        </div>
        <div className="w-full space-y-4">
          {methods.map(({ name, icon: Icon }) => (
            <div key={name} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm text-slate-300">
                <Icon size={16} className="text-[#D7B47A]" />
                {name}
              </span>
              <span className="text-xs text-slate-500">No data</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-xs text-slate-500">
        {period} payment summary · Waiting for payment records
      </p>
    </div>
  );
}

export default function DashboardAnalytics({ adminName, email }) {
  const [period, setPeriod] = useState("Weekly");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredNavigation = useMemo(
    () =>
      navigation.filter((item) =>
        item.label.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search]
  );

  return (
    <main className="min-h-screen bg-[#0B1210] text-slate-200 lg:flex">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.08] bg-[#101916] transition-transform lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/[0.08] px-5">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#D7B47A] text-[#0B211D]">
              <Package size={22} />
            </span>
            <span>
              <span className="block text-sm font-bold tracking-[0.12em] text-white">
                EMU CERAMIC
              </span>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.2em] text-[#D7B47A]">
                Business Console
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-4 pt-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Workspace
          </p>
          <nav className="space-y-1">
            {navigation.map(({ label, icon: Icon, href }, index) => (
              <Link
                key={label}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  index === 0
                    ? "bg-[#D7B47A] font-semibold text-[#0B211D]"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
                {label === "Products" && (
                  <ArrowUpRight size={14} className="ml-auto" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/[0.08] p-4">
          <div className="rounded-xl bg-white/[0.04] p-4">
            <p className="text-xs font-medium text-[#D7B47A]">
              The Art of Surfaces
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Manage your ceramic store from one workspace.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-xs text-white hover:text-[#D7B47A]"
            >
              Visit storefront <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex min-h-[76px] flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] bg-[#0B1210]/95 px-4 py-4 backdrop-blur-xl sm:px-7 lg:px-9">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="rounded-lg border border-white/10 p-2 text-white lg:hidden"
            >
              <Menu size={19} />
            </button>
            <div>
              <p className="text-xs text-slate-500">Workspace / Overview</p>
              <h1 className="mt-1 text-lg font-semibold text-white sm:text-xl">
                Business Overview
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 md:flex">
              <Search size={16} className="text-slate-500" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search sections..."
                aria-label="Search dashboard sections"
                className="w-36 bg-transparent text-xs text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <button
              type="button"
              aria-label="Notifications"
              title="Notifications"
              className="relative rounded-lg border border-white/10 p-2.5 text-slate-300 hover:text-[#D7B47A]"
            >
              <Bell size={17} />
            </button>
            <div className="hidden items-center gap-3 border-l border-white/10 pl-3 sm:flex">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#D7B47A]/15 text-sm font-semibold text-[#D7B47A]">
                {(adminName || "A").charAt(0).toUpperCase()}
              </div>
              <div className="max-w-36">
                <p className="truncate text-xs font-medium text-white">
                  {adminName}
                </p>
                <p className="truncate text-[10px] text-slate-500">{email}</p>
              </div>
            </div>
          </div>

          {search.trim() && (
            <div className="absolute right-4 top-[68px] z-40 w-64 rounded-xl border border-white/10 bg-[#151F1C] p-2 shadow-2xl sm:right-7">
              <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-slate-500">
                Matching sections
              </p>
              {filteredNavigation.length ? (
                filteredNavigation.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setSearch("")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-white/5"
                  >
                    <Icon size={16} className="text-[#D7B47A]" />
                    {label}
                  </Link>
                ))
              ) : (
                <p className="px-3 py-3 text-xs text-slate-500">
                  No matching sections.
                </p>
              )}
            </div>
          )}
        </header>

        <div className="space-y-7 px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
          <section className="relative overflow-hidden rounded-2xl border border-[#D7B47A]/20 bg-gradient-to-br from-[#1B3027] via-[#14221C] to-[#111916] p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border border-[#D7B47A]/10" />
            <div className="pointer-events-none absolute -right-2 -top-8 h-40 w-40 rounded-full border border-[#D7B47A]/10" />
            <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D7B47A]">
                  Secure Administration
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  Welcome back, {adminName}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Your business overview, inventory and store tools in one
                  place.
                </p>
              </div>
              <Link
                href="/admin/products"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#D7B47A] px-4 py-3 text-sm font-semibold text-[#0B211D] transition hover:bg-[#E8CEA2]"
              >
                Manage Products <ArrowUpRight size={16} />
              </Link>
            </div>
          </section>

          <section id="analytics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Net Income" icon={Wallet} />
            <MetricCard title="Total Sales" icon={ShoppingBag} />
            <MetricCard title="Total Revenue" icon={TrendingUp} />
            <MetricCard title="Total Orders" icon={Package} />
          </section>

          <section className="grid min-w-0 gap-5 xl:grid-cols-[1.6fr_1fr]">
            <Panel
              id="performance"
              title="Sales Performance"
              subtitle="Net income, sales and revenue trends"
              action={
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays size={14} /> Daily trends
                </span>
              }
            >
              <SalesChart />
            </Panel>

            <Panel
              title="Payment Methods"
              subtitle="Distribution by payment method"
            >
              <PaymentChart period={period} setPeriod={setPeriod} />
            </Panel>
          </section>

          <section className="grid min-w-0 gap-5 xl:grid-cols-[1.5fr_1fr]">
            <Panel
              title="Top Selling Products"
              subtitle="Best-performing products by quantity and sales"
              action={
                <Link
                  href="/admin/products"
                  className="inline-flex items-center gap-1 text-xs text-[#D7B47A] hover:text-white"
                >
                  Manage products <ArrowUpRight size={14} />
                </Link>
              }
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-[10px] uppercase tracking-wider text-slate-500">
                      <th className="pb-3 pr-4 font-medium">Product</th>
                      <th className="pb-3 pr-4 font-medium">Quantity</th>
                      <th className="pb-3 pr-4 font-medium">Sales</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} className="py-6">
                        <EmptyState>
                          No sales records available yet.
                        </EmptyState>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel
              title="Inventory Alerts"
              subtitle="Products that may need restocking"
              action={<AlertTriangle size={18} className="text-amber-400" />}
            >
              <EmptyState>
                Inventory alerts will appear when stock quantities are
                available.
              </EmptyState>
            </Panel>
          </section>

          <section id="customers">
            <Panel
              title="Employee Performance"
              subtitle="Sales and refunds by team member"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-[10px] uppercase tracking-wider text-slate-500">
                      <th className="pb-3 pr-4 font-medium">Employee</th>
                      <th className="pb-3 pr-4 font-medium">Total Sales</th>
                      <th className="pb-3 font-medium">Refunds</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3} className="py-6">
                        <EmptyState>
                          Employee sales data is not configured yet.
                        </EmptyState>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Panel>
          </section>

          <section
            id="orders"
            className="flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#151F1C] p-5 sm:flex-row sm:items-center sm:p-6"
          >
            <div>
              <h2 className="font-semibold text-white">Store Operations</h2>
              <p className="mt-1 text-sm text-slate-500">
                Add products and prepare your store for order tracking.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-2 rounded-lg bg-[#D7B47A] px-4 py-3 text-xs font-semibold text-[#0B211D] hover:bg-[#E8CEA2]"
              >
                <Package size={15} /> Products
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-xs text-slate-300 hover:border-[#D7B47A] hover:text-white"
              >
                View Website <ExternalLink size={14} />
              </Link>
            </div>
          </section>

          <footer
            id="settings"
            className="pb-3 text-center text-[10px] tracking-[0.15em] text-slate-600"
          >
            EMU CERAMIC · THE ART OF SURFACES · ADMIN CONSOLE
          </footer>
        </div>
      </div>
    </main>
  );
}
