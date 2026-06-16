const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-ink-950 text-white shadow-lift mb-16">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" />
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
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
            New season · Up to 40% off
          </span>

          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
            Discover the best
            <br />
            <span className="bg-gradient-to-r from-brand-200 via-brand-300 to-brand-500 bg-clip-text text-transparent">
              products for you
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-ink-200 leading-relaxed max-w-xl">
            Shop premium mobiles, laptops and accessories — curated quality,
            secure checkout and lightning-fast delivery.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-ink-950 hover:bg-brand-300 transition-colors"
            >
              Shop Now
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
              href="#products"
              className="inline-flex items-center rounded-2xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Browse Deals
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
      </div>
    </section>
  );
};

export default HeroSection;
