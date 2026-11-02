"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  ShieldCheck,
  ShieldAlert,
  CalendarDays,
  ArrowLeft,
  LayoutDashboard,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  if (isPending || !user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#C66B45]" />
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12">
      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#555] hover:text-[#C66B45]"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#C66B45]">
            My Account
          </p>

          <h1 className="text-3xl font-bold text-[#252724] md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-[#777]">
            View your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-[#E9E6DE] bg-white shadow-sm">

          {/* Profile Header */}
          <div className="bg-[#F0EEE8] px-6 py-10 text-center">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="mx-auto h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
              />
            ) : (
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#C66B45] text-white shadow-md">
                <User size={45} />
              </div>
            )}

            <h2 className="mt-5 text-2xl font-bold text-[#252724]">
              {user.name || "User"}
            </h2>

            <p className="mt-1 text-sm text-[#777]">
              {user.email}
            </p>

            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#697B63]">
              <ShieldCheck size={15} />
              StudioSpace Member
            </span>
          </div>

          {/* Account Information */}
          <div className="p-6 md:p-8">
            <h3 className="mb-6 text-lg font-bold text-[#252724]">
              Account Information
            </h3>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Name */}
              <div className="rounded-2xl border border-[#E9E6DE] p-5">
                <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                  <User size={19} />
                  <span className="text-sm font-semibold">Full Name</span>
                </div>

                <p className="break-words font-medium text-[#252724]">
                  {user.name || "Not available"}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-[#E9E6DE] p-5">
                <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                  <Mail size={19} />
                  <span className="text-sm font-semibold">Email Address</span>
                </div>

                <p className="break-words font-medium text-[#252724]">
                  {user.email}
                </p>
              </div>

              {/* Verification */}
              <div className="rounded-2xl border border-[#E9E6DE] p-5">
                <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                  {user.emailVerified ? (
                    <ShieldCheck size={19} />
                  ) : (
                    <ShieldAlert size={19} />
                  )}

                  <span className="text-sm font-semibold">
                    Email Verification
                  </span>
                </div>

                <p
                  className={`font-semibold ${
                    user.emailVerified
                      ? "text-[#697B63]"
                      : "text-amber-600"
                  }`}
                >
                  {user.emailVerified ? "Verified" : "Not Verified"}
                </p>
              </div>

              {/* Joined Date */}
              <div className="rounded-2xl border border-[#E9E6DE] p-5">
                <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                  <CalendarDays size={19} />
                  <span className="text-sm font-semibold">
                    Member Since
                  </span>
                </div>

                <p className="font-medium text-[#252724]">
                  {joinedDate}
                </p>
              </div>
            </div>

            {/* User ID */}
            <div className="mt-5 rounded-2xl border border-[#E9E6DE] p-5">
              <p className="mb-2 text-sm font-semibold text-[#C66B45]">
                Account ID
              </p>

              <p className="break-all font-mono text-sm text-[#555]">
                {user.id}
              </p>
            </div>

            {/* Dashboard Button */}
            <Link
              href="/dashboard"
              className="btn mt-8 w-full rounded-xl border-0 bg-[#C66B45] text-white hover:bg-[#ad5937]"
            >
              <LayoutDashboard size={18} />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}