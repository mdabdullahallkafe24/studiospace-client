
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Building2,
  CalendarCheck,
  CalendarDays,
  Plus,
  ArrowUpRight,
  Clock,
  MapPin,
  LogOut,
  LoaderCircle,
  Image as ImageIcon,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { getMyListings, getMyBookings } from "@/lib/api";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [studios, setStudios] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [studioResult, bookingResult] = await Promise.all([
          getMyListings(),
          getMyBookings(),
        ]);

        const studioList = Array.isArray(studioResult)
          ? studioResult
          : studioResult?.studios || studioResult?.items || [];

        const bookingList = Array.isArray(bookingResult)
          ? bookingResult
          : bookingResult?.bookings || bookingResult?.items || [];

        setStudios(studioList);
        setBookings(bookingList);
      } catch (error) {
        toast.error(error.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const upcomingBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "upcoming"
  );

  const completedBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "completed"
  );

  const recentBookings = [...bookings]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0).getTime();
      const dateB = new Date(b.createdAt || b.date || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 4);

  const stats = [
    {
      title: "Total Listings",
      value: studios.length,
      note: "Your listed creative spaces",
      icon: Building2,
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      note: "Your reservations",
      icon: CalendarCheck,
    },
    {
      title: "Upcoming Bookings",
      value: upcomingBookings.length,
      note: "Your upcoming sessions",
      icon: Clock,
    },
    {
      title: "Completed Bookings",
      value: completedBookings.length,
      note: "Your booking history",
      icon: CalendarDays,
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

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(`${date}`.slice(0, 10) + "T00:00:00");

    if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes || 0));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
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
                Welcome back{user?.name ? `, ${user.name}` : ""}! Manage your
                creative spaces, bookings and hosting activity.
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

          {/* Statistics */}
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
                    {loading ? "—" : stat.value}
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

            {/* Recent Bookings */}
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

              {loading ? (
                <div className="flex justify-center py-12">
                  <LoaderCircle
                    className="animate-spin text-[#C66B45]"
                    size={28}
                  />
                </div>
              ) : recentBookings.length === 0 ? (
                <div className="rounded-xl bg-[#FAF9F6] px-5 py-10 text-center">
                  <Clock className="mx-auto mb-3 text-[#C66B45]" size={30} />

                  <h3 className="font-medium text-[#252724]">
                    No bookings yet
                  </h3>

                  <p className="mt-2 text-sm text-[#999]">
                    Your booking activity will appear here.
                  </p>

                  <Link
                    href="/studios"
                    className="mt-4 inline-block text-sm font-semibold text-[#C66B45] hover:underline"
                  >
                    Explore Studios
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking._id || booking.id}
                      className="flex items-center gap-4 rounded-xl bg-[#FAF9F6] p-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F0EEE8] text-[#C66B45]">
                        {booking.studioImage ? (
                          <img
                            src={booking.studioImage}
                            alt={booking.studioName || "Studio"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Building2 size={22} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-[#252724]">
                          {booking.studioName || "Studio"}
                        </h3>

                        <p className="mt-1 text-xs text-[#777970]">
                          {formatDate(booking.date)}
                          {booking.startTime
                            ? ` · ${formatTime(booking.startTime)}`
                            : ""}
                        </p>

                        <p className="mt-1 text-xs capitalize text-[#697B63]">
                          {booking.status}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-semibold text-[#C66B45]">
                        ${Number(booking.totalPrice || 0).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/my-bookings"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C66B45] hover:underline"
              >
                View all bookings
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Your Studios */}
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

              {loading ? (
                <div className="flex justify-center py-12">
                  <LoaderCircle
                    className="animate-spin text-[#C66B45]"
                    size={28}
                  />
                </div>
              ) : studios.length === 0 ? (
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
              ) : (
                <div className="space-y-4">
                  {studios.slice(0, 4).map((studio) => (
                    <Link
                      key={studio._id || studio.id}
                      href={`/studios/${studio._id || studio.id}`}
                      className="flex items-center gap-4 rounded-xl bg-[#FAF9F6] p-4 transition hover:bg-[#F0EEE8]"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F0EEE8] text-[#C66B45]">
                        {studio.image ? (
                          <img
                            src={studio.image}
                            alt={studio.name || "Studio"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={23} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-[#252724]">
                          {studio.name || "Untitled Studio"}
                        </h3>

                        <p className="mt-1 flex items-center gap-1 truncate text-xs text-[#777970]">
                          <MapPin size={12} />
                          {studio.location || "Location unavailable"}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-[#C66B45]">
                          ${Number(studio.pricePerHour || 0).toFixed(2)} / hour
                        </p>
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-[#999]"
                      />
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/my-listings"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C66B45] hover:underline"
              >
                Manage Listings
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </section>

          {/* Hosting Tip */}
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
