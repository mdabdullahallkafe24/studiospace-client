
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    toast.info("Password reset will be available after backend integration.");
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#FAF9F6] px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border border-[#EAE7DF] bg-white p-7 shadow-sm sm:p-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#777970] transition hover:text-[#C66B45]"
        >
          <ArrowLeft size={17} />
          Back to Login
        </Link>

        <div className="mt-9 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBF3EF] text-[#C66B45]">
          <Mail size={26} />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C66B45]">
          Account Recovery
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-[#252724]">
          Forgot Password?
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#777970]">
          Enter the email address associated with your account.
          We will help you reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-[#252724]"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-[#E5E2DA] bg-[#FAF9F6] px-4 py-4 text-sm text-[#252724] outline-none transition focus:border-[#C66B45]"
          />

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#C66B45] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#252724]"
          >
            <Send size={17} />
            Reset Password
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#777970]">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#C66B45] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
