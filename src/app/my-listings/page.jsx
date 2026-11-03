
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  MapPin,
  Pencil,
  Trash2,
  Building2,
  Search,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import DeleteModal from "@/components/DeleteModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getMyListings, deleteStudio } from "@/lib/api";

export default function MyListingsPage() {
  const [search, setSearch] = useState("");
  const [studios, setStudios] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load logged-in user's studios
  useEffect(() => {
    const loadMyListings = async () => {
      try {
        setIsLoading(true);

        const result = await getMyListings();

        setStudios(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Failed to load listings:", error);
        toast.error(error.message || "Could not load your studio listings.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMyListings();
  }, []);

  const filteredStudios = studios.filter((studio) =>
    (studio.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = (studio) => {
    setSelectedStudio(studio);
  };

  // Delete studio from MongoDB
  const handleDeleteConfirm = async () => {
    if (!selectedStudio || isDeleting) return;

    try {
      setIsDeleting(true);

      await deleteStudio(selectedStudio._id);

      setStudios((previous) =>
        previous.filter(
          (studio) => studio._id !== selectedStudio._id
        )
      );

      toast.success("Studio deleted successfully.");
      setSelectedStudio(null);
    } catch (error) {
      console.error("Failed to delete studio:", error);
      toast.error(error.message || "Failed to delete studio.");
    } finally {
      setIsDeleting(false);
    }
  };

  const activeCount = studios.filter(
    (studio) => studio.status === "active"
  ).length;

  const pendingCount = studios.filter(
    (studio) => studio.status === "pending"
  ).length;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#FAF9F6] px-5 py-12 md:py-16">
        <div className="studio-container">
          {/* Heading */}
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C66B45]">
                Host Dashboard
              </p>

              <h1 className="mt-3 text-3xl font-semibold text-[#252724] md:text-5xl">
                My Studio Listings
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#777970]">
                Manage your creative spaces, update studio information and
                keep your listings organized.
              </p>
            </div>

            <Link
              href="/add-studio"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#252724] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#C66B45]"
            >
              <Plus size={18} />
              Add New Studio
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#EAE7DF] bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EEE8] text-[#C66B45]">
                <Building2 size={22} />
              </div>

              <p className="mt-5 text-sm text-[#777970]">Total Listings</p>

              <h2 className="mt-2 text-3xl font-semibold text-[#252724]">
                {studios.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-[#EAE7DF] bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EEE8] text-[#697B63]">
                <Building2 size={22} />
              </div>

              <p className="mt-5 text-sm text-[#777970]">Active Listings</p>

              <h2 className="mt-2 text-3xl font-semibold text-[#252724]">
                {activeCount}
              </h2>
            </div>

            <div className="rounded-2xl border border-[#EAE7DF] bg-white p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBF3EF] text-[#C66B45]">
                <Pencil size={22} />
              </div>

              <p className="mt-5 text-sm text-[#777970]">Pending Listings</p>

              <h2 className="mt-2 text-3xl font-semibold text-[#252724]">
                {pendingCount}
              </h2>
            </div>
          </div>

          {/* Listing Section */}
          <section className="mt-12">
            <div className="flex flex-col justify-between gap-5 border-b border-[#E5E2DA] pb-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-semibold text-[#252724]">
                  Your Studios
                </h2>

                <p className="mt-2 text-sm text-[#777970]">
                  View and manage all your studio listings.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#E5E2DA] bg-white px-4">
                <Search size={18} className="text-[#99998F]" />

                <input
                  type="text"
                  placeholder="Search your studios..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent py-3 text-sm text-[#252724] outline-none sm:w-56"
                />
              </div>
            </div>

            {/* Loading */}
            {isLoading ? (
              <div className="mt-8 rounded-2xl border border-[#EAE7DF] bg-white px-6 py-16 text-center">
                <p className="text-sm text-[#777970]">
                  Loading your studio listings...
                </p>
              </div>
            ) : filteredStudios.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredStudios.map((studio) => (
                  <article
                    key={studio._id}
                    className="overflow-hidden rounded-2xl border border-[#EAE7DF] bg-white"
                  >
                    <div className="relative h-52 w-full bg-[#F0EEE8]">
                      {studio.image ? (
                        <img
                          src={studio.image}
                          alt={studio.name || "Studio image"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Building2
                            size={42}
                            className="text-[#C66B45]"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[#252724]">
                        {studio.name}
                      </h3>

                      <p className="mt-3 flex items-center gap-2 text-sm text-[#777970]">
                        <MapPin size={16} />
                        {studio.location}
                      </p>

                      <p className="mt-3 font-semibold text-[#C66B45]">
                        ${studio.pricePerHour} / hour
                      </p>

                      <div className="mt-5 flex gap-3 border-t border-[#EAE7DF] pt-5">
                        <Link
                          href={`/studios/edit/${studio._id}`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#252724] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#C66B45]"
                        >
                          <Pencil size={15} />
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteClick(studio)}
                          className="flex items-center justify-center gap-2 rounded-full border border-[#E5E2DA] px-4 py-3 text-sm font-semibold text-[#C66B45] transition hover:bg-[#FBF3EF]"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-[#D8D4CA] bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EEE8]">
                  <Building2 size={28} className="text-[#C66B45]" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#252724]">
                  {search ? "No matching studios" : "No studios listed yet"}
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#777970]">
                  {search
                    ? "Try another search term to find your studio."
                    : "You haven't added any creative spaces yet. Start sharing your studio with the creative community."}
                </p>

                {!search && (
                  <Link
                    href="/add-studio"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#C66B45] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#252724]"
                  >
                    Add Your First Studio
                    <ArrowRight size={17} />
                  </Link>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteModal
          isOpen={Boolean(selectedStudio)}
          onClose={() => !isDeleting && setSelectedStudio(null)}
          onConfirm={handleDeleteConfirm}
          studioName={selectedStudio?.name || "this studio"}
        />
      </main>
    </ProtectedRoute>
  );
}

