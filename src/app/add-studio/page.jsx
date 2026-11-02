
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ImagePlus,
  MapPin,
  DollarSign,
  Building2,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const categories = [
  "Photography Studio",
  "Sound Stage",
  "Podcast Room",
  "Music Suite",
  "Art Workshop",
];

const availableAmenities = [
  "High-Speed Wi-Fi",
  "Air Conditioning",
  "Free Parking",
  "Professional Lighting",
  "Soundproofing",
  "Restroom",
  "Kitchen",
  "Waiting Area",
];

export default function AddStudioPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    image: "",
    pricePerHour: "",
    capacity: "",
    description: "",
    amenities: [],
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleAmenity(amenity) {
    setFormData((previous) => ({
      ...previous,
      amenities: previous.amenities.includes(amenity)
        ? previous.amenities.filter((item) => item !== amenity)
        : [...previous.amenities, amenity],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !formData.name.trim() ||
      !formData.category ||
      !formData.location.trim() ||
      !formData.pricePerHour ||
      !formData.description.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (formData.image.trim()) {
      try {
        const imageURL = new URL(formData.image);

        if (!["http:", "https:"].includes(imageURL.protocol)) {
          throw new Error("Invalid URL");
        }
      } catch {
        setError("Please provide a valid image URL.");
        return;
      }
    }

    if (Number(formData.pricePerHour) <= 0) {
      setError("Hourly price must be greater than zero.");
      return;
    }

    if (
      formData.capacity &&
      (!Number.isInteger(Number(formData.capacity)) ||
        Number(formData.capacity) <= 0)
    ) {
      setError("Capacity must be a positive whole number.");
      return;
    }

    setMessage(
      "Your studio information is ready. Publishing will be enabled after backend integration."
    );
  }

  const inputClass =
    "w-full rounded-xl border border-[#E5E2DA] bg-white px-4 py-3.5 text-sm text-[#252724] outline-none transition focus:border-[#C66B45]";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#252724]";

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#FAF9F6] px-5 py-12 md:py-16">
        <div className="studio-container max-w-4xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#777970] transition hover:text-[#C66B45]"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C66B45]">
              Become a Studio Host
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-[#252724] md:text-5xl">
              List your creative space
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#777970]">
              Share your studio with a community of creators. Add your
              studio details and help people find the perfect space for
              their next project.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-3xl border border-[#EAE7DF] bg-white"
          >
            {/* Basic Information */}
            <section className="border-b border-[#EAE7DF] p-6 sm:p-9">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EEE8] text-[#C66B45]">
                  <Building2 size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#252724]">
                    Basic Information
                  </h2>
                  <p className="mt-1 text-xs text-[#777970]">
                    Tell us about your creative space.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className={labelClass}>
                    Studio Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Creative Space Studio"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="category" className={labelClass}>
                    Studio Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select a category</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={16} />
                      Location *
                    </span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g. Dhaka, Bangladesh"
                    value={formData.location}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Studio Image */}
            <section className="border-b border-[#EAE7DF] p-6 sm:p-9">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EEE8] text-[#C66B45]">
                  <ImagePlus size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#252724]">
                    Studio Image
                  </h2>
                  <p className="mt-1 text-xs text-[#777970]">
                    Add a photo that represents your studio.
                  </p>
                </div>
              </div>

              <label htmlFor="image" className={labelClass}>
                Image URL (Optional)
              </label>

              <input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/studio-image.jpg"
                value={formData.image}
                onChange={handleChange}
                className={inputClass}
              />

              {formData.image && (
                <div className="relative mt-5 h-56 w-full overflow-hidden rounded-2xl border border-[#EAE7DF]">
                  <Image
                    src={formData.image}
                    alt="Studio preview"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </section>

            {/* Pricing & Capacity */}
            <section className="border-b border-[#EAE7DF] p-6 sm:p-9">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EEE8] text-[#C66B45]">
                  <DollarSign size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#252724]">
                    Pricing & Capacity
                  </h2>
                  <p className="mt-1 text-xs text-[#777970]">
                    Set your hourly rate and studio capacity.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="pricePerHour" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <DollarSign size={16} />
                      Price Per Hour (USD) *
                    </span>
                  </label>

                  <input
                    id="pricePerHour"
                    name="pricePerHour"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="e.g. 50"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="capacity" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <Users size={16} />
                      Maximum Capacity
                    </span>
                  </label>

                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    placeholder="e.g. 15"
                    value={formData.capacity}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="border-b border-[#EAE7DF] p-6 sm:p-9">
              <h2 className="text-xl font-semibold text-[#252724]">
                Studio Description
              </h2>

              <p className="mb-6 mt-2 text-xs text-[#777970]">
                Describe your studio, its atmosphere and what makes it special.
              </p>

              <label htmlFor="description" className={labelClass}>
                Description *
              </label>

              <textarea
                id="description"
                name="description"
                rows={6}
                maxLength={1500}
                placeholder="Describe your studio, equipment, space and available facilities..."
                value={formData.description}
                onChange={handleChange}
                className={`${inputClass} resize-y leading-7`}
              />

              <p className="mt-2 text-right text-xs text-[#99998F]">
                {formData.description.length}/1500 characters
              </p>
            </section>

            {/* Amenities */}
            <section className="p-6 sm:p-9">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EEE8] text-[#C66B45]">
                  <CheckCircle2 size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#252724]">
                    Studio Amenities
                  </h2>
                  <p className="mt-1 text-xs text-[#777970]">
                    Select the facilities available in your studio.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {availableAmenities.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${
                      formData.amenities.includes(amenity)
                        ? "border-[#C66B45] bg-[#FBF3EF] text-[#252724]"
                        : "border-[#E5E2DA] text-[#777970] hover:border-[#C66B45]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenity(amenity)}
                      className="h-4 w-4 accent-[#C66B45]"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </section>

            {/* Submit */}
            <div className="border-t border-[#EAE7DF] bg-[#FAF9F6] p-6 sm:p-9">
              {error && (
                <p
                  role="alert"
                  className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              {message && (
                <p
                  role="status"
                  className="mb-5 rounded-xl bg-[#EDF3EA] px-4 py-3 text-sm leading-6 text-[#526B4C]"
                >
                  {message}
                </p>
              )}

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-[#252724]">
                    Ready to share your studio?
                  </p>
                  <p className="mt-1 text-xs text-[#777970]">
                    Review your information before publishing.
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#252724] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#C66B45]"
                >
                  Publish Studio
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </form>

          <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-[#99998F]">
            <Clock size={14} />
            Studio publishing will be enabled after backend integration.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
