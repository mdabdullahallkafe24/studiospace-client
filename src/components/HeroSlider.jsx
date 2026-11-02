"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    subtitle: "A MARKETPLACE FOR CREATIVE MINDS",
    title: "Your ideas deserve a beautiful space.",
    description:
      "Discover inspiring studios, connect with passionate creators, and find the perfect space for your next project.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=90",
    button: "Explore Studios",
  },
  {
    subtitle: "CREATE WITHOUT LIMITS",
    title: "Find the space where creativity begins.",
    description:
      "From photography studios to music rooms, discover inspiring spaces designed for your creativity.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=90",
    button: "Discover Spaces",
  },
  {
    subtitle: "SHARE YOUR CREATIVE SPACE",
    title: "Turn your studio into an opportunity.",
    description:
      "List your creative space, connect with talented creators, and become part of our growing community.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=90",
    button: "Become a Host",
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-[#252724]">
      <div className="absolute inset-0">
        {slides.map((item, index) => (
          <img
            key={item.title}
            src={item.image}
            alt="Creative studio"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-45" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171816]/90 via-[#171816]/60 to-transparent" />
      </div>

      <div className="studio-container relative flex min-h-[600px] items-center px-6 py-24 md:min-h-[680px] md:px-10">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#e69a78]" />
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-white">
              {slide.subtitle}
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
            {slide.title}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/75 md:text-lg">
            {slide.description}
          </p>

          <div className="mt-9">
            <Link
              href={activeSlide === 2 ? "/register" : "/studios"}
              className="inline-flex rounded-full bg-[#c66b45] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#b85b36]"
            >
              {slide.button} ↗
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-4">
            {slides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? "w-12 bg-[#c66b45]"
                    : "w-6 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}

            <span className="ml-2 text-xs font-semibold tracking-widest text-white/70">
              0{activeSlide + 1} / 0{slides.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}