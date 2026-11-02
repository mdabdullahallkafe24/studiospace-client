
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#FAF9F6] px-5 py-16">
      <div className="w-full max-w-2xl text-center">
        <p className="mb-5 text-xs font-bold uppercase tracking-[4px] text-[#C66B45]">
          StudioSpace
        </p>

        <h1 className="text-8xl font-bold tracking-tight text-[#C66B45] sm:text-9xl">
          404
        </h1>

        <h2 className="mt-6 text-2xl font-semibold text-[#252724] sm:text-3xl">
          Oops! This space doesn&apos;t exist.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#777970]">
          The page you&apos;re looking for may have been moved, deleted, or
          doesn&apos;t exist. Let&apos;s help you find your way back.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn rounded-xl border-0 bg-[#C66B45] px-6 text-white hover:bg-[#ad5937]"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="btn rounded-xl border border-[#E9E6DE] bg-white px-6 text-[#252724] hover:bg-[#F0EEE8]"
          >
            <Search size={17} />
            Explore Studios
          </Link>
        </div>

        <div className="mt-12 border-t border-[#E9E6DE] pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#777970] transition hover:text-[#C66B45]"
          >
            <ArrowLeft size={15} />
            Return to StudioSpace
          </Link>
        </div>
      </div>
    </main>
  );
}

