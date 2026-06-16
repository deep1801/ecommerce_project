const Contact = () => {
  const inputClass =
    "w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-3.5 text-sm text-ink-950 outline-none transition placeholder:text-ink-400 focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/10";

  const info = [
    {
      title: "Address",
      value: "Lucknow, Uttar Pradesh, India",
      hint: "Visit our office",
      d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
    },
    {
      title: "Phone",
      value: "+91 98765 43210",
      hint: "Mon–Sat, 9am–8pm",
      d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
    },
    {
      title: "Email",
      value: "support@shopeasy.com",
      hint: "We reply within 24h",
      d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
    },
  ];

  const socials = [
    {
      label: "Twitter",
      d: "M22 5.92a8.2 8.2 0 0 1-2.36.65 4.12 4.12 0 0 0 1.8-2.27 8.22 8.22 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.39 4.6a4.1 4.1 0 0 0 1.27 5.47A4.07 4.07 0 0 1 2.8 9.6v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.11 4.11 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.29a11.61 11.61 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.36-.01-.53A8.34 8.34 0 0 0 22 5.92Z",
    },
    {
      label: "Instagram",
      d: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17C2.41 8.5 2.4 8.85 2.4 12s.01 3.5.06 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4C15.5 4.01 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06Zm0 8.14A3.2 3.2 0 1 0 8.8 12 3.2 3.2 0 0 0 12 15.2Zm6.3-8.34a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z",
    },
    {
      label: "Facebook",
      d: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
    },
  ];

  return (
    <div className="px-5 sm:px-6 py-14">
      <div className="mx-auto max-w-7xl">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-7 py-14 text-center text-white sm:px-12 sm:py-16 animate-fade-up">
          <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Get in touch
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">
              Let's talk
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-200">
              Have questions, suggestions or business inquiries? We'd love to
              hear from you.
            </p>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* CONTACT FORM */}
          <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift sm:p-10 lg:col-span-3 animate-fade-up">
            <h2 className="font-display text-2xl font-bold text-ink-950">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              We typically respond within 24 hours.
            </p>

            <form className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                  Message
                </label>
                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-ink-950 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-400 hover:text-ink-950 hover:shadow-card"
              >
                Send Message
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
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-5 lg:col-span-2">
            {info.map((item, i) => (
              <div
                key={item.title}
                style={{ animationDelay: `${i * 80}ms` }}
                className="group flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 animate-fade-up hover:-translate-y-1 hover:border-ink-200 hover:shadow-card"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-700 transition-colors duration-300 group-hover:bg-ink-950 group-hover:text-brand-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.6}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={item.d}
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-ink-950">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-950">{item.value}</p>
                  <p className="mt-0.5 text-xs text-ink-400">{item.hint}</p>
                </div>
              </div>
            ))}

            <div className="relative overflow-hidden rounded-2xl bg-ink-950 p-6 text-white shadow-card">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/20 blur-2xl" />
              <div className="relative">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.6}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">
                  Customer Support
                </h3>
                <p className="mt-2 text-sm text-ink-300">
                  Available Monday – Saturday
                </p>
                <p className="mt-1 font-semibold text-brand-400">
                  9:00 AM – 8:00 PM
                </p>

                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      aria-label={s.label}
                      className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-400 hover:text-ink-950"
                    >
                      <svg
                        className="h-4.5 w-4.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d={s.d} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAP / VISIT STRIP */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl border border-ink-100 bg-white p-8 shadow-soft sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
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
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-ink-950">
                Come say hello
              </h3>
              <p className="mt-0.5 text-sm text-ink-500">
                Lucknow, Uttar Pradesh, India — we'd love to meet you.
              </p>
            </div>
          </div>
          <a
            href="https://maps.google.com/?q=Lucknow,Uttar+Pradesh,India"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-950 hover:bg-ink-950 hover:text-white"
          >
            Open in Maps
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
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
