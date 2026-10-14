"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Sparkles,
  Gem,
  MoveRight,
} from "lucide-react";

const collections = [
  {
    id: "tile_001",
    title: "Marble Essence",
    category: "MARBLE COLLECTION",
    price: "৳ 1,850",
    finish: "Polished Finish",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85",
    size: "large",
  },
  {
    id: "tile_002",
    title: "Ocean Blue",
    category: "PREMIUM CERAMIC",
    price: "৳ 2,250",
    finish: "Glossy Finish",
    image:
      "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "tile_003",
    title: "Natural Stone",
    category: "STONE COLLECTION",
    price: "৳ 1,650",
    finish: "Natural Texture",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "tile_004",
    title: "Modern Minimal",
    category: "CONTEMPORARY SERIES",
    price: "৳ 1,950",
    finish: "Matte Finish",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Quality First",
    description: "Thoughtfully selected surfaces for lasting beauty.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Convenient delivery for your project needs.",
  },
  {
    icon: Gem,
    title: "Refined Designs",
    description: "Elevated textures for distinctive interiors.",
  },
];

const marqueeItems = [
  "TIMELESS DESIGN",
  "PREMIUM SURFACES",
  "BEAUTIFUL SPACES",
  "EMU CERAMIC",
  "ELEVATE YOUR INTERIOR",
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#FAF8F3] text-[#183B35]">
      {/* HERO */}
      <section className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10">
        <div className="premium-hero relative mx-auto flex min-h-[570px] max-w-[1600px] items-center overflow-hidden sm:min-h-[650px] lg:min-h-[730px]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90"
              alt="Luxury modern interior"
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#102D29]/95 via-[#102D29]/65 to-[#102D29]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102D29]/40 via-transparent to-black/10" />
          </div>

          <div className="relative z-10 max-w-3xl px-6 py-20 text-white sm:px-10 md:px-16 lg:px-20">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D7B47A]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#E8CC9D] sm:text-xs">
                The Art of Surfaces
              </p>
            </div>

            <h1 className="max-w-3xl font-serif text-5xl leading-[1.08] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[88px]">
              Beauty Begins
              <br />
              <span className="italic text-[#E8CC9D]">
                Beneath Your Feet.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              Discover thoughtfully curated ceramic tiles and refined
              surfaces designed to turn everyday spaces into something
              extraordinary.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/all-tiles"
                className="group inline-flex min-h-14 items-center gap-4 bg-[#D7B47A] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#183B35] transition duration-300 hover:bg-white sm:px-8"
              >
                Explore Collections
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/#about"
                className="inline-flex items-center gap-2 border-b border-white/50 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition hover:border-[#D7B47A] hover:text-[#E8CC9D]"
              >
                Discover Our Story
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.13em] text-white/75 sm:mt-16 sm:gap-x-8">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#D7B47A]" />
                Curated Designs
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#D7B47A]" />
                Modern Living
              </span>
            </div>
          </div>

          <div className="absolute bottom-7 right-7 z-10 hidden max-w-[235px] border border-white/30 bg-[#102D29]/35 p-5 text-white backdrop-blur-md lg:block">
            <p className="text-[9px] tracking-[0.24em] text-[#E8CC9D]">
              DESIGNED WITH PURPOSE
            </p>
            <p className="mt-3 font-serif text-2xl leading-snug">
              A new perspective on living.
            </p>
          </div>
        </div>
      </section>

      {/* CONTINUOUS MARQUEE */}
      <section
        aria-label="EMU CERAMIC highlights"
        className="marquee-shell mt-3 overflow-hidden bg-[#183B35] py-5 text-white sm:mt-6 sm:py-6"
      >
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
              className="flex shrink-0 items-center"
            >
              {marqueeItems.map((item, index) => (
                <div
                  key={`${copy}-${item}`}
                  className="flex shrink-0 items-center gap-5 px-5 sm:gap-8 sm:px-8"
                >
                  <Sparkles
                    size={16}
                    className="shrink-0 text-[#D7B47A]"
                  />
                  <span className="whitespace-nowrap text-[10px] font-medium tracking-[0.2em] sm:text-xs sm:tracking-[0.28em]">
                    {item}
                  </span>
                  <span className="text-lg text-[#D7B47A]">
                    {index % 2 === 0 ? "✦" : "✧"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* BRAND INTRODUCTION */}
      <section
        id="about"
        className="mx-auto grid max-w-[1400px] gap-8 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-end lg:gap-20 lg:px-12"
      >
        <div>
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A47743] sm:text-xs">
            <span className="h-px w-8 bg-[#A47743]" />
            A Philosophy of Design
          </p>

          <h2 className="mt-6 font-serif text-4xl leading-tight tracking-[-0.025em] sm:text-5xl md:text-6xl">
            Spaces that speak.
            <br />
            <span className="italic text-[#A47743]">
              Surfaces that inspire.
            </span>
          </h2>
        </div>

        <div className="lg:pb-2">
          <p className="max-w-xl text-sm leading-8 text-[#77766D] sm:text-base">
            We believe the right surface can change how a space feels.
            EMU CERAMIC brings together considered textures, elegant
            finishes and contemporary inspiration for homes that feel
            truly personal.
          </p>

          <Link
            href="/all-tiles"
            className="group mt-6 inline-flex items-center gap-3 border-b border-[#183B35]/25 pb-2 text-xs font-semibold uppercase tracking-[0.14em] transition hover:border-[#A47743] hover:text-[#A47743]"
          >
            Find Your Style
            <MoveRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section
        id="collections"
        className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12"
      >
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A47743] sm:text-xs">
              A World of Beautiful Surfaces
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] sm:text-4xl md:text-5xl">
              Featured Collections
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-[#77766D]">
              Explore designs selected to bring character and elegance
              to every corner.
            </p>
          </div>

          <Link
            href="/all-tiles"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#183B35]/25 pb-2 text-xs font-semibold uppercase tracking-[0.12em] transition hover:border-[#A47743] hover:text-[#A47743]"
          >
            View All Collections
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
          {collections.map((tile, index) => (
            <article key={tile.id} className="group">
              <Link
                href={`/tile/${tile.id}`}
                className="relative block overflow-hidden bg-[#EAE5DB]"
              >
                <div className="relative h-[340px] overflow-hidden sm:h-[380px] lg:h-[340px] xl:h-[390px]">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute left-4 top-4 bg-[#FAF8F3] px-3 py-2 text-[9px] font-medium tracking-[0.12em] text-[#183B35]">
                    {tile.category}
                  </span>

                  <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center bg-[#FAF8F3] text-[#183B35] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={20} />
                  </span>

                  {index === 0 && (
                    <span className="absolute bottom-4 left-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                      Signature Selection
                    </span>
                  )}
                </div>
              </Link>

              <div className="border-b border-[#183B35]/15 pb-5 pt-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] tracking-[0.1em] text-[#8A887D]">
                      {tile.finish}
                    </p>
                    <h3 className="mt-2 font-serif text-xl sm:text-2xl">
                      {tile.title}
                    </h3>
                  </div>

                  <p className="pt-5 text-sm font-semibold whitespace-nowrap text-[#183B35]">
                    {tile.price}
                  </p>
                </div>

                <Link
                  href={`/tile/${tile.id}`}
                  className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A47743] transition-colors hover:text-[#183B35]"
                >
                  Discover Details
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-y border-[#183B35]/10 bg-[#F0ECE3]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-[#183B35]/10 px-5 sm:px-8 sm:py-5 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex items-start gap-5 px-3 py-7 sm:px-6 md:py-9 lg:px-9"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center border border-[#A47743]/40 text-[#A47743]">
                  <Icon size={23} strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="font-serif text-xl">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#77766D]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PREMIUM CALL TO ACTION */}
      <section className="px-3 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="relative mx-auto max-w-[1500px] overflow-hidden bg-[#183B35] px-6 py-16 text-center text-white sm:px-12 sm:py-24">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#D7B47A]/15 sm:h-96 sm:w-96" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 h-72 w-72 rounded-full border border-[#D7B47A]/15 sm:h-96 sm:w-96" />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#E8CC9D] sm:text-xs">
              Make Room for Beautiful
            </p>

            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-[-0.025em] sm:text-5xl md:text-6xl">
              Your vision.
              <br />
              <span className="italic text-[#E8CC9D]">
                Our inspiration.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              The details make the difference. Find surfaces that
              complement your style and bring your next project to life.
            </p>

            <Link
              href="/all-tiles"
              className="group mt-9 inline-flex min-h-14 items-center gap-4 bg-[#D7B47A] px-7 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#183B35] transition duration-300 hover:bg-white"
            >
              Explore the Collection
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <p className="mt-8 text-[9px] tracking-[0.25em] text-white/45">
              EMU CERAMIC · THE ART OF SURFACES
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}