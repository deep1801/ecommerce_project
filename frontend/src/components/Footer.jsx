import { Link } from "react-router-dom";

const Footer = () => {
  const linkClass =
    "text-ink-300 hover:text-brand-400 transition-colors duration-200 text-sm";

  return (
    <footer className="bg-ink-950 text-white mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* LOGO SECTION */}

          <div className="lg:pr-8">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 text-ink-950 font-display font-extrabold text-lg">
                S
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                Shop<span className="text-brand-400">Easy</span>
              </span>
            </Link>

            <p className="text-ink-300 leading-7 mt-5 text-sm">
              A modern ecommerce experience — premium products, secure checkout
              and fast delivery, all in one place.
            </p>

            <ul className="mt-6 space-y-2.5">
              <li>
                <a href="mailto:pradeepyadav20036@gmail.com" className={linkClass}>
                  pradeepyadav20036@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918104818664" className={linkClass}>
                  +91 81048 18664
                </a>
              </li>
            </ul>

            <div className="flex gap-3 mt-6">
              {[
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/impradeepyadav/",
                  d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
                },
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/profile.php?id=100026820083792",
                  d: "M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z",
                },
                {
                  label: "WhatsApp",
                  href: "https://wa.me/918104818664",
                  d: "M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.999zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-ink-300 hover:bg-brand-400 hover:text-ink-950 transition-colors"
                  aria-label={s.label}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-200 mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className={linkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={linkClass}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cart" className={linkClass}>
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-200 mb-5">
              Categories
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className={linkClass}>
                  Mobiles
                </Link>
              </li>
              <li>
                <Link to="/" className={linkClass}>
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/" className={linkClass}>
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/" className={linkClass}>
                  Gaming
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-200 mb-5">
              Stay in the loop
            </h3>

            <p className="text-ink-300 text-sm mb-4 leading-6">
              Get the latest drops and exclusive deals straight to your inbox.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-ink-400 outline-none focus:border-brand-400 focus:bg-white/10 transition"
              />

              <button className="w-full rounded-xl bg-brand-400 text-ink-950 py-3 text-sm font-semibold hover:bg-brand-300 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}

        <div className="my-10 h-px bg-white/10" />

        {/* COPYRIGHT */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ink-400 text-sm">
            © 2026 ShopEasy. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className={linkClass}>
              Privacy Policy
            </a>
            <a href="#" className={linkClass}>
              Terms
            </a>
            <a href="#" className={linkClass}>
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
