
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        setIsError(true);
        setMessage(
          result.error.message || "Login failed. Check your email and password."
        );
        return;
      }

      setMessage("Login successful! Redirecting...");
      router.push("/client");
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link
            href="/"
            className="relative mb-4 block h-20 w-52 sm:h-24 sm:w-60"
          >
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                <LockKeyhole size={18} className="shrink-0 text-gray-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b211d] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#173b32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`rounded-lg p-3 text-center text-sm ${
                  isError
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-800"
                }`}
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
