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

            <div className="flex gap-3 mt-6">
              {["M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z", "M18.9 1.2H22l-7 8 8.2 10.8h-6.4l-5-6.6-5.8 6.6H1.9l7.5-8.6L1 1.2h6.6l4.5 6 5.8-6Zm-1.1 18h1.7L7.1 3H5.3l12.5 16.2Z", "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 4.9a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5-8.3a1.1 1.1 0 1 0 0 2.3 1.1 1.1 0 0 0 0-2.3Z"].map(
                (d, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-ink-300 hover:bg-brand-400 hover:text-ink-950 transition-colors"
                    aria-label="Social link"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={d} />
                    </svg>
                  </a>
                ),
              )}
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
