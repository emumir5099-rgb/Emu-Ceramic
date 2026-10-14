"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  UserRound,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/all-tiles" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-[#183B35] px-3 py-2 text-center text-[9px] font-medium tracking-[0.16em] text-[#F5E5C5] sm:px-4 sm:text-[11px] sm:tracking-[0.2em]">
        TIMELESS DESIGNS. BEAUTIFUL SPACES.
        <span className="hidden sm:inline">
          {" "}— WELCOME TO EMU CERAMIC
        </span>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-[#183B35]/10 bg-[#FAF8F3]/95 shadow-[0_4px_24px_rgba(24,59,53,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 py-2 sm:gap-5 sm:px-8 sm:py-3 lg:px-12">

          {/* Logo & Brand Name */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 lg:gap-4"
          >
            <div className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center sm:h-[76px] sm:w-[76px] lg:h-[88px] lg:w-[88px]">
              <Image
                src="/emu-ceramic.png"
                alt="EMU CERAMIC Logo"
                width={120}
                height={120}
                priority
                sizes="(max-width: 640px) 58px, (max-width: 1024px) 76px, 88px"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="min-w-0">
              <h1 className="whitespace-nowrap text-[14px] font-bold tracking-[0.08em] text-[#183B35] transition-colors duration-300 group-hover:text-[#A47743] sm:text-xl sm:tracking-[0.12em] lg:text-2xl">
                EMU CERAMIC
              </h1>

              <p className="mt-1 hidden text-[9px] font-medium tracking-[0.22em] text-[#A47743] sm:block lg:text-[10px] lg:tracking-[0.28em]">
                THE ART OF SURFACES
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-9">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative py-3 text-[13px] font-medium tracking-wide text-[#183B35]/80 transition-colors duration-300 hover:text-[#A47743]"
              >
                {item.label}

                <span className="absolute bottom-1 left-0 h-[1.5px] w-0 bg-[#A47743] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Login & Mobile Menu */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* Desktop Login */}
            <Link
              href="/login"
              className="group hidden items-center gap-2 border border-[#183B35]/15 px-4 py-3 text-sm font-medium text-[#183B35] transition-all duration-300 hover:border-[#A47743] hover:text-[#A47743] md:inline-flex lg:px-5"
            >
              <UserRound
                size={17}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              Login
            </Link>

            {/* Mobile Login */}
            <Link
              href="/login"
              aria-label="Login"
              className="grid h-10 w-10 place-items-center border border-[#183B35]/15 text-[#183B35] transition-all duration-300 hover:border-[#A47743] hover:bg-[#183B35] hover:text-white md:hidden"
            >
              <UserRound size={19} strokeWidth={1.7} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="grid h-10 w-10 place-items-center bg-[#183B35] text-white transition-all duration-300 hover:bg-[#A47743] sm:h-11 sm:w-11 lg:hidden"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-navigation"
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 lg:hidden ${
            menuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[#183B35]/10 bg-[#FAF8F3] px-5 pb-6 pt-4 sm:px-8">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A47743]">
                Discover EMU
              </p>

              <nav className="flex flex-col">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between border-b border-[#183B35]/10 py-4 text-sm font-medium text-[#183B35] transition-all duration-300 hover:pl-2 hover:text-[#A47743]"
                  >
                    {item.label}

                    <ChevronDown
                      size={16}
                      className="-rotate-90 text-[#A47743] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </nav>

              {/* Mobile Login Link */}
              <Link
                href="/login"
                onClick={closeMenu}
                className="group mt-5 flex w-full items-center justify-center gap-2 bg-[#183B35] px-4 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#A47743]"
              >
                <UserRound size={17} />
                Login to Your Account
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <p className="mt-5 text-center text-[9px] tracking-[0.22em] text-[#183B35]/45">
                THE ART OF SURFACES
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
