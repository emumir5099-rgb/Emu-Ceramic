"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, UserRound } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/all-tiles" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
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

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden items-center gap-2 border border-[#0B211D]/20 px-4 py-2.5 text-xs font-medium text-[#0B211D] transition-colors hover:border-[#A47743] hover:bg-[#0B211D] hover:text-white md:inline-flex"
            >
              <UserRound size={15} strokeWidth={1.7} />
              Login
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="grid h-10 w-10 place-items-center bg-[#0B211D] text-white transition-colors hover:bg-[#A47743] lg:hidden"
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
                      className={active ? "text-[#A47743]" : "text-[#0B211D]/40"}
                    />
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/login"
              onClick={closeMenu}
              className="mt-5 flex w-full items-center justify-center gap-2 bg-[#0B211D] px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#A47743]"
            >
              <UserRound size={17} />
              Login to Your Account
            </Link>

            <p className="mt-5 text-center text-[9px] uppercase tracking-[0.25em] text-[#A47743]">
              The Art of Surfaces
            </p>
          </div>
        )}
      </div>
    </header>
  );
}