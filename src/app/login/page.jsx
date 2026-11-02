
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        rememberMe,
        callbackURL: "/dashboard",
      });

      if (error) {
        setError(error.message || "Invalid email or password.");
        return;
      }

      if (data) {
        toast.success("Login successful!");
        router.replace("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setMessage("");

    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (error) {
        setError(error.message || "Google login failed.");
        setGoogleLoading(false);
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Unable to sign in with Google. Please try again.");
      setGoogleLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12 md:py-20">
      <div className="studio-container">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-[#EAE7DF] bg-white shadow-sm lg:grid-cols-2">

          {/* Left visual section */}
          <div className="relative hidden min-h-[650px] overflow-hidden bg-[#252724] p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#252724]/50 via-[#252724]/40 to-[#252724]" />

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C66B45] text-xl font-bold">
                  S
                </span>

                <span className="text-2xl font-bold">
                  Studio<span className="text-[#C66B45]">Space</span>
                </span>
              </Link>
            </div>

            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Sparkles className="text-[#C66B45]" size={25} />
              </div>

              <h2 className="max-w-md text-4xl font-semibold leading-tight">
                Your next creative idea deserves the perfect space.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
                Discover inspiring studios, connect with creative people,
                and bring your next big project to life.
              </p>

              <div className="mt-10 flex items-center gap-3">
                <div className="h-1 w-10 rounded-full bg-[#C66B45]" />
                <div className="h-1 w-5 rounded-full bg-white/40" />
                <div className="h-1 w-5 rounded-full bg-white/40" />
              </div>
            </div>

            <p className="relative z-10 text-xs text-white/50">
              CREATE WITHOUT LIMITS — STUDIOSPACE
            </p>
          </div>

          {/* Login form */}
          <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-14">
            <div className="w-full max-w-md">

              <Link
                href="/"
                className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#777970] transition hover:text-[#C66B45] lg:hidden"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C66B45] font-bold text-white">
                  S
                </span>
                StudioSpace
              </Link>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C66B45]">
                Welcome Back
              </p>

              <h1 className="mt-3 text-3xl font-semibold text-[#252724] sm:text-4xl">
                Sign in to your account
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#777970]">
                Welcome back! Enter your details to access your creative
                workspace.
              </p>

              {/* Google login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading || loading}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-[#E5E2DA] bg-white px-5 py-4 text-sm font-semibold text-[#252724] transition hover:bg-[#FAF9F6] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.72 6C44.44 37.94 46.98 31.87 46.98 24.55Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.92 23.92 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.93-5.8l-7.72-6c-2.14 1.44-4.88 2.3-8.21 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  />
                </svg>

                {googleLoading ? "Connecting..." : "Continue with Google"}
              </button>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#EAE7DF]" />
                <span className="text-xs text-[#99998F]">
                  OR CONTINUE WITH EMAIL
                </span>
                <div className="h-px flex-1 bg-[#EAE7DF]" />
              </div>

              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#252724]"
                  >
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#E5E2DA] px-4 transition focus-within:border-[#C66B45]">
                    <Mail size={19} className="text-[#99998F]" />

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full bg-transparent py-4 text-sm text-[#252724] outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-[#252724]"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#C66B45] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-[#E5E2DA] px-4 transition focus-within:border-[#C66B45]">
                    <LockKeyhole size={19} className="text-[#99998F]" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="w-full bg-transparent py-4 text-sm text-[#252724] outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#99998F] hover:text-[#252724]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer items-center gap-3 text-sm text-[#777970]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-[#C66B45]"
                  />
                  Remember me
                </label>

                {/* Error */}
                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </p>
                )}

                {/* Message */}
                {message && (
                  <p
                    role="status"
                    className="rounded-lg bg-[#F0EEE8] px-4 py-3 text-sm leading-6 text-[#697B63]"
                  >
                    {message}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#252724] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#C66B45] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-[#777970]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#C66B45] hover:underline"
                >
                  Create account
                </Link>
              </p>

              <p className="mt-8 text-center text-xs leading-6 text-[#99998F]">
                By signing in, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

