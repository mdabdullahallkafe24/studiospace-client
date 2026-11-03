
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowUpRight,
  CalendarCheck,
  Filter,
  Trash2,
  XCircle,
  Users,
  Image as ImageIcon,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  getMyBookings,
  cancelBooking,
  deleteBooking,
} from "@/lib/api";

const filters = [
  "All Bookings",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export default function MyBookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All Bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionType, setActionType] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getMyBookings();

      const list = Array.isArray(result)
        ? result
        : result?.bookings || result?.items || [];

      setBookings(list);
    } catch (err) {
      setError(err.message || "Could not load your bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatus = (booking) => {
    const status = booking.status?.toLowerCase();

    // Support old bookings created with the previous status.
    if (status === "upcoming") return "confirmed";

    return status || "pending";
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === "All Bookings") return true;

    return getStatus(booking) === activeFilter.toLowerCase();
  });

  const upcomingCount = bookings.filter((booking) => {
    const status = getStatus(booking);
    return status === "pending" || status === "confirmed";
  }).length;

  const completedCount = bookings.filter(
    (booking) => getStatus(booking) === "completed"
  ).length;

  const pendingCount = bookings.filter(
    (booking) => getStatus(booking) === "pending"
  ).length;

  const handleAction = async () => {
    if (!selectedBooking || !actionType) return;

    try {
      setActionLoading(true);

      const id = selectedBooking._id || selectedBooking.id;

      if (!id) {
        throw new Error("Booking ID not found.");
      }

      if (actionType === "cancel") {
        await cancelBooking(id);
        toast.success("Booking cancelled successfully.");
      } else if (actionType === "delete") {
        await deleteBooking(id);
        toast.success("Booking deleted successfully.");
      }

      setSelectedBooking(null);
      setActionType("");

      await fetchBookings();
    } catch (err) {
      toast.error(err.message || "Action could not be completed.");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(
      `${String(date).slice(0, 10)}T00:00:00`
    );

    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "Time unavailable";

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes || 0), 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const statusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700";

      case "confirmed":
        return "bg-blue-50 text-blue-700";

      case "completed":
        return "bg-green-50 text-green-700";

      case "cancelled":
        return "bg-red-50 text-red-700";

      default:
        return "bg-[#F0EEE8] text-[#777970]";
    }
  };

  const statusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Pending";

      case "confirmed":
        return "Confirmed";

      case "completed":
        return "Completed";

      case "cancelled":
        return "Cancelled";

      default:
        return status;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FAF9F6] px-5 py-12">
        <div className="studio-container">

          {/* Page Header */}
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[3px] text-[#C66B45]">
              Your Reservations
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-[#252724] md:text-5xl">
              My Bookings
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#777970]">
              Keep track of your studio reservations, upcoming sessions and
              booking history.
            </p>
          </div>

          {/* Statistics */}
          <div className="mb-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Bookings",
                value: bookings.length,
                icon: CalendarDays,
              },
              {
                title: "Upcoming",
                value: upcomingCount,
                icon: Clock,
              },
              {
                title: "Pending",
                value: pendingCount,
                icon: CalendarCheck,
              },
              {
                title: "Completed",
                value: completedCount,
                icon: CalendarCheck,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl border border-[#E9E6DE] bg-white p-6"
                >
                  <div>
                    <p className="text-sm text-[#777970]">
                      {item.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold text-[#252724]">
                      {loading ? "—" : item.value}
                    </h2>
                  </div>

                  <div className="rounded-xl bg-[#F0EEE8] p-3 text-[#C66B45]">
                    <Icon size={22} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Booking History Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-[#252724]">
                Booking History
              </h2>

              <p className="mt-1 text-sm text-[#777970]">
                View and manage all your reservations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Filter size={16} className="mr-1 text-[#777970]" />

              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    activeFilter === filter
                      ? "bg-[#252724] text-white"
                      : "border border-[#E9E6DE] bg-white text-[#777970] hover:border-[#C66B45] hover:text-[#C66B45]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center rounded-2xl border border-[#E9E6DE] bg-white py-20">
              <LoaderCircle
                className="animate-spin text-[#C66B45]"
                size={32}
              />
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
              <p className="text-red-600">{error}</p>

              <button
                onClick={fetchBookings}
                className="mt-5 rounded-xl bg-[#252724] px-6 py-3 text-sm text-white"
              >
                Try Again
              </button>
            </div>
          ) : filteredBookings.length === 0 ? (
            /* Empty State */
            <div className="rounded-2xl border border-[#E9E6DE] bg-white px-6 py-16 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F0EEE8] text-[#C66B45]">
                <CalendarDays size={35} />
              </div>

              <h3 className="text-xl font-semibold text-[#252724]">
                {activeFilter === "All Bookings"
                  ? "No bookings yet"
                  : `No ${activeFilter.toLowerCase()} bookings`}
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#777970]">
                {activeFilter === "All Bookings"
                  ? "You haven't booked any creative spaces yet. Explore our studios and find the perfect place for your next project."
                  : "Your bookings in this category will appear here when available."}
              </p>

              <Link
                href="/studios"
                className="btn mt-7 rounded-xl border-0 bg-[#C66B45] px-6 text-white hover:bg-[#ad5937]"
              >
                Explore Studios
                <ArrowUpRight size={17} />
              </Link>
            </div>
          ) : (
            /* Booking Cards */
            <div className="space-y-4">
              {filteredBookings.map((booking) => {
                const status = getStatus(booking);

                return (
                  <div
                    key={booking._id || booking.id}
                    className="rounded-2xl border border-[#E9E6DE] bg-white p-6"
                  >
                    <div className="flex flex-col justify-between gap-5 sm:flex-row">
                      <div className="flex gap-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F0EEE8]">
                          {booking.studioImage ? (
                            <img
                              src={booking.studioImage}
                              alt={booking.studioName || "Studio"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon
                              className="text-[#C66B45]"
                              size={26}
                            />
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-[#252724]">
                            {booking.studioName || "Studio"}
                          </h3>

                          <p className="mt-2 flex items-center gap-2 text-sm text-[#777970]">
                            <MapPin size={15} />
                            {booking.location || "Location unavailable"}
                          </p>

                          <p className="mt-2 flex items-center gap-2 text-sm text-[#777970]">
                            <CalendarDays size={15} />
                            {formatDate(booking.date)}
                          </p>

                          <p className="mt-2 flex items-center gap-2 text-sm text-[#777970]">
                            <Clock size={15} />
                            {formatTime(booking.startTime)} · {booking.hours} hours
                          </p>

                          <p className="mt-2 flex items-center gap-2 text-sm text-[#777970]">
                            <Users size={15} />
                            {booking.guests || 1} guests
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-3 sm:items-end">
                        <span
                          className={`rounded-full px-4 py-2 text-xs font-semibold ${statusStyle(status)}`}
                        >
                          {statusLabel(status)}
                        </span>

                        <p className="text-lg font-semibold text-[#C66B45]">
                          ${Number(booking.totalPrice || 0).toFixed(2)}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {/* Cancel only pending bookings */}
                          {status === "pending" && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setActionType("cancel");
                              }}
                              className="flex items-center gap-2 rounded-lg border border-[#E9E6DE] px-3 py-2 text-xs font-medium text-[#777970] transition hover:border-red-300 hover:text-red-600"
                            >
                              <XCircle size={15} />
                              Cancel Booking
                            </button>
                          )}

                          {/* Delete booking */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setActionType("delete");
                            }}
                            className="flex items-center gap-2 rounded-lg border border-[#E9E6DE] px-3 py-2 text-xs font-medium text-[#777970] transition hover:border-red-300 hover:text-red-600"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
            <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
              <h3 className="text-xl font-semibold text-[#252724]">
                {actionType === "cancel"
                  ? "Cancel Booking?"
                  : "Delete Booking?"}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#777970]">
                {actionType === "cancel"
                  ? "Are you sure you want to cancel this pending booking? The booking record will remain in your history."
                  : "Are you sure you want to permanently delete this booking? This action cannot be undone."}
              </p>

              <div className="mt-7 flex justify-end gap-3">
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => {
                    setSelectedBooking(null);
                    setActionType("");
                  }}
                  className="rounded-xl border border-[#E9E6DE] px-5 py-3 text-sm disabled:opacity-60"
                >
                  Keep Booking
                </button>

                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={handleAction}
                  className="flex items-center gap-2 rounded-xl bg-[#C66B45] px-5 py-3 text-sm text-white hover:bg-[#ad5937] disabled:opacity-60"
                >
                  {actionLoading && (
                    <LoaderCircle size={15} className="animate-spin" />
                  )}

                  {actionType === "cancel"
                    ? "Yes, Cancel"
                    : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
