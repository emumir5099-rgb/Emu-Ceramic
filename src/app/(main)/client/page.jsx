
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  UserRound,
  ArrowRight,
  LogOut,
  Layers3,
  Headset,
  Mail,
  Save,
  ShieldCheck,
  Pencil,
  CircleCheck,
  Camera,
  X,
  Trash2,
  Upload,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ClientPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const { data: session, isPending } = authClient.useSession();

  const [loggingOut, setLoggingOut] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const user = session?.user;

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
      setImagePreview("");
      setSelectedFile(null);
    }
  }, [user?.name, user?.image]);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  function clearPhotoPreview() {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
    setSelectedFile(null);
    setImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setMessage("");
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("একটি ছবির ফাইল নির্বাচন করো।");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("ছবির সাইজ ৫ MB-এর কম হতে হবে।");
      event.target.value = "";
      return;
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImage("");
  }

  async function handleSave(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    const cleanName = name.trim();
    const cleanImage = image.trim();

    if (cleanName.length < 2) {
      setError("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    if (cleanName.length > 100) {
      setError("নাম ১০০ অক্ষরের মধ্যে রাখো।");
      return;
    }

    // Local file preview is not a permanent upload.
    // Upload storage must be connected before saving a selected file.
    if (selectedFile) {
      setError(
        "ছবি স্থায়ীভাবে সেভ করতে image upload service যুক্ত করতে হবে। আপাতত ছবির URL ব্যবহার করো।"
      );
      return;
    }

    if (cleanImage) {
      try {
        const parsedUrl = new URL(cleanImage);

        if (!["https:", "http:"].includes(parsedUrl.protocol)) {
          setError("একটি বৈধ ছবির URL দাও।");
          return;
        }
      } catch {
        setError("ছবির URL সঠিক নয়। আবার পরীক্ষা করো।");
        return;
      }
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: cleanName,
        image: cleanImage || null,
      });

      if (result?.error) {
        setError(
          result.error.message || "প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করো।"
        );
        return;
      }

      setMessage("তোমার প্রোফাইল সফলভাবে আপডেট হয়েছে।");
      setEditing(false);
      setSelectedFile(null);
      setImagePreview("");
      router.refresh();
    } catch {
      setError("প্রোফাইল আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    setMessage("");
    setError("");

    try {
      const result = await authClient.signOut();

      if (result?.error) {
        setError(result.error.message || "Logout করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setError("Logout করা যায়নি। আবার চেষ্টা করো।");
    } finally {
      setLoggingOut(false);
    }
  }

  function startEditing() {
    setName(user?.name || "");
    setImage(user?.image || "");
    setImagePreview("");
    setSelectedFile(null);
    setMessage("");
    setError("");
    setEditing(true);
  }

  function cancelEditing() {
    setName(user?.name || "");
    setImage(user?.image || "");
    setImagePreview("");
    setSelectedFile(null);
    setMessage("");
    setError("");
    setEditing(false);
  }

  if (isPending || !user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#faf9f6] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#d7b47a] border-t-[#0b211d]" />
          <p className="text-sm text-[#0b211d]/65">
            Loading your customer account...
          </p>
        </div>
      </main>
    );
  }

  const initials = (user.name || user.email || "C")
    .trim()
    .charAt(0)
    .toUpperCase();

  const displayedImage = editing
    ? imagePreview || image || ""
    : user.image || "";

  const shortcuts = [
    {
      title: "Explore Tiles",
      description: "Discover surfaces for your space.",
      href: "/all-tiles",
      icon: Layers3,
      label: "Explore collection",
    },
    {
      title: "My Orders",
      description: "Order history will be available when ordering is connected.",
      href: null,
      icon: Package,
      label: "Coming soon",
    },
    {
      title: "My Profile",
      description: "Manage your name and profile image.",
      href: "#profile",
      icon: UserRound,
      label: "Edit profile",
    },
    {
      title: "Contact Us",
      description: "Need help choosing the right tiles?",
      href: "/contact",
      icon: Headset,
      label: "Get in touch",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-10 text-[#0b211d] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#9a753c]">
              EMU CERAMIC · CUSTOMER SPACE
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              My Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Welcome back, {user.name || "Customer"}.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0b211d]/15 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-[#0b211d]/5 disabled:opacity-60"
          >
            <LogOut size={17} />
            {loggingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>

        {message && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
          >
            <CircleCheck size={18} className="mt-0.5 shrink-0" />
            {message}
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <section className="overflow-hidden rounded-3xl bg-[#0b211d] p-7 text-white sm:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d7b47a]">
              Beauty in Every Detail
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
              Your space. Your style. Your surfaces.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
              Explore our tile collection and find the perfect finish for your
              home or project.
            </p>
            <Link
              href="/all-tiles"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d7b47a] px-5 py-3 text-sm font-semibold text-[#0b211d] transition hover:bg-[#e6c995]"
            >
              Browse All Tiles
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section
          id="profile"
          className="mt-8 scroll-mt-28 overflow-hidden rounded-3xl border border-[#0b211d]/10 bg-white shadow-sm"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-[#0b211d]/10 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a753c]">
                Account Settings
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Customer Profile
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                View and update your personal information.
              </p>
            </div>

            {!editing && (
              <button
                type="button"
                onClick={startEditing}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0b211d]/15 px-4 py-3 text-sm font-semibold transition hover:border-[#9a753c] hover:text-[#9a753c]"
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            )}
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:p-10">
            <div className="flex flex-col items-center text-center">
              <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-[#f5efe4] bg-[#0b211d] text-3xl font-semibold text-[#d7b47a]">
                {displayedImage ? (
                  <img
                    key={displayedImage}
                    src={displayedImage}
                    alt="Customer profile"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  initials
                )}
              </div>

              {editing && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0b211d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9a753c]"
                  >
                    <Camera size={16} />
                    Change Photo
                  </button>

                  {(image || imagePreview) && (
                    <button
                      type="button"
                      onClick={clearPhotoPreview}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
              )}

              <h3 className="mt-4 break-words text-lg font-semibold">
                {user.name || "Customer"}
              </h3>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#f5efe4] px-3 py-1.5 text-xs font-medium text-[#79592c]">
                <ShieldCheck size={14} />
                Customer Account
              </div>
            </div>

            <div>
              {editing ? (
                <form onSubmit={handleSave} className="space-y-5">
                  <div>
                    <label
                      htmlFor="customer-name"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <UserRound
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a753c]"
                      />
                      <input
                        id="customer-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        minLength={2}
                        maxLength={100}
                        required
                        autoComplete="name"
                        className="w-full rounded-xl border border-[#0b211d]/15 bg-[#faf9f6] py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#9a753c]"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="customer-image"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Or paste a Profile Image URL
                    </label>
                    <div className="relative">
                      <Camera
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a753c]"
                      />
                      <input
                        id="customer-image"
                        type="url"
                        value={image}
                        onChange={(event) => {
                          setImage(event.target.value);
                          setImagePreview("");
                          setSelectedFile(null);
                          setError("");
                        }}
                        className="w-full rounded-xl border border-[#0b211d]/15 bg-[#faf9f6] py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#9a753c]"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      ফাইল বেছে নিলে preview দেখা যাবে। স্থায়ীভাবে ফাইল আপলোড
                      করতে আলাদা upload service প্রয়োজন। URL দিলে Save Changes
                      দিয়ে সংরক্ষণ করতে পারবে।
                    </p>
                    {selectedFile && (
                      <p className="mt-2 flex items-center gap-2 text-xs text-[#79592c]">
                        <Upload size={14} />
                        {selectedFile.name} · Preview ready
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 rounded-xl border border-[#0b211d]/10 bg-gray-100 px-4 py-3.5 text-sm text-gray-600">
                      <Mail size={18} className="shrink-0" />
                      <span className="break-all">{user.email}</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      ইমেইল এই ফর্ম থেকে পরিবর্তন করা যাবে না।
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b211d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9a753c] disabled:opacity-60"
                    >
                      <Save size={16} />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={cancelEditing}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0b211d]/15 px-5 py-3 text-sm font-semibold transition hover:bg-gray-50 disabled:opacity-60"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-5">
                  <div className="rounded-xl border border-[#0b211d]/10 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <UserRound
                        size={19}
                        className="mt-0.5 shrink-0 text-[#9a753c]"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Full Name</p>
                        <p className="mt-1 break-words text-sm font-semibold">
                          {user.name || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#0b211d]/10 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <Mail
                        size={19}
                        className="mt-0.5 shrink-0 text-[#9a753c]"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Email Address</p>
                        <p className="mt-1 break-all text-sm font-semibold">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#0b211d]/10 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <ShieldCheck
                        size={19}
                        className="mt-0.5 shrink-0 text-[#9a753c]"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Account Status</p>
                        <p className="mt-1 text-sm font-semibold">
                          {user.emailVerified
                            ? "Email Verified"
                            : "Customer Account"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="mb-5 mt-10 flex items-center gap-3">
          <LayoutDashboard size={21} className="text-[#9a753c]" />
          <h2 className="text-xl font-semibold">Your Dashboard</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="flex h-full flex-col rounded-2xl border border-[#0b211d]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5efe4] text-[#9a753c]">
                  <Icon size={23} />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9a753c]">
                  {item.label}
                  {item.href && <ArrowRight size={16} />}
                </span>
              </div>
            );

            if (item.href === "#profile") {
              return (
                <a
                  key={item.title}
                  href="#profile"
                  onClick={() => {
                    startEditing();
                  }}
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return item.href ? (
              <Link key={item.title} href={item.href} className="block">
                {content}
              </Link>
            ) : (
              <div key={item.title}>{content}</div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-[#d7b47a]/30 bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#f5efe4] p-3 text-[#9a753c]">
              <ShoppingBag size={22} />
            </div>
            <div>
              <h3 className="font-semibold">Your orders, all in one place</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Order history and live order tracking will be available once
                the order management system is connected.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#9a753c] hover:text-[#0b211d]"
              >
                Contact our team
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-gray-400">
          © 2026 EMU CERAMIC. All rights reserved.
        </p>
      </div>
    </main>
  );
}
