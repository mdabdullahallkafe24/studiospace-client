
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  X,
  CalendarDays,
  Clock,
  Users,
  Wallet,
  ArrowRight,
} from "lucide-react";

import { createBooking } from "@/lib/api";

export default function BookingModal({
  studio,
  onClose,
  onBookingSubmit,
}) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [hours, setHours] = useState("2");
  const [guests, setGuests] = useState("1");
  const [loading, setLoading] = useState(false);

  if (!studio) return null;

  const price = Number(
    studio.pricePerHour || studio.price || studio.hourlyPrice || 0
  );

  const total = price * Number(hours);

  const today = new Date().toLocaleDateString("en-CA");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !startTime || !hours || !guests) {
      toast.error("Please complete all booking details.");
      return;
    }

    if (date < today) {
      toast.error("Please select today or a future date.");
      return;
    }

    if (Number(guests) < 1 || Number(hours) < 1) {
      toast.error("Please enter valid booking details.");
      return;
    }

    if (studio.capacity && Number(guests) > Number(studio.capacity)) {
      toast.error(`Maximum guest capacity is ${studio.capacity}.`);
      return;
    }

    try {
      setLoading(true);

      const bookingData = {
        studioId: studio._id || studio.id,
        date,
        startTime,
        hours: Number(hours),
        guests: Number(guests),
      };

      if (onBookingSubmit) {
        await onBookingSubmit(bookingData);
      } else {
        await createBooking(bookingData);
      }

      toast.success("Your studio booking was successful!");

      onClose?.();
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error(error.message || "Unable to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(e) => e.stopPropagation()}
        className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:p-8"
      >
        {/* Header */}
        <div className="mb-7 flex items-start justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[#C66B45]">
              Reserve Your Space
            </p>

            <h2
              id="booking-title"
              className="text-2xl font-semibold text-[#252724]"
            >
              Book This Studio
            </h2>

            <p className="mt-2 text-sm text-[#777970]">
              {studio.name || studio.title || "Creative Studio"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking modal"
            className="rounded-full bg-[#F0EEE8] p-2 text-[#252724] hover:bg-[#E5E1D8]"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#252724]">
              <CalendarDays size={16} className="text-[#C66B45]" />
              Booking Date
            </label>

            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-white"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#252724]">
              <Clock size={16} className="text-[#C66B45]" />
              Starting Time
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-white"
              required
            />
          </div>

          {/* Duration and Guests */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#252724]">
                Duration
              </label>

              <select
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="select select-bordered w-full rounded-xl bg-white"
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
                <option value="5">5 Hours</option>
                <option value="6">6 Hours</option>
                <option value="8">8 Hours</option>
              </select>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#252724]">
                <Users size={15} />
                Guests
              </label>

              <input
                type="number"
                min="1"
                max={studio.capacity || 100}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-white"
                required
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="rounded-xl bg-[#F0EEE8] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#252724]">
              <Wallet size={17} className="text-[#C66B45]" />
              Price Summary
            </div>

            <div className="flex justify-between text-sm text-[#777970]">
              <span>Hourly rate</span>
              <span>${price.toFixed(2)} / hour</span>
            </div>

            <div className="mt-2 flex justify-between text-sm text-[#777970]">
              <span>Duration</span>
              <span>{hours} hours</span>
            </div>

            <div className="my-4 border-t border-[#DCD8CF]" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#252724]">
                Total Amount
              </span>

              <span className="text-2xl font-bold text-[#C66B45]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || price <= 0}
            className="btn w-full rounded-xl border-0 bg-[#C66B45] text-white hover:bg-[#ad5937]"
          >
            {loading ? "Processing..." : "Continue to Booking"}
            <ArrowRight size={17} />
          </button>

          <p className="text-center text-xs leading-5 text-[#999]">
            Your booking request will be processed securely.
          </p>
        </form>
      </div>
    </div>
  );
}
