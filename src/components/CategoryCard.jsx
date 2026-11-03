
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CategoryCard({ category }) {
  const {
    name,
    description,
    icon,
    slug,
    count,
  } = category;

  return (
    <Link
      href={`/studios?category=${encodeURIComponent(slug || "")}`}
      className="premium-card group flex h-full flex-col rounded-2xl border border-[#E9E6DE] bg-white p-6 transition hover:border-[#C66B45]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0EEE8] text-3xl transition group-hover:bg-[#C66B45]/10">
          {icon || "🎨"}
        </div>

        <ArrowUpRight
          size={20}
          className="text-[#999] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#C66B45]"
        />
      </div>

      <h3 className="mt-6 text-lg font-bold text-[#252724]">
        {name}
      </h3>

      {description && (
        <p className="mt-2 text-sm leading-6 text-[#777970]">
          {description}
        </p>
      )}

      {count !== undefined && (
        <p className="mt-4 text-xs font-semibold text-[#C66B45]">
          {count} Studios
        </p>
      )}

      <span className="mt-auto pt-5 text-sm font-semibold text-[#C66B45]">

        Explore Category →
      </span>
    </Link>
  );
}
