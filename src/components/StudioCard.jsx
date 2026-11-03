
import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";

export default function StudioCard({ studio }) {
  const {
    _id,
    id,
    name,
    title,
    category,
    location,
    address,
    image,
    imageUrl,
    price,
    hourlyRate,
    rating,
    reviews,
  } = studio;

  const studioId = _id || id;
  const studioName = name || title || "Untitled Studio";
  const studioImage =
    imageUrl || image || "https://placehold.co/800x600?text=StudioSpace";
  const studioLocation = location || address || "Location unavailable";
  const studioPrice = price ?? hourlyRate;

  return (
    <Link
      href={`/studios/${studioId}`}
      className="premium-card group block overflow-hidden rounded-2xl border border-[#E9E6DE] bg-white"
    >
      {/* Studio Image */}
      <div className="relative h-60 overflow-hidden bg-[#F0EEE8]">
        <img
          src={studioImage}
          alt={studioName}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-[#FAF9F6] px-4 py-2 text-xs font-bold capitalize text-[#252724]">
          {category || "Creative Space"}
        </span>

        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#252724] shadow-sm transition group-hover:bg-[#C66B45] group-hover:text-white">
          <ArrowUpRight size={18} />
        </span>
      </div>

      {/* Studio Information */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-[#252724] transition group-hover:text-[#C66B45]">
            {studioName}
          </h3>

          {rating !== undefined && rating !== null && (
            <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#252724]">
              <Star size={15} className="fill-[#C66B45] text-[#C66B45]" />
              {rating}
              {reviews !== undefined && (
                <span className="text-xs font-normal text-[#999]">
                  ({reviews})
                </span>
              )}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-[#777970]">
          <MapPin size={16} className="shrink-0 text-[#C66B45]" />
          <span className="truncate">{studioLocation}</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#E9E6DE] pt-4">
          <div>
            <span className="text-lg font-bold text-[#C66B45]">
              {studioPrice !== undefined && studioPrice !== null
                ? `৳${Number(studioPrice).toLocaleString("en-BD")}`
                : "Price unavailable"}
            </span>

            {studioPrice !== undefined && studioPrice !== null && (
              <span className="ml-1 text-xs text-[#999]">/ hour</span>
            )}
          </div>

          
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
