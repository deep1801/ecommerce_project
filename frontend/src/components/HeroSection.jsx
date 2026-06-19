import { useEffect, useState, useCallback } from "react";

const slides = [
  {
    badge: "New season · Up to 40% off",
    titleTop: "Discover the best",
    titleAccent: "products for you",
    text: "Shop premium mobiles, laptops and accessories — curated quality, secure checkout and lightning-fast delivery.",
    primary: { label: "Shop Now", href: "#products" },
    secondary: { label: "Browse Deals", href: "#categories" },
    gradient: "from-brand-500/25",
  },
  {
    badge: "Tech week · Limited time",
    titleTop: "Upgrade to the latest",
    titleAccent: "flagship devices",
    text: "Flagship smartphones and ultrabooks at unbeatable prices. Free shipping and easy returns on every order.",
    primary: { label: "Explore Mobiles", href: "#products" },
    secondary: { label: "View Laptops", href: "#categories" },
    gradient: "from-sky-500/25",
  },
  {
    badge: "Accessories · Bestsellers",
    titleTop: "Complete your setup",
    titleAccent: "with premium gear",
    text: "Headphones, chargers, smartwatches and more — handpicked accessories to match your lifestyle.",
    primary: { label: "Shop Accessories", href: "#products" },
    secondary: { label: "Trending Now", href: "#trending" },
    gradient: "from-emerald-500/25",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [],
  );
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative mb-16 overflow-hidden rounded-[2rem] bg-ink-950 text-white shadow-lift">
      {/* Decorative glows (animated per slide) */}
      <div
        key={`glow-${current}`}
        className={`animate-fade-in pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-gradient-to-br ${slide.gradient} to-transparent blur-3xl`}
      />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl" />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative px-7 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <div key={current} className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
            {slide.badge}
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            {slide.titleTop}
            <br />
            <span className="bg-gradient-to-r from-brand-200 via-brand-300 to-brand-500 bg-clip-text text-transparent">
              {slide.titleAccent}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg">
            {slide.text}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={slide.primary.href}
              className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-brand-300"
            >
              {slide.primary.label}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>

            <a
              href={slide.secondary.href}
              className="inline-flex items-center rounded-2xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {slide.secondary.label}
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            {[
              { value: "10K+", label: "Happy customers" },
              { value: "500+", label: "Premium products" },
              { value: "4.9★", label: "Average rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-ink-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="absolute bottom-7 right-7 hidden items-center gap-2 sm:flex">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-9 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:left-16 sm:translate-x-0">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-brand-400"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
