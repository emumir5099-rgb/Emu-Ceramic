
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Gem,
  Layers3,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About Emu Mir | EMU CERAMIC",
  description:
    "Meet Emu Mir, the mind behind EMU CERAMIC — The Art of Surfaces.",
};

const values = [
  {
    number: "01",
    title: "Creative Vision",
    description:
      "A passion for refined surfaces, thoughtful details, and timeless design.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Quality First",
    description:
      "Building a brand around quality, trust, and a better customer experience.",
    icon: Award,
  },
  {
    number: "03",
    title: "Building a Brand",
    description:
      "Growing EMU CERAMIC with a clear identity and a long-term vision.",
    icon: BriefcaseBusiness,
  },
];

export default function AboutMePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F3ED] text-[#0B211D]">
      {/* HERO */}
      <section className="relative isolate bg-[#0B211D] text-white">
        <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full border border-[#D7B47A]/15" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full border border-[#D7B47A]/20" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D7B47A]/60 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-28">
          {/* TEXT */}
          <div className="order-2 lg:order-1">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D7B47A]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#D7B47A] sm:text-xs">
                The Person Behind The Brand
              </p>
            </div>

            <p className="mb-3 text-sm tracking-[0.12em] text-white/60">
              Hello, I&apos;m
            </p>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Emu <span className="font-light italic text-[#D7B47A]">Mir.</span>
            </h1>

            <div className="my-7 h-px w-20 bg-[#D7B47A]" />

            <h2 className="max-w-xl text-xl font-light leading-relaxed text-white/90 sm:text-2xl">
              Founder of{" "}
              <span className="font-medium text-[#D7B47A]">EMU CERAMIC</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-white/65 sm:text-base">
              I believe great spaces begin with beautiful surfaces. My vision
              is to build a ceramic brand that brings together elegant design,
              dependable quality, and a premium customer experience.
            </p>

            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/45">
              Design · Quality · Vision
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/all-tiles"
                className="group inline-flex items-center gap-3 bg-[#D7B47A] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0B211D] transition hover:bg-[#E7CEA5]"
              >
                Explore Collection
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-white/25 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-white transition hover:border-[#D7B47A] hover:text-[#D7B47A]"
              >
                Get In Touch
                <ArrowDownRight size={16} />
              </Link>
            </div>
          </div>

          {/* PREMIUM FOUNDER PORTRAIT */}
          <div className="order-1 mx-auto w-full max-w-md lg:order-2">
            <div className="group relative">
              <div className="absolute -right-3 -top-3 h-full w-full border border-[#D7B47A]/50 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 sm:-right-4 sm:-top-4" />

              <div className="relative border border-[#D7B47A]/30 bg-[#18342D] p-2">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#18342D]">
                  <Image
                    src="/emu-mir.jpg"
                    alt="Emu Mir, Founder of EMU CERAMIC"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B211D]/95 via-[#0B211D]/10 to-[#0B211D]/10" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#D7B47A]">
                      Founder & Creative Mind
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      Emu Mir
                    </h2>

                    <div className="mt-4 h-px w-14 bg-[#D7B47A]" />

                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/75">
                      EMU CERAMIC
                    </p>
                  </div>

                  <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l border-t border-[#D7B47A]/80" />
                  <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b border-r border-[#D7B47A]/80" />
                </div>
              </div>

              <p className="mt-5 text-center text-[10px] uppercase tracking-[0.28em] text-[#A47743]">
                Personal Journey · Creative Vision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A47743]">
              <span className="h-px w-8 bg-[#A47743]" />
              About Me
            </p>

            <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              A vision shaped by ambition and creativity.
            </h2>
          </div>

          <div className="lg:pt-8">
            <p className="text-base leading-8 text-[#42534D] sm:text-lg sm:leading-9">
              I&apos;m Emu Mir, the person behind EMU CERAMIC. I&apos;m
              passionate about creating a brand with its own identity, where
              design, quality, and customer trust come together. For me,
              building a business is more than offering a product—it&apos;s
              about creating an experience people can trust.
            </p>

            <p className="mt-5 text-base leading-8 text-[#42534D] sm:text-lg sm:leading-9">
              My goal is to grow EMU CERAMIC into a distinguished name in
              ceramic surfaces, guided by a commitment to thoughtful
              presentation, reliable service, and continuous improvement.
            </p>

            <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#A47743]">
              <Gem size={17} strokeWidth={1.5} />
              The Art of Surfaces
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-[#D7B47A]/20 bg-white/60">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="mb-12 max-w-2xl">
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A47743]">
              <span className="h-px w-8 bg-[#A47743]" />
              What Drives Me
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              The principles behind the vision.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#64716B] sm:text-base">
              A strong brand is built through consistency, care, and a clear
              sense of purpose.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group border border-[#D7B47A]/25 bg-[#F5F3ED] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#A47743]/60 hover:bg-white sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.2em] text-[#A47743]">
                      {item.number}
                    </span>

                    <Icon
                      size={22}
                      strokeWidth={1.4}
                      className="text-[#A47743] transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="mt-9 text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#64716B]">
                    {item.description}
                  </p>

                  <div className="mt-7 h-px w-10 bg-[#D7B47A] transition-all duration-300 group-hover:w-16" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="bg-[#0B211D] px-5 py-20 text-center text-white sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Layers3
            size={30}
            strokeWidth={1.2}
            className="mx-auto text-[#D7B47A]"
          />

          <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-[#D7B47A]">
            The Brand. The Vision. The Future.
          </p>

          <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight sm:text-5xl sm:leading-tight">
            More than surfaces.
            <br />
            <span className="font-light italic text-[#D7B47A]">
              A statement of style.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
            Discover the world of EMU CERAMIC, where thoughtful design meets
            a vision for beautiful spaces.
          </p>

          <Link
            href="/all-tiles"
            className="group mt-9 inline-flex items-center gap-3 border border-[#D7B47A]/60 px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#D7B47A] transition hover:bg-[#D7B47A] hover:text-[#0B211D]"
          >
            Discover Our Collection
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
