
"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "8809696026555";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Product Enquiry",
    message: "",
  });

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function sendWhatsAppMessage(event) {
    event.preventDefault();

    const message = [
      "Hello EMU CERAMIC!",
      "",
      "I would like to contact your team.",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `Subject: ${form.subject}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#17352d]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b211d] px-5 py-20 text-white md:px-12 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071713] via-[#0b211d]/90 to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#d7b47a]">
            WE&apos;RE HERE TO HELP
          </p>

          <h1 className="text-5xl font-light leading-tight md:text-7xl">
            Let&apos;s Talk.
            <span className="block font-semibold text-[#d7b47a]">
              Let&apos;s Create.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-8 text-white/75 md:text-base">
            Have a question about our ceramic collections, product pricing,
            or your next project? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact details and form */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:px-12 md:py-24">
        {/* Contact information */}
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#a17b43]">
            GET IN TOUCH
          </p>

          <h2 className="text-3xl font-medium leading-tight md:text-4xl">
            We&apos;re just a message away.
          </h2>

          <p className="mt-5 text-sm leading-8 text-[#68746e]">
            Whether you&apos;re choosing tiles for your home or planning a
            larger project, our team can help you explore the options.
          </p>

          <div className="mt-9 space-y-7">
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d7b47a] text-xl">
                ⌖
              </div>

              <div>
                <h3 className="font-semibold">Visit Our Office</h3>
                <p className="mt-2 text-sm leading-7 text-[#68746e]">
                  Emu Ceramics Ltd.
                  <br />
                  House #42 (3rd Floor), Road #11
                  <br />
                  Block #D, Banani
                  <br />
                  Dhaka-1213, Bangladesh
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=House+42+Road+11+Block+D+Banani+Dhaka+1213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-bold uppercase tracking-widest text-[#a17b43] hover:underline"
                >
                  Get Directions ↗
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d7b47a] text-xl">
                ☎
              </div>

              <div>
                <h3 className="font-semibold">Call Us</h3>
                <a
                  href="tel:+8809696026555"
                  className="mt-2 block text-sm text-[#68746e] hover:text-[#a17b43]"
                >
                  +880 9696-026555
                </a>
                <p className="mt-2 text-xs leading-6 text-[#68746e]">
                  Call us for product enquiries and assistance.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d7b47a] text-xl">
                ✉
              </div>

              <div>
                <h3 className="font-semibold">Email Us</h3>
                <a
                  href="mailto:info@emuceramic.com"
                  className="mt-2 block text-sm text-[#68746e] hover:text-[#a17b43]"
                >
                  info@emuceramic.com
                </a>
                <p className="mt-2 text-xs leading-6 text-[#68746e]">
                  Send us your questions or project details.
                </p>
              </div>
            </div>

            {/* Opening hours */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d7b47a] text-xl">
                ◷
              </div>

              <div>
                <h3 className="font-semibold">Opening Hours</h3>
                <p className="mt-2 text-sm leading-7 text-[#68746e]">
                  Saturday – Thursday
                  <br />
                  10:00 AM – 8:00 PM
                  <br />
                  Friday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello EMU CERAMIC! I would like to enquire about your products."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-3 bg-[#187b48] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#12643a]"
          >
            Chat on WhatsApp ↗
          </a>
        </div>

        {/* Contact form */}
        <div className="border border-[#e5e1d8] bg-white p-5 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a17b43]">
            SEND AN ENQUIRY
          </p>

          <h2 className="mt-3 text-3xl font-medium">How can we help?</h2>

          <p className="mt-3 text-sm leading-7 text-[#68746e]">
            Fill in the details below. We&apos;ll prepare your message in
            WhatsApp so you can send it directly to our team.
          </p>

          <form onSubmit={sendWhatsAppMessage} className="mt-8 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Your Name *
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  placeholder="Enter your full name"
                  className="mt-2 w-full border border-[#dedbd2] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#a17b43]"
                />
              </label>

              <label className="text-sm font-medium">
                Phone Number *
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  placeholder="01XXXXXXXXX"
                  className="mt-2 w-full border border-[#dedbd2] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#a17b43]"
                />
              </label>
            </div>

            <label className="block text-sm font-medium">
              Email Address (Optional)
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                placeholder="you@example.com"
                className="mt-2 w-full border border-[#dedbd2] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#a17b43]"
              />
            </label>

            <label className="block text-sm font-medium">
              Subject *
              <select
                required
                value={form.subject}
                onChange={(event) =>
                  updateField("subject", event.target.value)
                }
                className="mt-2 w-full border border-[#dedbd2] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#a17b43]"
              >
                <option>Product Enquiry</option>
                <option>Price & Availability</option>
                <option>Bulk Order</option>
                <option>Delivery Information</option>
                <option>Project Consultation</option>
                <option>Other</option>
              </select>
            </label>

            <label className="block text-sm font-medium">
              Your Message *
              <textarea
                required
                minLength={5}
                rows={5}
                value={form.message}
                onChange={(event) =>
                  updateField("message", event.target.value)
                }
                placeholder="Tell us about your requirements..."
                className="mt-2 w-full resize-y border border-[#dedbd2] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#a17b43]"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-[#0b211d] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#21473c]"
            >
              Send Enquiry via WhatsApp ↗
            </button>

            <p className="text-center text-xs leading-6 text-[#68746e]">
              Your message opens in WhatsApp. Press Send there to contact
              our team.
            </p>
          </form>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#eae5d9] px-5 py-14 text-center md:px-12 md:py-20">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#a17b43]">
          EMU CERAMIC
        </p>

        <h2 className="text-3xl font-light md:text-4xl">
          Every surface tells a beautiful story.
        </h2>

        <p className="mt-4 text-sm text-[#68746e]">
          Let&apos;s find the right one for you.
        </p>
      </section>
    </main>
  );
}
