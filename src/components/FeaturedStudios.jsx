
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFeaturedStudios } from "@/lib/api";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudios() {
      try {
        setLoading(true);
        setError("");

        const result = await getFeaturedStudios();

        const studioList = Array.isArray(result)
          ? result
          : result?.studios || result?.items || [];

        setStudios(studioList);
      } catch (err) {
        setError(err.message || "Unable to load studios.");
      } finally {
        setLoading(false);
      }
    }

    loadStudios();
  }, []);

  return (
    <section className="section-padding bg-[#f0eee8]">
      <div className="studio-container">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#c66b45]">
              Curated Spaces
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#252724] md:text-5xl">
              Featured Studios
            </h2>

            <p className="mt-3 text-sm text-[#777970]">
              Discover creative spaces from our community.
            </p>
          </div>

          <Link
            href="/studios"
            className="text-sm font-bold text-[#c66b45] hover:underline"
          >
            Explore all studios ↗
          </Link>
        </div>

        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl bg-white"
              >
                <div className="skeleton h-56 w-full rounded-none" />
                <div className="space-y-3 p-5">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
            <p className="font-semibold text-red-600">
              Could not load studios.
            </p>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
          </div>
        )}

        {!loading && !error && studios.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-bold text-[#252724]">
              No studios available yet
            </h3>
            <p className="mt-2 text-sm text-[#777970]">
              New creative spaces will appear here when they are listed.
            </p>
          </div>
        )}

        {!loading && !error && studios.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => {
              const id = studio._id || studio.id;
              const name = studio.name || studio.title;
              const image = studio.image || studio.imageUrl;
              const location = studio.location;
              const price =
                studio.pricePerHour ??
                studio.hourlyRate ??
                studio.price;
              const rating = studio.rating;

              return (
                <article
                  key={id}
                  className="premium-card overflow-hidden rounded-2xl bg-white"
                >
                  <Link href={`/studios/${id}`}>
                    {image ? (
                      <img
                        src={image}
                        alt={name || "Studio"}
                        className="h-60 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-60 items-center justify-center bg-[#e9e5dc] text-sm text-[#777970]">
                        No image available
                      </div>
                    )}
                  </Link>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#252724]">
                      {name || "Untitled Studio"}
                    </h3>

                    {location && (
                      <p className="mt-2 text-sm text-[#777970]">
                        <span className="mr-1">⌖</span>
                        {location}
                      </p>
                    )}

                    <div className="mt-5 flex items-center justify-between border-t border-[#eeeae2] pt-4">
                      {price != null && (
                        <p className="font-bold text-[#c66b45]">
                          {price}
                          <span className="ml-1 text-xs font-normal text-[#777970]">
                            / hour
                          </span>
                        </p>
                      )}

                      {rating != null && (
                        <p className="text-sm font-semibold text-[#252724]">
                          ★ {rating}
                        </p>
                      )}
                    </div>

                    <Link
                      href={`/studios/${id}`}
                      className="mt-5 block rounded-full bg-[#252724] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#c66b45]"
                    >
                      View Studio ↗
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
