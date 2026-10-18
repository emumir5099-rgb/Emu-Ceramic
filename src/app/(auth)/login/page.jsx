"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("Login system is not connected yet.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        {/* Logo and tagline */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="relative mb-4 block h-20 w-52 sm:h-24 sm:w-60">
            <Image
              src="/emu-ceramic.png"
              alt="EMU CERAMIC Logo"
              fill
              priority
              sizes="(max-width: 640px) 208px, 240px"
              className="object-contain"
            />
          </Link>

          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9a753c] sm:text-xs">
            Beauty in Every Detail
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#0b211d] sm:text-3xl">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to your EMU CERAMIC account
          </p>
        </div>

        {/* Login form */}
        <div className="rounded-2xl border border-[#0b211d]/10 bg-white p-6 shadow-[0_12px_40px_rgba(11,33,29,0.07)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#0b211d]"
              >
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#faf9f6] px-4 transition focus-within:border-[#b18b4e] focus-within:ring-2 focus-within:ring-[#d7b47a]/20">
                <Mail size={18} className="shrink-0 text-gray-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-[#0b211d] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#0b211d]"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#9a753c] hover:text-[#0b211d]"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#faf9f6] px-4 transition focus-within:border-[#b18b4e] focus-within:ring-2 focus-within:ring-[#d7b47a]/20">
                <LockKeyhole
                  size={18}
                  className="shrink-0 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-[#0b211d] outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-gray-400 hover:text-[#0b211d]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b211d] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#173b32]"
            >
              Sign In
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {message && (
              <p
                role="status"
                className="rounded-lg bg-amber-50 p-3 text-center text-sm text-amber-800"
              >
                {message}
              </p>
            )}
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">NEW CUSTOMER?</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <Link
            href="/register"
            className="flex w-full items-center justify-center rounded-xl border border-[#0b211d]/20 px-5 py-3.5 text-sm font-semibold text-[#0b211d] transition hover:bg-[#0b211d]/5"
          >
            Create an Account
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-[#0b211d]"
          >
            Back to Home
          </Link>

          <p className="mt-4 text-xs text-gray-400">
            © 2026 EMU CERAMIC. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}