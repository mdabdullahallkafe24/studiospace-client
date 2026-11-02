
"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const exploreLinks = [
  "Photography Studios",
  "Podcast Rooms",
  "Music Suites",
  "Film & Production",
  "Art Workshops",
];

const companyLinks = [
  { name: "About Us", href: "/#about" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Explore Studios", href: "/studios" },
  { name: "Become a Host", href: "/register" },
];

const socialLinks = [
  { label: "f", href: "https://facebook.com", name: "Facebook" },
  { label: "in", href: "https://linkedin.com", name: "LinkedIn" },
  { label: "X", href: "https://x.com", name: "X" },
  { label: "ig", href: "https://instagram.com", name: "Instagram" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.info(
      "Newsletter subscription will be available after backend integration."
    );

    setEmail("");
  };

  return (
    <footer className="bg-[#252724] text-[#faf9f6]">
      {/* Main Footer */}
      <div className="studio-container px-6 pb-14 pt-20 md:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c66b45] text-2xl font-bold text-white">
                S
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Studio<span className="text-[#c66b45]">Space.</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-8 text-white/55">
              A home for creative minds. Discover inspiring studios,
              connect with passionate creators and bring your ideas to life.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xs font-bold text-white/75 transition hover:border-[#c66b45] hover:bg-[#c66b45] hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[2px] text-[#c66b45]">
              Explore
            </h3>

            <ul className="mt-7 space-y-4">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="/studios"
                    className="text-sm text-white/60 transition hover:pl-1 hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[2px] text-[#c66b45]">
              Company
            </h3>

            <ul className="mt-7 space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition hover:pl-1 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[2px] text-[#c66b45]">
              Stay Inspired
            </h3>

            <p className="mt-7 text-sm leading-7 text-white/60">
              Get creative inspiration and discover new spaces in your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-5 flex flex-col gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
                className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#c66b45]"
              />

              <button
                type="submit"
                className="rounded-full bg-[#c66b45] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#b85b36]"
              >
                Subscribe ↗
              </button>
            </form>
          </div>
        </div>

        {/* Big Footer Text */}
        <div className="mt-20 overflow-hidden border-t border-white/10 pt-10">
          <p className="text-center text-[clamp(42px,10vw,125px)] font-black leading-none tracking-[-5px] text-white/[0.06]">
            CREATE MORE.
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>
            © 2026 StudioSpace. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms of Service
            </Link>
          </div>

          <p>Made for creative minds. ✦</p>
        </div>
      </div>
    </footer>
  );
}

