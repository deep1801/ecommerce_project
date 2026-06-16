import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      title: "Fast Delivery",
      desc: "Lightning-fast delivery network ensuring your products reach you quickly and safely.",
      d: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-5.25m0-11.25h1.5",
    },
    {
      title: "Secure Payments",
      desc: "Multiple secure payment options with complete transaction protection.",
      d: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    },
    {
      title: "Premium Quality",
      desc: "Carefully selected products with high quality standards and customer satisfaction.",
      d: "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z",
    },
  ];

  const stats = [
    { value: "10K+", label: "Customers" },
    { value: "5K+", label: "Orders Delivered" },
    { value: "500+", label: "Products" },
    { value: "99%", label: "Happy Customers" },
  ];

  const values = [
    {
      title: "Customer First",
      desc: "Every decision starts with what's best for the people we serve.",
      d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z",
    },
    {
      title: "Trust & Security",
      desc: "Bank-grade protection on every transaction, every single time.",
      d: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
    },
    {
      title: "Always Improving",
      desc: "We constantly refine the experience to stay ahead for you.",
      d: "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
    },
  ];

  const timeline = [
    {
      year: "2021",
      title: "The Beginning",
      desc: "ShopEasy launched with a simple promise: make online shopping effortless.",
    },
    {
      year: "2022",
      title: "Going Nationwide",
      desc: "Expanded our delivery network to cover thousands of cities across India.",
    },
    {
      year: "2023",
      title: "10K Customers",
      desc: "Crossed our first major milestone with a community of loyal shoppers.",
    },
    {
      year: "2024",
      title: "Premium Experience",
      desc: "Reimagined the platform with secure payments and a refined experience.",
    },
  ];

  return (
    <div className="px-5 sm:px-6 py-14">
      <div className="mx-auto max-w-7xl">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-7 py-16 text-center text-white sm:px-12 sm:py-24 animate-fade-up">
          <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Our Story
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-6xl">
              Shopping made{" "}
              <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
                effortless
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-200">
              ShopEasy is a modern ecommerce platform designed to provide
              seamless shopping experiences with secure payments, fast delivery
              and premium quality products.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-300"
              >
                Start Shopping
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="-mt-12 relative z-10 mx-auto grid max-w-5xl grid-cols-2 gap-4 rounded-3xl border border-ink-100 bg-white p-8 shadow-card md:grid-cols-4 animate-fade-up">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
                {s.value}
              </h2>
              <p className="mt-1 text-sm text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="mt-20 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Why ShopEasy
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
            Built for a better experience
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{ animationDelay: `${i * 80}ms` }}
              className="group rounded-2xl border border-ink-100 bg-white p-8 shadow-soft transition-all duration-300 animate-fade-up hover:-translate-y-1.5 hover:border-ink-200 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-950 text-brand-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-400 group-hover:text-ink-950">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.d} />
                </svg>
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink-950">
                {f.title}
              </h3>
              <p className="mt-3 leading-7 text-ink-500">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* OUR JOURNEY — TIMELINE */}
        <div className="mt-20 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Our Journey
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
            How we got here
          </h2>
        </div>
        <div className="relative mt-12 grid gap-6 md:grid-cols-4">
          {/* connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-ink-100 md:block" />
          {timeline.map((t, i) => (
            <div
              key={t.year}
              style={{ animationDelay: `${i * 90}ms` }}
              className="group relative animate-fade-up"
            >
              <div className="flex items-center gap-3 md:block">
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink-100 bg-white font-display text-sm font-extrabold text-ink-950 shadow-soft transition-all duration-300 group-hover:border-brand-400 group-hover:text-brand-600">
                  {t.year.slice(2)}
                </span>
              </div>
              <div className="mt-5 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {t.year}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-ink-950">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-500">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CORE VALUES */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.title}
              style={{ animationDelay: `${i * 80}ms` }}
              className="group flex gap-4 rounded-2xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-300 animate-fade-up hover:-translate-y-1 hover:shadow-card"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-300 group-hover:scale-110">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={v.d} />
                </svg>
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink-950">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-500">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MISSION & VISION */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-9 shadow-soft transition-all duration-300 hover:shadow-card">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-100/50 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-950 text-brand-400">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-ink-950">
              Our Mission
            </h2>
            <p className="mt-4 leading-8 text-ink-500">
              To simplify online shopping by providing a secure, reliable and
              user-friendly platform where customers can find everything they
              need.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-9 shadow-soft transition-all duration-300 hover:shadow-card">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-100/50 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-950 text-brand-400">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-ink-950">
              Our Vision
            </h2>
            <p className="mt-4 leading-8 text-ink-500">
              To become one of the most trusted ecommerce brands by delivering
              exceptional customer experiences and innovative shopping
              solutions.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="relative mt-20 overflow-hidden rounded-[2rem] bg-ink-950 px-7 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Ready to experience ShopEasy?
            </h2>
            <p className="mt-4 text-ink-200">
              Join thousands of happy customers shopping smarter every day.
            </p>
            <Link
              to="/"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-300"
            >
              Browse Products
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
