
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowUpRight,
  UserRound,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/all-tiles" },
  { label: "Our Story", href: "/our-story" },
  { label: "About Me", href: "/about-me" },
  { label: "Contact", href: "/contact" },
];


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const isLoggedIn = Boolean(session?.user);
  const isAdmin = session?.user?.role === "admin";

  const accountHref = isAdmin ? "/admin" : "/client";
  const accountLabel = isAdmin ? "Admin Dashboard" : "Customer Profile";

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      closeMenu();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-[#0B211D] px-3 py-2 text-center text-[9px] font-medium uppercase tracking-[0.18em] text-[#D7B47A] sm:text-[10px] sm:tracking-[0.3em]">
        Timeless Designs
        <span className="mx-2 text-white/30">✦</span>
        Beautiful Spaces
        <span className="hidden sm:inline">
          <span className="mx-2 text-white/30">—</span>
          Welcome to EMU CERAMIC
        </span>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-[#0B211D]/10 bg-[#FAF9F6]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-12">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="EMU CERAMIC home"
            className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
          >
            <div className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16">
              <Image
                src="/emu-ceramic.png"
                alt="EMU CERAMIC logo"
                fill
                priority
                sizes="(max-width: 640px) 48px, 64px"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div>
              <p className="whitespace-nowrap text-[15px] font-semibold tracking-[0.08em] text-[#0B211D] sm:text-xl sm:tracking-[0.13em]">
                EMU CERAMIC
              </p>
              <p className="mt-1 hidden text-[9px] uppercase tracking-[0.3em] text-[#A47743] sm:block">
                The Art of Surfaces
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 lg:flex xl:gap-8"
          >
            {navLinks.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={`group relative py-3 text-[12px] font-medium tracking-wide transition-colors duration-200 xl:text-[13px] ${
                    active
                      ? "text-[#A47743]"
                      : "text-[#0B211D]/75 hover:text-[#A47743]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-0 h-px bg-[#A47743] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Account */}
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            {!isPending &&
              (isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen((open) => !open)}
                    aria-label="Account menu"
                    aria-expanded={profileMenuOpen}
                    className={`flex items-center gap-2 border px-3 py-2.5 transition-colors ${
                      isActive(accountHref)
                        ? "border-[#A47743] bg-[#0B211D] text-white"
                        : "border-[#0B211D]/20 text-[#0B211D] hover:border-[#A47743] hover:bg-[#0B211D] hover:text-white"
                    }`}
                  >
                    {isAdmin ? (
                      <LayoutDashboard size={17} strokeWidth={1.7} />
                    ) : (
                      <UserRound size={17} strokeWidth={1.7} />
                    )}

                    <span className="max-w-36 truncate text-xs font-medium">
                      {session.user.name || accountLabel}
                    </span>
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 border border-[#0B211D]/10 bg-[#FAF9F6] p-2 shadow-xl">
                      <div className="border-b border-[#0B211D]/10 px-3 py-3">
                        <p className="text-sm font-semibold text-[#0B211D]">
                          {isAdmin ? "Administrator" : "My Account"}
                        </p>
                        <p className="mt-1 truncate text-xs text-[#0B211D]/60">
                          {session.user.email}
                        </p>
                      </div>

                      <Link
                        href={accountHref}
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-[#0B211D] transition-colors hover:bg-[#0B211D]/5 hover:text-[#A47743]"
                      >
                        {isAdmin ? (
                          <LayoutDashboard size={16} />
                        ) : (
                          <UserRound size={16} />
                        )}
                        {accountLabel}
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-3 py-3 text-sm text-red-700 transition-colors hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 border border-[#0B211D]/20 px-4 py-2.5 text-xs font-medium text-[#0B211D] transition-colors hover:border-[#A47743] hover:bg-[#0B211D] hover:text-white"
                >
                  <UserRound size={15} strokeWidth={1.7} />
                  Login
                </Link>
              ))}
          </div>

          {/* Mobile Controls */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            {!isPending &&
              (isLoggedIn ? (
                <Link
                  href={accountHref}
                  onClick={closeMenu}
                  aria-label={accountLabel}
                  className="grid h-10 w-10 place-items-center border border-[#A47743] bg-[#0B211D] text-white transition-colors hover:bg-[#A47743]"
                >
                  {isAdmin ? (
                    <LayoutDashboard size={19} />
                  ) : (
                    <UserRound size={19} />
                  )}
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  aria-label="Login"
                  className="grid h-10 w-10 place-items-center border border-[#0B211D]/20 text-[#0B211D] transition-colors hover:bg-[#0B211D] hover:text-white"
                >
                  <UserRound size={19} />
                </Link>
              ))}

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="grid h-10 w-10 place-items-center bg-[#0B211D] text-white transition-colors hover:bg-[#A47743]"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-[#0B211D]/10 bg-[#FAF9F6] px-5 pb-5 pt-3 shadow-lg lg:hidden sm:px-8"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {navLinks.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-[#0B211D]/10 py-4 text-sm transition-colors ${
                      active
                        ? "font-semibold text-[#A47743]"
                        : "font-medium text-[#0B211D] hover:text-[#A47743]"
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight
                      size={16}
                      className={
                        active ? "text-[#A47743]" : "text-[#0B211D]/40"
                      }
                    />
                  </Link>
                );
              })}
            </nav>

            {isLoggedIn ? (
              <>
                <Link
                  href={accountHref}
                  onClick={closeMenu}
                  className="mt-5 flex w-full items-center justify-center gap-2 border border-[#A47743] bg-[#0B211D] px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#A47743]"
                >
                  {isAdmin ? (
                    <LayoutDashboard size={17} />
                  ) : (
                    <UserRound size={17} />
                  )}
                  {isAdmin ? "Admin Dashboard" : "My Customer Profile"}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-3 flex w-full items-center justify-center gap-2 border border-red-200 px-4 py-3 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="mt-5 flex w-full items-center justify-center gap-2 bg-[#0B211D] px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#A47743]"
              >
                <UserRound size={17} />
                Login to Your Account
              </Link>
            )}

            <p className="mt-5 text-center text-[9px] uppercase tracking-[0.25em] text-[#A47743]">
              The Art of Surfaces
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
