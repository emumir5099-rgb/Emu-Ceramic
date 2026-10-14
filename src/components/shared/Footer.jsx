import Image from "next/image";
import Link from "next/link";

import {
  FaInstagram,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowUp,
  FaArrowRight,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden bg-[#0B211D] text-white"
    >
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-[#D7B47A]/10 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#D7B47A]/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Premium CTA */}
        <div className="border-b border-white/10 py-14 sm:py-20">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D7B47A] sm:text-xs">
                Crafted for Extraordinary Spaces
              </p>

              <h2 className="text-3xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Every surface tells
                <br />
                <span className="font-serif italic text-[#D7B47A]">
                  a beautiful story.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
                Discover timeless ceramic collections that bring elegance,
                sophistication, and lasting beauty to every space.
              </p>
            </div>

            <Link
              href="/all-tiles"
              className="group inline-flex w-fit items-center gap-4 border border-[#D7B47A]/60 px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-[#D7B47A] transition-all duration-300 hover:bg-[#D7B47A] hover:text-[#0B211D]"
            >
              Explore Collections

              <FaArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-16">

          {/* Brand Information */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label="EMU CERAMIC Home"
              className="group inline-flex items-center gap-4"
            >
              {/* Logo without circle */}
              <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center">
                <Image
                  src="/emu-ceramic.png"
                  alt="EMU CERAMIC Logo"
                  width={76}
                  height={76}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div>
                <h3 className="text-xl font-medium tracking-[0.16em] sm:text-2xl">
                  EMU CERAMIC
                </h3>

                <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-[#D7B47A] sm:text-[10px]">
                  The Art of Surfaces
                </p>
              </div>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/55">
              Redefining interiors through thoughtful design, refined textures,
              and premium ceramic surfaces made to inspire.
            </p>

            {/* Social Media */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#D7B47A] hover:bg-[#D7B47A] hover:text-[#0B211D]"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#D7B47A] hover:bg-[#D7B47A] hover:text-[#0B211D]"
              >
                <FaFacebookF size={17} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D7B47A]">
              Discover
            </h4>

            <ul className="mt-6 space-y-4 text-sm text-white/60">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#D7B47A]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/all-tiles"
                  className="transition-colors hover:text-[#D7B47A]"
                >
                  All Collections
                </Link>
              </li>

              <li>
                <Link
                  href="/#about"
                  className="transition-colors hover:text-[#D7B47A]"
                >
                  Our Story
                </Link>
              </li>

              <li>
                <Link
                  href="/#contact"
                  className="transition-colors hover:text-[#D7B47A]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D7B47A]">
              Get in Touch
            </h4>

            <div className="mt-6 space-y-6">

              {/* Address */}
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt
                  size={16}
                  className="mt-1 shrink-0 text-[#D7B47A]"
                />

                <div className="text-sm leading-6 text-white/60">
                  <p className="mb-1 font-medium text-white/90">
                    Visit Our Showroom
                  </p>

                  <address className="not-italic">
                    Emu Ceramics Ltd.
                    <br />
                    House #42, 3rd Floor, Road #11
                    <br />
                    Block #D, Banani
                    <br />
                    Dhaka-1213, Bangladesh
                  </address>

                  <p className="mt-3 text-xs leading-5 text-[#D7B47A]/90">
                    Saturday – Thursday
                    <br />
                    10:00 AM – 8:00 PM
                    <br />
                    Friday Closed
                  </p>
                </div>
              </div>

              {/* Phone */}
              <a
                href="tel:+8809696026555"
                className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-[#D7B47A]"
              >
                <FaPhoneAlt
                  size={15}
                  className="shrink-0 text-[#D7B47A]"
                />

                <span>+880 9696-026555</span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@emuceramic.com"
                className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-[#D7B47A]"
              >
                <FaEnvelope
                  size={16}
                  className="mt-0.5 shrink-0 text-[#D7B47A]"
                />

                <span className="break-all">
                  info@emuceramic.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-6 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {currentYear} EMU CERAMIC. All rights reserved.
          </p>

          <p className="flex items-center gap-2 uppercase tracking-[0.16em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D7B47A]" />
            The Art of Surfaces
          </p>

          {/* Developer Credit */}
          <p className="text-white/50">
            Developed by{" "}
            <span className="font-semibold tracking-wide text-[#D7B47A]">
              Emu Mir
            </span>
          </p>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 transition-colors hover:text-[#D7B47A]"
          >
            Back to Home

            <FaArrowUp
              size={12}
              className="transition-transform group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
