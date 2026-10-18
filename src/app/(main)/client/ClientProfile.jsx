
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  ShieldCheck,
  Save,
  LogOut,
  ArrowUpRight,
  Layers3,
  MessageCircle,
  CircleCheck,
  Camera,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ClientProfile({ initialUser }) {
  const router = useRouter();

  const [user, setUser] = useState(initialUser);
  const [name, setName] = useState(initialUser.name);
  const [image, setImage] = useState(initialUser.image || "");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const initials = (user.name || user.email || "C")
    .trim()
    .charAt(0)
    .toUpperCase();

  const handleSave = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const cleanName = name.trim();
    const cleanImage = image.trim();

    if (cleanName.length < 2) {
      setError("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    if (cleanImage) {
      try {
        const parsedUrl = new URL(cleanImage);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          setError("প্রোফাইল ছবির জন্য একটি বৈধ HTTPS বা HTTP URL দাও।");
          return;
        }
      } catch {
        setError("ছবির URL সঠিক নয়। URL-টি আবার পরীক্ষা করো।");
        return;
      }
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: cleanName,
        image: cleanImage || null,
      });

      if (result.error) {
        setError(
          result.error.message || "প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করো।"
        );
        return;
      }

      const updatedUser = {
        ...user,
        name: cleanName,
        image: cleanImage,
      };

      setUser(updatedUser);
      setName(cleanName);
      setImage(cleanImage);
      setMessage("তোমার প্রোফাইল সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch (err) {
      setError("একটি সমস্যা হয়েছে। ইন্টারনেট ও Auth সেটআপ পরীক্ষা করো।");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    setError("");
    setLoggingOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError(result.error.message || "Logout করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setError("Logout করার সময় সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F4EF] px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#A47743]">
              EMU CERAMIC · CUSTOMER ACCOUNT
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-[#0B211D] sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#0B211D]/65">
              তোমার ব্যক্তিগত তথ্য দেখো এবং প্রয়োজন হলে আপডেট করো।
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 border border-[#0B211D]/15 px-4 py-3 text-xs font-medium text-[#0B211D] transition hover:border-[#A47743] hover:text-[#A47743]"
          >
            Back to Website
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Customer identity card */}
          <aside className="h-fit bg-[#0B211D] p-6 text-white sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5 grid h-24 w-24 place-items-center overflow-hidden rounded-full border border-[#D7B47A]/60 bg-[#17382F]">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.name || "Customer"} profile`}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-3xl font-semibold text-[#D7B47A]">
                    {initials}
                  </span>
                )}

                <span className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full border-2 border-[#0B211D] bg-[#D7B47A] text-[#0B211D]">
                  <Camera size={15} />
                </span>
              </div>

              <h2 className="break-words text-xl font-semibold">
                {user.name || "Customer"}
              </h2>

              <p className="mt-2 break-all text-xs leading-5 text-white/60">
                {user.email}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 border border-[#D7B47A]/30 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-[#D7B47A]">
                <ShieldCheck size={14} />
                Customer Account
              </div>
            </div>

            <div className="my-7 border-t border-white/10" />

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Quick Links
            </p>

            <div className="space-y-2">
              <Link
                href="/all-tiles"
                className="flex items-center justify-between gap-3 px-3 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-[#D7B47A]"
              >
                <span className="flex items-center gap-3">
                  <Layers3 size={17} />
                  Explore Collections
                </span>
                <ArrowUpRight size={15} />
              </Link>

              <Link
                href="/contact"
                className="flex items-center justify-between gap-3 px-3 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-[#D7B47A]"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle size={17} />
                  Contact Us
                </span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="mt-7 flex w-full items-center justify-center gap-2 border border-white/20 px-4 py-3 text-sm text-white/85 transition hover:border-red-300 hover:bg-red-500/10 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={16} />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </aside>

          {/* Profile form */}
          <section className="bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-7 border-b border-[#0B211D]/10 pb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A47743]">
                Account Settings
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#0B211D]">
                Personal Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#0B211D]/60">
                এখানে পরিবর্তন করলে তোমার Better Auth account-এ সংরক্ষিত হবে।
              </p>
            </div>

            {message && (
              <div
                role="status"
                className="mb-5 flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
              >
                <CircleCheck size={18} className="mt-0.5 shrink-0" />
                {message}
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mb-5 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label
                  htmlFor="customer-name"
                  className="mb-2 block text-sm font-medium text-[#0B211D]"
                >
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A47743]"
                  />

                  <input
                    id="customer-name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={100}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border border-[#0B211D]/15 bg-[#FAF9F6] py-3.5 pl-11 pr-4 text-sm text-[#0B211D] outline-none transition placeholder:text-[#0B211D]/35 focus:border-[#A47743] focus:ring-1 focus:ring-[#A47743]/30"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="customer-email"
                  className="mb-2 block text-sm font-medium text-[#0B211D]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A47743]"
                  />

                  <input
                    id="customer-email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full cursor-not-allowed border border-[#0B211D]/10 bg-gray-100 py-3.5 pl-11 pr-4 text-sm text-[#0B211D]/65 outline-none"
                  />
                </div>

                <p className="mt-2 text-xs leading-5 text-[#0B211D]/50">
                  ইমেইলটি তোমার লগইন অ্যাকাউন্টের সঙ্গে যুক্ত। এই ফর্ম থেকে এটি পরিবর্তন করা যাবে না।
                </p>
              </div>

              <div>
                <label
                  htmlFor="customer-image"
                  className="mb-2 block text-sm font-medium text-[#0B211D]"
                >
                  Profile Image URL
                  <span className="ml-2 font-normal text-[#0B211D]/45">
                    (Optional)
                  </span>
                </label>

                <input
                  id="customer-image"
                  type="url"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  placeholder="https://example.com/my-photo.jpg"
                  className="w-full border border-[#0B211D]/15 bg-[#FAF9F6] px-4 py-3.5 text-sm text-[#0B211D] outline-none transition placeholder:text-[#0B211D]/35 focus:border-[#A47743] focus:ring-1 focus:ring-[#A47743]/30"
                />

                <p className="mt-2 text-xs leading-5 text-[#0B211D]/50">
                  একটি সরাসরি ছবির URL দাও। ফাইল আপলোডের সুবিধা এই সংস্করণে নেই।
                </p>
              </div>

              <div className="border-t border-[#0B211D]/10 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex w-full items-center justify-center gap-2 bg-[#0B211D] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#A47743] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <Save size={17} />
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        </div>

        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.22em] text-[#0B211D]/40">
          EMU CERAMIC · The Art of Surfaces
        </p>
      </div>
    </main>
  );
}
