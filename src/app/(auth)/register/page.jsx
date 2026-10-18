"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();
    const phone = String(formData.get("phone") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    setMessage("");

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 8) {
      setMessageType("error");
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/login",
      });

      if (result.error) {
        setMessageType("error");
        setMessage(
          result.error.message || "Registration failed. Please try again."
        );
        return;
      }

      setMessageType("success");
      setMessage(
        "Account created successfully! You can now sign in."
      );
      form.reset();
      setShowPassword(false);

      // Phone is collected by the form but is not saved by
      // Better Auth unless phone is configured as an additional field.
      console.log("Registration completed for:", email);
    } catch (error) {
      console.error("Registration error:", error);

      setMessageType("error");
      setMessage(
        "Unable to create your account. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-7 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/emu-ceramic.png"
              alt="EMU CERAMIC Logo"
              width={160}
              height={100}
              priority
              className="mx-auto h-auto w-32 object-contain"
            />
          </Link>

          <p className="mt-2 text-xs tracking-[0.2em] text-[#8B7355]">
            ELEGANCE IN EVERY SURFACE
          </p>

          <h1 className="mt-6 text-3xl font-semibold text-[#183B35]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join EMU CERAMIC and discover timeless designs.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-[#183B35]"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#183B35] focus:ring-2 focus:ring-[#183B35]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#183B35]"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#183B35] focus:ring-2 focus:ring-[#183B35]/10"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-[#183B35]"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                autoComplete="tel"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#183B35] focus:ring-2 focus:ring-[#183B35]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[#183B35]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#183B35] focus:ring-2 focus:ring-[#183B35]/10"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-[#183B35]"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password again"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#183B35] focus:ring-2 focus:ring-[#183B35]/10"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 accent-[#183B35]"
              />
              Show password
            </label>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`rounded-lg p-3 text-sm ${
                  messageType === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#183B35] px-4 py-3 font-medium text-white transition hover:bg-[#24564D] focus:outline-none focus:ring-2 focus:ring-[#183B35] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#183B35] underline-offset-4 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © EMU CERAMIC. All rights reserved.
        </p>

        <div className="mt-3 text-center">
          <Link
            href="/"
            className="text-sm text-[#183B35] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}