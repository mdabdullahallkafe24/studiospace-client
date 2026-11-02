"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ImagePlus,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    const { name, email, photoURL, password, confirmPassword } = formData;

    // Required fields validation
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Photo URL validation
    if (photoURL.trim()) {
      try {
        const url = new URL(photoURL);

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Invalid URL");
        }
      } catch {
        setError("Please enter a valid profile photo URL.");
        return;
      }
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photoURL.trim() || undefined,
      });

      if (error) {
        setError(error.message || "Registration failed.");
        return;
      }

      setMessage("Your account has been created successfully!");

      setFormData({
        name: "",
        email: "",
        photoURL: "",
        password: "",
        confirmPassword: "",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Google registration
  async function handleGoogleRegister() {
    setError("");
    setMessage("");

    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      setError(err.message || "Google registration failed.");
      setGoogleLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12 md:py-20">
      <div className="studio-container">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-[#EAE7DF] bg-white shadow-sm lg:grid-cols-2">

          {/* Left visual section */}
          <div className="relative hidden min-h-[760px] overflow-hidden bg-[#252724] p-12 text-white lg:flex lg:flex-col lg:justify-between">
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
                Make room for your next big creative idea.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
                Join a community of creators and discover inspiring spaces
                designed to bring your vision to life.
              </p>
            </div>

            <p className="relative z-10 text-xs text-white/50">
              CREATE WITHOUT LIMITS — STUDIOSPACE
            </p>
          </div>

          {/* Registration form */}
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
                Get Started
              </p>

              <h1 className="mt-3 text-3xl font-semibold text-[#252724] sm:text-4xl">
                Create your account
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#777970]">
                Join StudioSpace and find the perfect creative space for
                your next project.
              </p>

              {/* Google registration */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={googleLoading || loading}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-[#E5E2DA] bg-white px-5 py-4 text-sm font-semibold text-[#252724] transition hover:bg-[#FAF9F6] disabled:cursor-not-allowed disabled:opacity-60"
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

                {googleLoading ? "Connecting..." : "Sign up with Google"}
              </button>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#EAE7DF]" />

                <span className="text-xs text-[#99998F]">
                  OR REGISTER WITH EMAIL
                </span>

                <div className="h-px flex-1 bg-[#EAE7DF]" />
              </div>

              <form onSubmit={handleRegister} className="space-y-4">

                {/* Full name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#252724]"
                  >
                    Full Name *
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#E5E2DA] px-4 transition focus-within:border-[#C66B45]">
                    <UserRound size={19} className="text-[#99998F]" />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent py-3.5 text-sm text-[#252724] outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#252724]"
                  >
                    Email Address *
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#E5E2DA] px-4 transition focus-within:border-[#C66B45]">
                    <Mail size={19} className="text-[#99998F]" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent py-3.5 text-sm text-[#252724] outline-none"
                    />
                  </div>
                </div>

                {/* Photo URL */}
                <div>
                  <label
                    htmlFor="photoURL"
                    className="mb-2 block text-sm font-semibold text-[#252724]"
                  >
                    Profile Photo URL{" "}
                    <span className="font-normal text-[#99998F]">
                      (Optional)
                    </span>
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#E5E2DA] px-4 transition focus-within:border-[#C66B45]">
                    <ImagePlus size={19} className="text-[#99998F]" />

                    <input
                      id="photoURL"
                      name="photoURL"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={formData.photoURL}
                      onChange={handleChange}
                      className="w-full bg-transparent py-3.5 text-sm text-[#252724] outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[#252724]"
                  >
                    Password *
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#E5E2DA] px-4 transition focus-within:border-[#C66B45]">
                    <LockKeyhole size={19} className="text-[#99998F]" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-transparent py-3.5 text-sm text-[#252724] outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      className="text-[#99998F]"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-[#99998F]">
                    At least 6 characters, including uppercase and lowercase
                    letters.
                  </p>
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-[#252724]"
                  >
                    Confirm Password *
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#E5E2DA] px-4 transition focus-within:border-[#C66B45]">
                    <LockKeyhole size={19} className="text-[#99998F]" />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-transparent py-3.5 text-sm text-[#252724] outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label="Toggle confirm password visibility"
                      className="text-[#99998F]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </p>
                )}

                {/* Success message */}
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
                  {loading ? "Creating Account..." : "Create Account"}

                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-[#777970]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#C66B45] hover:underline"
                >
                  Sign in
                </Link>
              </p>

              <p className="mt-6 text-center text-xs leading-6 text-[#99998F]">
                By creating an account, you agree to our Terms of Service
                and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}