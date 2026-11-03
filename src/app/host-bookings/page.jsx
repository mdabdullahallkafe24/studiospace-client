
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  Users,
  MapPin,
  ArrowLeft,
  Inbox,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  getHostBookings,
  updateHostBookingStatus,
} from "@/lib/api";

function HostBookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);
        setError("");

        const result = await getHostBookings();

        const bookingList = Array.isArray(result)
          ? result
          : result?.bookings || result?.items || [];

        setBookings(bookingList);
      } catch (err) {
        setError(err.message || "Failed to load host bookings.");
        toast.error(err.message || "Failed to load host bookings.");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  const handleStatusUpdate = async (booking, status) => {
    const bookingId = booking._id || booking.id;

    if (!bookingId) {
      toast.error("Booking ID not found.");
      return;
    }

    try {
      setUpdatingId(bookingId);

      await updateHostBookingStatus(bookingId, status);

      setBookings((previousBookings) =>
        previousBookings.map((item) =>
          (item._id || item.id) === bookingId
            ? { ...item, status }
            : item
        )
      );

      toast.success(
        status === "confirmed"
          ? "Booking confirmed successfully!"
          : "Booking cancelled successfully!"
      );
    } catch (err) {
      toast.error(err.message || "Failed to update booking status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price) =>
    `৳${Number(price || 0).toLocaleString("en-BD")}`;

  const getStatus = (status) => {
    const normalized = status?.toLowerCase();

    if (normalized === "upcoming") return "confirmed";

    return normalized || "pending";
  };

  const getStatusStyle = (status) => {
    switch (getStatus(status)) {
      case "pending":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";

      case "confirmed":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300";

      case "completed":
        return "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300";

      case "cancelled":
        return "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300";

      default:
        return "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300";
    }
  };

  const upcomingCount = bookings.filter((booking) =>
    ["pending", "confirmed"].includes(getStatus(booking.status))
  ).length;

  const pendingCount = bookings.filter(
    (booking) => getStatus(booking.status) === "pending"
  ).length;

  const completedCount = bookings.filter(
    (booking) => getStatus(booking.status) === "completed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => getStatus(booking.status) === "cancelled"
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-4 py-10 text-[#252724] dark:bg-[#171916] dark:text-[#FAF9F6] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#C66B45] dark:text-gray-400"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C66B45]">
            Host Dashboard
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Booking Requests & Reservations
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Keep track of bookings made by guests for your creative spaces.
            Confirm or cancel pending booking requests.
          </p>
        </div>

        {/* Booking Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#F0EEE8] bg-white p-5 dark:border-white/10 dark:bg-[#22251F]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Bookings
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F0EEE8] bg-white p-5 dark:border-white/10 dark:bg-[#22251F]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pending Requests
            </p>
            <p className="mt-2 text-3xl font-semibold text-amber-600">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F0EEE8] bg-white p-5 dark:border-white/10 dark:bg-[#22251F]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upcoming
            </p>
            <p className="mt-2 text-3xl font-semibold text-[#697B63]">
              {upcomingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F0EEE8] bg-white p-5 dark:border-white/10 dark:bg-[#22251F]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed / Cancelled
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {completedCount} / {cancelledCount}
            </p>
          </div>
        </div>

        {/* Bookings List */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Guest Bookings</h2>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {bookings.length} reservations
          </span>
        </div>

        {error && bookings.length === 0 ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#D9D6CD] bg-white px-6 py-16 text-center dark:border-white/15 dark:bg-[#22251F]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F0EEE8] text-[#697B63] dark:bg-white/10">
              <Inbox size={25} />
            </div>

            <h3 className="text-lg font-semibold">
              No guest bookings yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
              When someone books one of your studios, their reservation will
              appear here.
            </p>

            <Link
              href="/my-listings"
              className="mt-6 inline-flex rounded-full bg-[#252724] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C66B45] dark:bg-[#FAF9F6] dark:text-[#252724]"
            >
              View My Studios
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => {
              const bookingId = booking._id || booking.id;
              const status = getStatus(booking.status);
              const isUpdating = updatingId === bookingId;

              return (
                <div
                  key={bookingId}
                  className="overflow-hidden rounded-2xl border border-[#F0EEE8] bg-white dark:border-white/10 dark:bg-[#22251F]"
                >
                  <div className="grid md:grid-cols-[220px_1fr]">
                    {/* Studio Image */}
                    <div className="relative h-52 bg-[#F0EEE8] md:h-full">
                      {booking.studioImage ? (
                        <Image
                          src={booking.studioImage}
                          alt={booking.studioName || "Studio"}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 220px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                          No image available
                        </div>
                      )}
                    </div>

                    {/* Booking Details */}
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#C66B45]">
                            Studio Reservation
                          </p>

                          <h3 className="mt-1 text-xl font-semibold">
                            {booking.studioName}
                          </h3>

                          <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                            <MapPin size={15} />
                            {booking.location || "Location unavailable"}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(status)}`}
                        >
                          {status}
                        </span>
                      </div>

                      <div className="my-5 grid grid-cols-1 gap-4 border-y border-[#F0EEE8] py-4 dark:border-white/10 sm:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={17} className="text-[#C66B45]" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Date
                            </p>
                            <p className="text-sm font-medium">
                              {formatDate(booking.date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock size={17} className="text-[#C66B45]" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Start Time
                            </p>
                            <p className="text-sm font-medium">
                              {booking.startTime}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users size={17} className="text-[#C66B45]" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Guests
                            </p>
                            <p className="text-sm font-medium">
                              {booking.guests}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Guest Email
                          </p>

                          <p className="mt-1 text-sm font-medium">
                            {booking.userEmail || "Not available"}
                          </p>

                          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Duration: {booking.hours} hours
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Total Booking Amount
                          </p>

                          <p className="mt-1 text-2xl font-semibold text-[#C66B45]">
                            {formatPrice(booking.totalPrice)}
                          </p>
                        </div>
                      </div>

                      {/* Host Actions */}
                      {status === "pending" && (
                        <div className="mt-6 flex flex-wrap gap-3 border-t border-[#F0EEE8] pt-5 dark:border-white/10">
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusUpdate(booking, "confirmed")
                            }
                            disabled={isUpdating}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#697B63] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#56664F] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <CheckCircle size={17} />
                            {isUpdating ? "Updating..." : "Confirm Booking"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleStatusUpdate(booking, "cancelled")
                            }
                            disabled={isUpdating}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:hover:bg-red-950/30"
                          >
                            <XCircle size={17} />
                            {isUpdating ? "Updating..." : "Cancel Booking"}
                          </button>
                        </div>
                      )}

                      {status !== "pending" && (
                        <p className="mt-5 border-t border-[#F0EEE8] pt-4 text-xs text-gray-500 dark:border-white/10 dark:text-gray-400">
                          This booking has been {status}. No further action is
                          available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HostBookingsPage() {
  return (
    <ProtectedRoute>
      <HostBookingsContent />
    </ProtectedRoute>
  );
}
