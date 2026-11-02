
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowUpRight,
  CalendarCheck,
  Filter,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const filters = ["All Bookings", "Upcoming", "Completed", "Cancelled"];

export default function MyBookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All Bookings");

  // Real booking data will come from the backend later.
  const bookings = [];

  const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === "All Bookings") return true;
    return booking.status === activeFilter.toLowerCase();
  });

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

          {/* Booking Summary */}
          <div className="mb-9 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Total Bookings", value: "0", icon: CalendarDays },
              { title: "Upcoming", value: "0", icon: Clock },
              { title: "Completed", value: "0", icon: CalendarCheck },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl border border-[#E9E6DE] bg-white p-6"
                >
                  <div>
                    <p className="text-sm text-[#777970]">{item.title}</p>

                    <h2 className="mt-3 text-3xl font-semibold text-[#252724]">
                      {item.value}
                    </h2>
                  </div>

                  <div className="rounded-xl bg-[#F0EEE8] p-3 text-[#C66B45]">
                    <Icon size={22} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filters */}
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

          {/* Booking List / Empty State */}
          {filteredBookings.length === 0 ? (
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
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-[#E9E6DE] bg-white p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <h3 className="text-lg font-semibold text-[#252724]">
                        {booking.studioName}
                      </h3>

                      <p className="mt-2 flex items-center gap-2 text-sm text-[#777970]">
                        <MapPin size={15} />
                        {booking.location}
                      </p>

                      <p className="mt-2 flex items-center gap-2 text-sm text-[#777970]">
                        <CalendarDays size={15} />
                        {booking.date}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <span className="rounded-full bg-[#F0EEE8] px-4 py-2 text-xs font-semibold">
                        {booking.status}
                      </span>

                      <p className="font-semibold text-[#C66B45]">
                        ${booking.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}
