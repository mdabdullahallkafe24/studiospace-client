
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ArrowUpDown,
  Camera,
  RefreshCw,
} from "lucide-react";

import { getStudios, getCategories } from "@/lib/api";

const fallbackCategories = [
  { slug: "photo-studio", name: "Photo Studios" },
  { slug: "sound-stage", name: "Sound Stages" },
  { slug: "podcast-room", name: "Podcast Rooms" },
  { slug: "music-suite", name: "Music Suites" },
  { slug: "art-workshop", name: "Art Workshops" },
];

function getStudioImage(studio) {
  return (
    studio.image ||
    studio.imageUrl ||
    studio.coverImage ||
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900"
  );
}

function getStudioName(studio) {
  return studio.name || studio.title || "Untitled Studio";
}

function getStudioPrice(studio) {
  return studio.pricePerHour ?? studio.hourlyRate ?? studio.price ?? null;
}

function getStudioLocation(studio) {
  return (
    studio.location ||
    studio.city ||
    studio.address ||
    "Location not provided"
  );
}

function getList(data, keys = []) {
  if (Array.isArray(data)) return data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  return [];
}

export default function ExploreStudiosPage() {
  const [studios, setStudios] = useState([]);
  const [categories, setCategories] = useState(fallbackCategories);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // Load studios and categories
  useEffect(() => {
    let isActive = true;

    async function fetchStudios() {
      try {
        const [studioData, categoryData] = await Promise.all([
          getStudios(),
          getCategories(),
        ]);

        if (!isActive) return;

        setStudios(getList(studioData, ["studios", "items", "data"]));

        const categoryList = getList(categoryData, [
          "categories",
          "items",
          "data",
        ]);

        if (categoryList.length > 0) {
          setCategories(categoryList);
        }

        setError("");
      } catch (err) {
        if (!isActive) return;

        setError(
          err.message || "Studios could not be loaded. Please try again."
        );
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchStudios();

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  // Filter and sort studios
  const filteredStudios = useMemo(() => {
    let result = [...studios];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((studio) => {
        const searchableText = [
          studio.name,
          studio.title,
          studio.description,
          studio.location,
          studio.city,
          studio.category,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(keyword);
      });
    }

    if (location.trim()) {
      const keyword = location.toLowerCase();

      result = result.filter((studio) =>
        getStudioLocation(studio).toLowerCase().includes(keyword)
      );
    }

    if (category) {
      result = result.filter(
        (studio) =>
          studio.category === category ||
          studio.categorySlug === category
      );
    }

    if (sort === "low-to-high") {
      result.sort((a, b) => {
        const priceA = Number(getStudioPrice(a) ?? Infinity);
        const priceB = Number(getStudioPrice(b) ?? Infinity);

        return priceA - priceB;
      });
    }

    if (sort === "high-to-low") {
      result.sort((a, b) => {
        const priceA = Number(getStudioPrice(a) ?? -Infinity);
        const priceB = Number(getStudioPrice(b) ?? -Infinity);

        return priceB - priceA;
      });
    }

    return result;
  }, [studios, search, location, category, sort]);

  function clearFilters() {
    setSearch("");
    setLocation("");
    setCategory("");
    setSort("default");
  }

  function handleRetry() {
    setLoading(true);
    setError("");
    setReloadKey((previous) => previous + 1);
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Hero */}
      <section className="bg-[#252724] px-5 py-20 text-white md:py-28">
        <div className="studio-container">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#C66B45]">
            Find Your Creative Space
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            Discover spaces
            <br />
            <span className="text-[#C66B45]">
              made for creativity.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/65">
            Explore creative studios, production spaces and inspiring
            environments for your next project.
          </p>

          <div className="mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="shrink-0 text-[#C66B45]" size={21} />

              <input
                type="text"
                placeholder="Search studios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent py-3 text-sm text-[#252724] outline-none"
              />
            </div>

            <div className="flex flex-1 items-center gap-3 border-t border-gray-200 px-3 sm:border-l sm:border-t-0">
              <MapPin className="shrink-0 text-[#C66B45]" size={21} />

              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent py-3 text-sm text-[#252724] outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Explore section */}
      <section className="section-padding">
        <div className="studio-container">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C66B45]">
                Explore Collection
              </p>

              <h2 className="text-3xl font-semibold text-[#252724] md:text-4xl">
                Find your perfect studio
              </h2>

              <p className="mt-3 text-sm text-[#777970]">
                Discover spaces that bring your creative ideas to life.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#777970]">
              <Camera size={18} />
              <span>
                {loading
                  ? "Loading studios..."
                  : `${filteredStudios.length} studios found`}
              </span>
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <SlidersHorizontal size={18} />
              <h3 className="font-semibold text-[#252724]">
                Browse by category
              </h3>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-3">
              <button
                type="button"
                onClick={() => setCategory("")}
                className={`shrink-0 rounded-full border px-5 py-3 text-sm font-medium transition ${
                  category === ""
                    ? "border-[#252724] bg-[#252724] text-white"
                    : "border-[#E5E2DA] bg-white text-[#252724] hover:border-[#C66B45]"
                }`}
              >
                All Studios
              </button>

              {categories.map((item, index) => {
                const slug = item.slug || item.category || item.id;
                const name =
                  item.name || item.title || item.nameEn || slug;

                return (
                  <button
                    type="button"
                    key={slug || index}
                    onClick={() => setCategory(slug)}
                    className={`shrink-0 rounded-full border px-5 py-3 text-sm font-medium transition ${
                      category === slug
                        ? "border-[#252724] bg-[#252724] text-white"
                        : "border-[#E5E2DA] bg-white text-[#252724] hover:border-[#C66B45]"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sorting */}
          <div className="mb-8 flex flex-col justify-between gap-4 border-y border-[#E5E2DA] py-5 sm:flex-row sm:items-center">
            <p className="text-sm text-[#777970]">
              Showing{" "}
              <span className="font-semibold text-[#252724]">
                {filteredStudios.length}
              </span>{" "}
              results
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-[#777970]">
                <ArrowUpDown size={17} />
                Sort by
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-[#E5E2DA] bg-white px-4 py-3 text-sm text-[#252724] outline-none"
              >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>

              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-[#C66B45] hover:underline"
              >
                Clear filters
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl bg-white"
                >
                  <div className="h-56 animate-pulse bg-[#EAE7DF]" />

                  <div className="space-y-3 p-5">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-[#EAE7DF]" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-[#EAE7DF]" />
                    <div className="h-10 animate-pulse rounded bg-[#EAE7DF]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
              <p className="font-medium text-red-700">{error}</p>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#252724] px-6 py-3 text-sm font-semibold text-white"
              >
                <RefreshCw size={16} />
                Try again
              </button>
            </div>
          )}

          {/* Studio cards */}
          {!loading && !error && filteredStudios.length > 0 && (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStudios.map((studio) => {
                const id = studio._id || studio.id;
                const price = getStudioPrice(studio);

                return (
                  <article
                    key={id}
                    className="premium-card overflow-hidden rounded-2xl border border-[#EAE7DF] bg-white"
                  >
                    <div className="relative h-56 overflow-hidden bg-[#EAE7DF]">
                      <Image
                        src={getStudioImage(studio)}
                        alt={getStudioName(studio)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                        className="object-cover transition duration-500 hover:scale-105"
                      />

                      {studio.category && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold capitalize text-[#252724]">
                          {String(studio.category).replaceAll("-", " ")}
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-[#252724]">
                        {getStudioName(studio)}
                      </h3>

                      <p className="mt-3 flex items-center gap-2 text-sm text-[#777970]">
                        <MapPin size={16} className="text-[#C66B45]" />
                        {getStudioLocation(studio)}
                      </p>

                      {studio.description && (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#777970]">
                          {studio.description}
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between border-t border-[#EAE7DF] pt-5">
                        <div>
                          <p className="text-xs text-[#777970]">
                            Starting from
                          </p>

                          <p className="mt-1 font-semibold text-[#C66B45]">
                            {price !== null && price !== undefined
                              ? `$${Number(price).toLocaleString()} / hour`
                              : "Price not provided"}
                          </p>
                        </div>

                        <Link
                          href={`/studios/${id}`}
                          className="rounded-full bg-[#252724] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C66B45]"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredStudios.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#D8D4CA] bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EEE8]">
                <Search size={27} className="text-[#C66B45]" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#252724]">
                No studios found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777970]">
                There are no studios matching your current filters.
                Try changing your search or clearing the filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full bg-[#252724] px-6 py-3 text-sm font-semibold text-white hover:bg-[#C66B45]"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
