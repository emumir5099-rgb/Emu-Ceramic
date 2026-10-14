
import Link from "next/link";

const values = [
  {
    number: "01",
    title: "Quality First",
    description:
      "We believe beautiful spaces begin with thoughtful material choices and a commitment to quality.",
  },
  {
    number: "02",
    title: "Timeless Design",
    description:
      "From subtle textures to elegant finishes, our design philosophy celebrates beauty that lasts.",
  },
  {
    number: "03",
    title: "Everyday Living",
    description:
      "We believe the surfaces around us should make everyday moments feel a little more special.",
  },
];

export default function OurStoryPage() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#17352d]">
      {/* Hero Section */}
      <section className="relative flex min-h-[480px] items-center bg-[#0b211d] px-5 py-20 text-white md:min-h-[580px] md:px-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071713] via-[#0b211d]/85 to-[#0b211d]/20" />

        <div className="relative mx-auto w-full max-w-7xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#d7b47a]">
            THE STORY OF EMU CERAMIC
          </p>

          <h1 className="max-w-4xl text-5xl font-light leading-tight md:text-7xl">
            Our Story.
            <br />
            <span className="font-semibold text-[#d7b47a]">
              Our Promise.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-8 text-white/75 md:text-base">
            More than surfaces, we believe in creating spaces that reflect
            your personality, inspire your everyday life, and feel like home.
          </p>

          <Link
            href="/all-tiles"
            className="mt-9 inline-flex items-center gap-4 border border-[#d7b47a] bg-[#d7b47a] px-7 py-4 text-xs font-bold uppercase tracking-[0.17em] text-[#0b211d] transition hover:bg-transparent hover:text-[#d7b47a]"
          >
            Discover Our Collections <span>↗</span>
          </Link>
        </div>

        <div className="absolute bottom-8 right-8 hidden text-right md:block">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            Design with intention
          </p>
          <p className="mt-2 text-sm text-[#d7b47a]">
            Beauty in every detail.
          </p>
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-12 md:py-28">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden bg-[#e8e3d9]">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
              alt="Elegant contemporary interior with refined surfaces"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="absolute -bottom-5 -right-2 bg-[#d7b47a] px-6 py-5 text-[#0b211d] md:-right-5 md:px-8 md:py-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              EMU CERAMIC
            </p>
            <p className="mt-1 text-sm">A vision for beautiful spaces.</p>
          </div>
        </div>

        <div className="pt-4 md:pt-0">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#a17b43]">
            WHO WE ARE
          </p>

          <h2 className="text-3xl font-light leading-tight md:text-5xl">
            Beautiful spaces begin
            <span className="font-semibold"> with the right details.</span>
          </h2>

          <div className="mt-7 space-y-5 text-sm leading-8 text-[#68746e] md:text-base">
            <p>
              At EMU CERAMIC, we see ceramic surfaces as more than a finishing
              touch. They help shape the atmosphere of a room, complement its
              architecture, and bring a design vision to life.
            </p>

            <p>
              Our approach is rooted in thoughtful design, elegant aesthetics,
              and helping customers explore surfaces that suit their spaces
              and personal style.
            </p>

            <p>
              Whether you are planning a welcoming home, a contemporary
              apartment, or a commercial interior, we want every choice to
              feel considered, confident, and uniquely yours.
            </p>
          </div>

          <div className="mt-9 border-l-2 border-[#d7b47a] pl-5">
            <p className="text-lg italic leading-8 text-[#17352d] md:text-xl">
              “Every surface tells a story. Let yours reflect your style.”
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#0b211d] px-5 py-20 text-white md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#d7b47a]">
              OUR PHILOSOPHY
            </p>

            <h2 className="text-3xl font-light leading-tight md:text-5xl">
              Less ordinary.
              <span className="block font-semibold text-[#d7b47a]">
                More meaningful.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-8 text-white/65 md:text-base">
              Great design is not simply about how a space looks. It is about
              how it feels, how it functions, and how it becomes part of the
              moments that matter.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 md:grid-cols-3 md:gap-12">
            {values.map((value) => (
              <article key={value.number} className="group">
                <p className="text-sm font-medium tracking-[0.2em] text-[#d7b47a]">
                  {value.number}
                </p>

                <div className="my-6 h-px w-full bg-white/15 transition group-hover:bg-[#d7b47a]" />

                <h3 className="text-2xl font-medium">{value.title}</h3>

                <p className="mt-4 text-sm leading-7 text-white/65">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Design & Craft Section */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-12 md:py-28">
        <div className="order-2 md:order-1">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#a17b43]">
            DESIGN THAT SPEAKS
          </p>

          <h2 className="text-3xl font-light leading-tight md:text-5xl">
            Thoughtful choices.
            <span className="block font-semibold">Distinctive spaces.</span>
          </h2>

          <p className="mt-7 text-sm leading-8 text-[#68746e] md:text-base">
            The right surface can transform the character of a space. Soft
            neutral tones can create calm, marble-inspired patterns can add
            sophistication, and natural textures can bring warmth and depth.
          </p>

          <p className="mt-5 text-sm leading-8 text-[#68746e] md:text-base">
            We want to make exploring these possibilities an inspiring part
            of your design journey, with collections that help you imagine
            what your space can become.
          </p>

          <Link
            href="/all-tiles"
            className="mt-8 inline-flex items-center gap-3 border-b border-[#a17b43] pb-3 text-xs font-bold uppercase tracking-[0.18em] transition hover:text-[#a17b43]"
          >
            Explore the Collections <span>↗</span>
          </Link>
        </div>

        <div className="order-1 aspect-[4/4.5] overflow-hidden bg-[#e8e3d9] md:order-2">
          <img
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90"
            alt="Modern interior featuring natural tones and refined finishes"
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[#eae5d9] px-5 py-20 text-center md:px-12 md:py-28">
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#a17b43]">
            YOUR SPACE, YOUR STORY
          </p>

          <h2 className="text-3xl font-light leading-tight md:text-5xl">
            Let&apos;s create something
            <span className="block font-semibold">beautiful together.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#68746e] md:text-base">
            Explore our collections and discover surfaces that bring your
            ideas to life.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/all-tiles"
              className="bg-[#0b211d] px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#21473c]"
            >
              Explore Collections ↗
            </Link>

            <Link
              href="/#contact"
              className="border border-[#0b211d]/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] transition hover:border-[#0b211d] hover:bg-white/50"
            >
              Get in Touch ↗
            </Link>
          </div>

          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.3em] text-[#a17b43]">
            EMU CERAMIC
          </p>
        </div>
      </section>
    </main>
  );
}
