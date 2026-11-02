
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import FeaturedStudios from "@/components/FeaturedStudios";

const categories = [
  {
    name: "Photography",
    slug: "photography",
    description: "Spaces for stunning visuals",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=85",
    number: "01",
  },
  {
    name: "Podcast Rooms",
    slug: "podcast",
    description: "Where conversations come alive",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=85",
    number: "02",
  },
  {
    name: "Music Studios",
    slug: "music",
    description: "Make your next great sound",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=85",
    number: "03",
  },
  {
    name: "Art Workshops",
    slug: "art",
    description: "Room to create and explore",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=85",
    number: "04",
  },
  {
    name: "Film Production",
    slug: "film",
    description: "Bring your vision to the screen",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=85",
    number: "05",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover a Space",
    description:
      "Explore a curated collection of creative studios that match your vision and project.",
    icon: "⌕",
  },
  {
    number: "02",
    title: "Choose Your Time",
    description:
      "Select your preferred date and booking duration with just a few clicks.",
    icon: "◷",
  },
  {
    number: "03",
    title: "Confirm Booking",
    description:
      "Send your booking request and connect directly with the studio host.",
    icon: "✓",
  },
  {
    number: "04",
    title: "Create Something",
    description:
      "Walk into your chosen space and bring your creative ideas to life.",
    icon: "✳",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-[#faf9f6]">
      {/* HERO SLIDER */}
      <HeroSlider />

      {/* SEARCH SECTION */}
      <section className="relative z-10 px-5 md:px-8">
        <div className="studio-container">
          <form
            action="/studios"
            method="GET"
            className="grid gap-4 rounded-3xl border border-[#e9e5dc] bg-white p-5 shadow-[0_15px_50px_rgba(37,39,36,0.06)] md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end md:p-7"
          >
            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#777970]"
              >
                What are you looking for?
              </label>

              <input
                id="search"
                name="search"
                type="search"
                placeholder="Studio name or keyword"
                className="w-full rounded-xl border border-[#e9e5dc] bg-[#faf9f6] px-4 py-4 text-sm text-[#252724] outline-none focus:border-[#c66b45]"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#777970]"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                defaultValue=""
                className="w-full rounded-xl border border-[#e9e5dc] bg-[#faf9f6] px-4 py-4 text-sm text-[#252724] outline-none focus:border-[#c66b45]"
              >
                <option value="">All Categories</option>

                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#777970]"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="Enter location"
                className="w-full rounded-xl border border-[#e9e5dc] bg-[#faf9f6] px-4 py-4 text-sm text-[#252724] outline-none focus:border-[#c66b45]"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#c66b45] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#b85b36]"
            >
              Search Spaces ↗
            </button>
          </form>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="section-padding">
        <div className="studio-container">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#c66b45]">
                Find Your Space
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#252724] md:text-5xl">
                Explore by category
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-[#777970]">
                Whatever your creative vision, discover a space designed to
                help you make it happen.
              </p>
            </div>

            <Link
              href="/studios"
              className="text-sm font-bold text-[#c66b45] hover:underline"
            >
              View all categories ↗
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/studios?category=${encodeURIComponent(category.slug)}`}
                className="premium-card group relative h-[300px] overflow-hidden rounded-2xl bg-[#252724]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[2px] text-white/70">
                      CATEGORY {category.number}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition group-hover:border-[#c66b45] group-hover:bg-[#c66b45]">
                      ↗
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm text-white/70">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED STUDIOS */}
      <FeaturedStudios />

      {/* ABOUT SECTION */}
      <section id="about" className="section-padding bg-white">
        <div className="studio-container grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-[20px_160px_20px_20px]">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&q=90"
                alt="Creative studio interior"
                loading="lazy"
                className="h-[400px] w-full object-cover md:h-[520px]"
              />
            </div>

            <div className="absolute -bottom-6 right-0 rounded-2xl bg-[#c66b45] p-6 text-white md:-right-5">
              <p className="text-3xl font-bold">Your Space.</p>
              <p className="mt-1 text-sm">Your Creativity.</p>
            </div>
          </div>

          <div className="lg:pl-10">
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#c66b45]">
              About StudioSpace
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#252724] md:text-5xl">
              Great ideas need the right environment.
            </h2>

            <p className="mt-6 text-sm leading-8 text-[#777970]">
              StudioSpace is a marketplace that brings creative people and
              inspiring spaces together. Whether you are a photographer,
              musician, filmmaker, podcaster, or artist, we help you discover
              the right environment for your next project.
            </p>

            <p className="mt-4 text-sm leading-8 text-[#777970]">
              Our mission is simple: make creative spaces easier to discover,
              book, and share.
            </p>

            <Link
              href="/studios"
              className="mt-8 inline-flex rounded-full bg-[#252724] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#c66b45]"
            >
              Discover Spaces ↗
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section-padding">
        <div className="studio-container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#c66b45]">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#252724] md:text-5xl">
              From discovery to creation
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#777970]">
              Your perfect creative space is just a few simple steps away.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="premium-card rounded-2xl border border-[#e9e5dc] bg-white p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[2px] text-[#c66b45]">
                    STEP {step.number}
                  </span>

                  <span className="text-3xl text-[#c66b45]">
                    {step.icon}
                  </span>
                </div>

                <h3 className="mt-9 text-xl font-bold text-[#252724]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#777970]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOST CTA */}
      <section className="px-5 pb-24 md:px-8">
        <div className="studio-container relative overflow-hidden rounded-[30px] bg-[#252724] px-7 py-16 md:px-16 md:py-20">
          <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-4 -top-12 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#e69a78]">
              Become a Studio Host
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
              Have a creative space? Let the world discover it.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-white/60">
              Share your studio with a community of creators. List your space,
              connect with people, and turn your passion into opportunity.
            </p>

            <Link
              href="/register"
              className="mt-9 inline-flex rounded-full bg-[#c66b45] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#b85b36]"
            >
              List Your Studio ↗
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

