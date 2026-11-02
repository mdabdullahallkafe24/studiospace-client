
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  ArrowLeft,
  Camera,
  CheckCircle2,
  CalendarDays,
  Clock,
  UserRound,
  RefreshCw,
} from "lucide-react";

import { getStudioById } from "@/lib/api";
import BookingModal from "@/components/BookingModal";

export default function StudioDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    async function loadStudio() {
      try {
        setLoading(true);
        setError("");

        const data = await getStudioById(id);

        if (!isMounted) return;

        const result =
          data?.studio ||
          data?.item ||
          data?.data ||
          data;

        if (!result || Array.isArray(result)) {
          throw new Error("Studio information could not be found.");
        }

        setStudio(result);
      } catch (err) {
        if (isMounted) {
          setError(
            err.message || "Unable to load studio details."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStudio();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#FAF9F6] px-5 py-16">
        <div className="studio-container animate-pulse">
          <div className="h-8 w-32 rounded bg-[#EAE7DF]" />
          <div className="mt-8 h-80 rounded-2xl bg-[#EAE7DF] md:h-[480px]" />
          <div className="mt-8 h-8 w-2/3 rounded bg-[#EAE7DF]" />
          <div className="mt-4 h-5 w-1/3 rounded bg-[#EAE7DF]" />
          <div className="mt-8 h-32 rounded-2xl bg-[#EAE7DF]" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !studio) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FAF9F6] px-5">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EEE8]">
            <Camera size={28} className="text-[#C66B45]" />
          </div>

          <h2 className="mt-5 text-2xl font-semibold text-[#252724]">
            Studio not available
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#777970]">
            {error || "We could not find this studio."}
          </p>

          <button
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#252724] px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <button
            onClick={() => window.location.reload()}
            className="mx-auto mt-4 flex items-center gap-2 text-sm font-semibold text-[#C66B45]"
          >
            <RefreshCw size={15} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Studio information
  const name = studio.name || studio.title || "Untitled Studio";

  const image =
    studio.image ||
    studio.imageUrl ||
    studio.coverImage ||
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200";

  const location =
    studio.location ||
    studio.city ||
    studio.address ||
    "Location not provided";

  const price =
    studio.pricePerHour ??
    studio.hourlyRate ??
    studio.price;

  const description =
    studio.description ||
    "Studio description is not available yet.";

  const amenities = Array.isArray(studio.amenities)
    ? studio.amenities
    : Array.isArray(studio.facilities)
      ? studio.facilities
      : [];

  const owner = studio.owner || studio.host || {};

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <section className="px-5 pb-16 pt-10 md:pb-24">
        <div className="studio-container">
          {/* Back link */}
          <Link
            href="/studios"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#777970] transition hover:text-[#C66B45]"
          >
            <ArrowLeft size={17} />
            Back to Explore
          </Link>

          {/* Cover image */}
          <div className="relative h-[280px] overflow-hidden rounded-2xl bg-[#EAE7DF] sm:h-[400px] lg:h-[520px]">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />

            {studio.category && (
              <span className="absolute bottom-5 left-5 rounded-full bg-white px-5 py-2 text-sm font-semibold capitalize text-[#252724]">
                {String(studio.category).replaceAll("-", " ")}
              </span>
            )}
          </div>

          {/* Main information */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C66B45]">
                Creative Space Details
              </p>

              <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#252724] md:text-5xl">
                {name}
              </h1>

              <p className="mt-5 flex items-center gap-2 text-sm text-[#777970]">
                <MapPin size={18} className="text-[#C66B45]" />
                {location}
              </p>

              {/* Description */}
              <div className="mt-10 border-t border-[#E5E2DA] pt-8">
                <h2 className="text-2xl font-semibold text-[#252724]">
                  About this studio
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-8 text-[#777970]">
                  {description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mt-10 border-t border-[#E5E2DA] pt-8">
                <h2 className="text-2xl font-semibold text-[#252724]">
                  Studio Amenities
                </h2>

                {amenities.length > 0 ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-xl bg-white p-4"
                      >
                        <CheckCircle2
                          size={19}
                          className="shrink-0 text-[#697B63]"
                        />

                        <span className="text-sm text-[#252724]">
                          {typeof amenity === "string"
                            ? amenity
                            : amenity.name ||
                              amenity.title ||
                              "Amenity"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-[#777970]">
                    Amenities information has not been provided.
                  </p>
                )}
              </div>

              {/* Owner */}
              <div className="mt-10 border-t border-[#E5E2DA] pt-8">
                <h2 className="text-2xl font-semibold text-[#252724]">
                  Studio Host
                </h2>

                <div className="mt-5 flex items-center gap-4 rounded-2xl bg-white p-5">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#F0EEE8]">
                    {owner.image || owner.photoURL ? (
                      <img
                        src={owner.image || owner.photoURL}
                        alt="Studio host"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound
                        size={25}
                        className="text-[#697B63]"
                      />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-[#252724]">
                      {owner.name ||
                        owner.fullName ||
                        "Studio Host"}
                    </p>

                    <p className="mt-1 text-sm text-[#777970]">
                      Studio Owner
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking card */}
            <aside>
              <div className="sticky top-28 rounded-2xl border border-[#E5E2DA] bg-white p-6 shadow-sm">
                <p className="text-sm text-[#777970]">
                  Studio rental price
                </p>

                <h2 className="mt-2 text-3xl font-semibold text-[#C66B45]">
                  {price !== null && price !== undefined
                    ? `$${Number(price).toLocaleString()}`
                    : "Price unavailable"}
                </h2>

                {price !== null && price !== undefined && (
                  <p className="mt-1 text-sm text-[#777970]">
                    per hour
                  </p>
                )}

                <div className="my-6 space-y-4 border-y border-[#E5E2DA] py-6">
                  <div className="flex items-center gap-3 text-sm text-[#777970]">
                    <CalendarDays
                      size={18}
                      className="text-[#C66B45]"
                    />
                    Flexible booking
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#777970]">
                    <Clock
                      size={18}
                      className="text-[#C66B45]"
                    />
                    Hourly rental
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#777970]">
                    <MapPin
                      size={18}
                      className="text-[#C66B45]"
                    />
                    {location}
                  </div>
                </div>

                {/* Open booking modal */}
                <button
                  type="button"
                  onClick={() => setShowBookingModal(true)}
                  className="block w-full rounded-full bg-[#C66B45] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#252724]"
                >
                  Book This Studio
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#777970]">
                  Choose your preferred date and time to continue.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          studio={studio}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
