
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  CalendarCheck,
  Wallet,
  Star,
  Plus,
  ArrowUpRight,
  Clock,
  MapPin,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";

const stats = [
  {
    title: "Total Listings",
    value: "0",
    note: "Your listed creative spaces",
    icon: Building2,
  },
  {
    title: "Total Bookings",
    value: "0",
    note: "Bookings received",
    icon: CalendarCheck,
  },
  {
    title: "Total Earnings",
    value: "$0",
    note: "Your booking revenue",
    icon: Wallet,
  },
  {
    title: "Average Rating",
    value: "—",
    note: "Based on guest reviews",
    icon: Star,
  },
];

const quickActions = [
  {
    title: "Add New Studio",
    description: "List a creative space and start hosting.",
    href: "/add-studio",
    icon: Plus,
  },
  {
    title: "My Studio Listings",
    description: "Manage and update your studio spaces.",
    href: "/my-listings",
    icon: Building2,
  },
  {
    title: "My Bookings",
    description: "View your upcoming and past bookings.",
    href: "/my-bookings",
    icon: CalendarCheck,
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed. Please try again.");
        return;
      }

      toast.success("Logged out successfully!");
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong during logout.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FAF9F6] px-5 py-12">
        <div className="studio-container">

          {/* Heading */}
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[3px] text-[#C66B45]">
                Your Workspace
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-[#252724] md:text-5xl">
                Dashboard
              </h1>

              <p className="mt-4 text-sm text-[#777970]">
                Manage your creative spaces, bookings and hosting activity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/add-studio"
                className="btn rounded-xl border-0 bg-[#C66B45] text-white hover:bg-[#ad5937]"
              >
                <Plus size={18} />
                Add New Studio
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="btn rounded-xl border border-[#E9E6DE] bg-white text-[#252724] hover:bg-[#F0EEE8]"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-[#E9E6DE] bg-white p-6"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm text-[#777970]">
                      {stat.title}
                    </span>

                    <div className="rounded-xl bg-[#F0EEE8] p-3 text-[#C66B45]">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h2 className="text-3xl font-semibold text-[#252724]">
                    {stat.value}
                  </h2>

                  <p className="mt-2 text-xs text-[#999]">{stat.note}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <section className="mb-10">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#252724]">
                Quick Actions
              </h2>

              <p className="mt-2 text-sm text-[#777970]">
                Everything you need to manage your workspace.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    href={action.href}
                    key={action.title}
                    className="premium-card group rounded-2xl border border-[#E9E6DE] bg-white p-6"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div className="rounded-xl bg-[#F0EEE8] p-3 text-[#C66B45]">
                        <Icon size={22} />
                      </div>

                      <ArrowUpRight
                        size={20}
                        className="text-[#999] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#C66B45]"
                      />
                    </div>

                    <h3 className="mb-2 font-semibold text-[#252724]">
                      {action.title}
                    </h3>

                    <p className="text-sm leading-6 text-[#777970]">
                      {action.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#E9E6DE] bg-white p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#252724]">
                    Recent Bookings
                  </h2>

                  <p className="mt-1 text-xs text-[#999]">
                    Your latest reservation activity
                  </p>
                </div>

                <CalendarCheck className="text-[#C66B45]" size={22} />
              </div>

              <div className="rounded-xl bg-[#FAF9F6] px-5 py-10 text-center">
                <Clock className="mx-auto mb-3 text-[#C66B45]" size={30} />

                <h3 className="font-medium text-[#252724]">
                  No bookings yet
                </h3>

                <p className="mt-2 text-sm text-[#999]">
                  Your booking activity will appear here.
                </p>

                <Link
                  href="/my-bookings"
                  className="mt-4 inline-block text-sm font-semibold text-[#C66B45] hover:underline"
                >
                  View all bookings
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E9E6DE] bg-white p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#252724]">
                    Your Studio Spaces
                  </h2>

                  <p className="mt-1 text-xs text-[#999]">
                    Manage your listed creative spaces
                  </p>
                </div>

                <Building2 className="text-[#C66B45]" size={22} />
              </div>

              <div className="rounded-xl bg-[#FAF9F6] px-5 py-10 text-center">
                <MapPin className="mx-auto mb-3 text-[#C66B45]" size={30} />

                <h3 className="font-medium text-[#252724]">
                  No studios listed
                </h3>

                <p className="mt-2 text-sm text-[#999]">
                  Add your first creative space to get started.
                </p>

                <Link
                  href="/add-studio"
                  className="btn btn-sm mt-4 rounded-lg border-0 bg-[#C66B45] text-white hover:bg-[#ad5937]"
                >
                  <Plus size={15} />
                  Add a Studio
                </Link>
              </div>
            </div>
          </section>

          {/* Host Tip */}
          <section className="mt-10 flex flex-col justify-between gap-5 rounded-2xl bg-[#252724] p-7 text-white md:flex-row md:items-center md:p-10">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[#D99170]">
                Hosting Tip
              </p>

              <h2 className="text-2xl font-semibold">
                Make your space stand out.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
                Add beautiful photos, detailed descriptions and available
                amenities to help creative professionals discover your space.
              </p>
            </div>

            <Link
              href="/my-listings"
              className="btn w-fit rounded-xl border-0 bg-[#C66B45] text-white hover:bg-[#ad5937]"
            >
              Manage Listings
              <ArrowUpRight size={17} />
            </Link>
          </section>

        </div>
      </div>
    </ProtectedRoute>
  );
}
