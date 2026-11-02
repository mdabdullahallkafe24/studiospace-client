
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Image as ImageIcon,
  Save,
} from "lucide-react";

import ProtectedRoute from "@/components/ProtectedRoute";

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const initialAmenities = [
  "Wi-Fi",
  "Air Conditioning",
  "Parking",
  "Lighting Equipment",
  "Soundproof",
  "Restroom",
  "Kitchen",
  "Props Available",
];

export default function EditStudioPage() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    image: "",
    price: "",
    capacity: "",
    description: "",
  });

  const [amenities, setAmenities] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category ||
      !formData.location.trim() ||
      !formData.price ||
      !formData.description.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSaving(true);

    toast.info("Studio update will work after backend integration.");

    setSaving(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FAF9F6] px-5 py-12">
        <div className="studio-container">

          {/* Back Button */}
          <Link
            href="/my-listings"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#777970] hover:text-[#C66B45]"
          >
            <ArrowLeft size={17} />
            Back to My Listings
          </Link>

          {/* Page Heading */}
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[3px] text-[#C66B45]">
              Manage Your Space
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-[#252724] md:text-5xl">
              Edit Your Studio
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#777970]">
              Update your studio details and keep your listing accurate for
              potential guests.
            </p>
          </div>

          {/* Edit Form */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-8 lg:grid-cols-[1fr_320px]"
          >
            <div className="space-y-8 rounded-2xl border border-[#E9E6DE] bg-white p-6 md:p-9">

              {/* Basic Information */}
              <section>
                <h2 className="mb-6 text-xl font-semibold text-[#252724]">
                  Basic Information
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Studio Name *
                    </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your studio name"
                      className="input input-bordered w-full rounded-xl bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Category *
                    </label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="select select-bordered w-full rounded-xl bg-white"
                    >
                      <option value="">Select a category</option>

                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Location *
                    </label>

                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, area or full address"
                      className="input input-bordered w-full rounded-xl bg-white"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Hourly Price ($) *
                      </label>

                      <input
                        type="number"
                        min="1"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g. 50"
                        className="input input-bordered w-full rounded-xl bg-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Guest Capacity
                      </label>

                      <input
                        type="number"
                        min="1"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        placeholder="e.g. 10"
                        className="input input-bordered w-full rounded-xl bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Studio Description *
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your studio, facilities and what makes it special..."
                      className="textarea textarea-bordered w-full rounded-xl bg-white"
                    />
                  </div>
                </div>
              </section>

              <div className="border-t border-[#E9E6DE]" />

              {/* Studio Amenities */}
              <section>
                <h2 className="mb-2 text-xl font-semibold text-[#252724]">
                  Studio Amenities
                </h2>

                <p className="mb-5 text-sm text-[#777970]">
                  Select all facilities available at your studio.
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {initialAmenities.map((amenity) => (
                    <label
                      key={amenity}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-xs transition ${
                        amenities.includes(amenity)
                          ? "border-[#C66B45] bg-[#C66B45]/5 text-[#C66B45]"
                          : "border-[#E9E6DE] text-[#555]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="checkbox checkbox-xs"
                      />

                      {amenity}
                    </label>
                  ))}
                </div>
              </section>

              <div className="border-t border-[#E9E6DE]" />

              {/* Form Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn flex-1 rounded-xl border-0 bg-[#C66B45] text-white hover:bg-[#ad5937]"
                >
                  <Save size={17} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <Link
                  href="/my-listings"
                  className="btn rounded-xl border-[#E9E6DE] bg-white text-[#252724] hover:bg-[#F0EEE8]"
                >
                  Cancel
                </Link>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-5">

              {/* Cover Image */}
              <div className="rounded-2xl border border-[#E9E6DE] bg-white p-6">
                <div className="mb-5 flex items-center gap-2">
                  <ImageIcon size={19} className="text-[#C66B45]" />
                  <h3 className="font-semibold">Cover Image</h3>
                </div>

                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Paste image URL"
                  className="input input-bordered w-full rounded-xl bg-white"
                />

                <div className="mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-[#F0EEE8]">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Studio preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-[#999]">
                      <ImageIcon size={35} className="mx-auto mb-2" />
                      <p className="text-xs">
                        Image preview will appear here
                      </p>
                    </div>
                  )}
                </div>

                <p className="mt-3 text-xs leading-5 text-[#999]">
                  Use a clear, high-quality image of your studio.
                </p>
              </div>

              {/* Listing ID */}
              <div className="rounded-2xl bg-[#F0EEE8] p-6">
                <h3 className="mb-2 font-semibold text-[#252724]">
                  Listing ID
                </h3>

                <p className="break-all text-sm text-[#777970]">
                  {id}
                </p>

                <p className="mt-3 text-xs leading-5 text-[#777970]">
                  Your studio information will load automatically after the
                  backend API is connected.
                </p>
              </div>
            </aside>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
