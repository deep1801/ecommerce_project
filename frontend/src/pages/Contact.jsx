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
      value: "+91 81048 18664",
      hint: "Mon–Sat, 9am–8pm",
      href: "tel:+918104818664",
      d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
    },
    {
      title: "WhatsApp",
      value: "+91 81048 18664",
      hint: "Chat with us instantly",
      href: "https://wa.me/918104818664",
      external: true,
      filled: true,
      d: "M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.999zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z",
    },
    {
      title: "Email",
      value: "pradeepyadav20036@gmail.com",
      hint: "We reply within 24h",
      href: "mailto:pradeepyadav20036@gmail.com",
      d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
    },
  ];

  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/impradeepyadav/",
      d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100026820083792",
      d: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/918104818664",
      d: "M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.999zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z",
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
            {info.map((item, i) => {
              const Tag = item.href ? "a" : "div";
              const linkProps = item.href
                ? {
                    href: item.href,
                    ...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {}),
                  }
                : {};
              return (
                <Tag
                  key={item.title}
                  {...linkProps}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="group flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 animate-fade-up hover:-translate-y-1 hover:border-ink-200 hover:shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-700 transition-colors duration-300 group-hover:bg-ink-950 group-hover:text-brand-400">
                    {item.filled ? (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={item.d} />
                      </svg>
                    ) : (
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
                    )}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink-950">{item.title}</h3>
                    <p className="mt-1 break-all text-sm text-ink-950">
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-400">{item.hint}</p>
                  </div>
                </Tag>
              );
            })}

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
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
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
