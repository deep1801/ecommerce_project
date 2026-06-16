import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/features/userSlice";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // MOBILE MENU (UI-only state)

  const [menuOpen, setMenuOpen] = useState(false);

  // CART DATA

  const { cartItems } = useSelector((state) => state.cart);

  // USER DATA

  const { user } = useSelector((state) => state.user);

  // LOGOUT

  const logoutHandler = () => {
    dispatch(logout());

    navigate("/login");
  };

  const cartCount = cartItems.length;

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-white" : "text-ink-300 hover:text-white"
    } after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-brand-400 after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/90 text-white backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex justify-between items-center">
        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 text-ink-950 font-display font-extrabold text-lg shadow-lg shadow-brand-500/20 transition-transform duration-300 group-hover:scale-105">
            S
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">
            Shop<span className="text-brand-400">Easy</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

          <NavLink to="/admin/dashboard" className={navLinkClass}>
            Admin
          </NavLink>
        </nav>

        {/* RIGHT ACTIONS */}

        <div className="hidden lg:flex items-center gap-3">
          {/* CART */}

          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-xl text-ink-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5.5 w-5.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-400 px-1 text-[11px] font-bold text-ink-950 ring-2 ring-ink-950">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 pl-1.5 pr-3 py-1.5 transition-colors"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-400 text-ink-950 text-sm font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <span className="text-sm font-medium max-w-[120px] truncate">
                  {user.name}
                </span>
              </Link>

              <button
                onClick={logoutHandler}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-ink-200 hover:text-white hover:border-white/30 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-ink-200 hover:text-white transition-colors"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-ink-950 hover:bg-brand-300 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE: cart + hamburger */}

        <div className="flex items-center gap-1 lg:hidden">
          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-xl text-ink-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5.5 w-5.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-400 px-1 text-[11px] font-bold text-ink-950 ring-2 ring-ink-950">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-xl text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-6 w-6"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}

      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-ink-950/95 backdrop-blur-xl animate-fade-in">
          <nav className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
            {[
              { to: "/", label: "Home", end: true },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/admin/dashboard", label: "Admin" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-ink-200 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="my-2 h-px bg-white/10" />

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink-200 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Hi, {user.name}
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logoutHandler();
                  }}
                  className="text-left rounded-xl px-4 py-3 text-base font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-xl border border-white/15 px-4 py-3 text-center text-base font-medium text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-xl bg-white px-4 py-3 text-center text-base font-semibold text-ink-950"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
