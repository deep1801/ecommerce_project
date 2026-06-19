import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/features/userSlice";

// Demo notifications (UI only — no backend changes)
const NOTIFICATIONS = [
  {
    id: 1,
    title: "Order shipped",
    text: "Your order #SE-2048 is on the way.",
    time: "2m ago",
    color: "bg-emerald-50 text-emerald-600",
    d: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25",
  },
  {
    id: 2,
    title: "Flash sale live",
    text: "Up to 40% off on laptops today only.",
    time: "1h ago",
    color: "bg-brand-50 text-brand-600",
    d: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    id: 3,
    title: "Price drop",
    text: "An item in your wishlist is now cheaper.",
    time: "5h ago",
    color: "bg-sky-50 text-sky-600",
    d: "M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // MOBILE MENU (UI-only state)
  const [menuOpen, setMenuOpen] = useState(false);

  // DROPDOWN STATE — only one open at a time: "cart" | "profile" | "notif" | null
  const [openMenu, setOpenMenu] = useState(null);

  // SEARCH (UI-only)
  const [searchTerm, setSearchTerm] = useState("");

  const actionsRef = useRef(null);

  // CART DATA
  const { cartItems } = useSelector((state) => state.cart);

  // USER DATA
  const { user } = useSelector((state) => state.user);

  // LOGOUT
  const logoutHandler = () => {
    dispatch(logout());
    setOpenMenu(null);
    navigate("/login");
  };

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Resolve a profile image if available, otherwise fall back to initials avatar
  const profileImage =
    user?.profileImage || user?.avatar || user?.image || user?.photo || null;
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionsRef.current && !actionsRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate("/");
    // Smooth scroll to the products section on the home page
    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-ink-950" : "text-ink-500 hover:text-ink-950"
    } after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-brand-400 after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/85 text-ink-950 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-6">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 text-lg font-extrabold text-ink-950 shadow-lg shadow-brand-500/20 transition-transform duration-300 group-hover:scale-105 font-display">
            S
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">
            Shop<span className="text-brand-500">Easy</span>
          </span>
        </Link>

        {/* SEARCH BAR (desktop) */}
        <form
          onSubmit={handleSearch}
          className="relative hidden flex-1 max-w-xl md:block"
        >
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full rounded-full border border-ink-200 bg-ink-50/70 py-2.5 pl-12 pr-24 text-sm outline-none transition focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/5"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-ink-950 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
          >
            Search
          </button>
        </form>

        {/* DESKTOP NAV */}
        <nav className="ml-auto hidden items-center gap-7 lg:flex">
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
        <div
          ref={actionsRef}
          className="ml-auto flex items-center gap-1.5 lg:ml-0"
        >
          {/* NOTIFICATIONS (desktop) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() =>
                setOpenMenu((m) => (m === "notif" ? null : "notif"))
              }
              className="relative grid h-10 w-10 place-items-center rounded-xl text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-950"
              aria-label="Notifications"
            >
              <svg
                className="h-5.5 w-5.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
            </button>

            {openMenu === "notif" && (
              <div className="animate-dropdown absolute right-0 mt-2 w-80 origin-top-right overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-lift">
                <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
                  <h3 className="font-display text-sm font-bold text-ink-950">
                    Notifications
                  </h3>
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-600">
                    {NOTIFICATIONS.length} new
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className="flex gap-3 border-b border-ink-50 px-4 py-3 transition-colors hover:bg-ink-50/60"
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${n.color}`}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.7}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={n.d}
                          />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink-950">
                          {n.title}
                        </p>
                        <p className="truncate text-xs text-ink-500">{n.text}</p>
                        <p className="mt-0.5 text-[11px] text-ink-400">
                          {n.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 text-center text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-50">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* CART (hover + click) */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("cart")}
            onMouseLeave={() => setOpenMenu((m) => (m === "cart" ? null : m))}
          >
            <Link
              to="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-xl text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-950"
              aria-label="Cart"
            >
              <svg
                className="h-5.5 w-5.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MINI-CART DROPDOWN */}
            {openMenu === "cart" && (
              <div className="animate-dropdown absolute right-0 mt-2 w-80 origin-top-right overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-lift">
                <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
                  <h3 className="font-display text-sm font-bold text-ink-950">
                    My Cart
                  </h3>
                  <span className="text-xs text-ink-500">
                    {cartCount} item{cartCount !== 1 ? "s" : ""}
                  </span>
                </div>

                {cartItems.length === 0 ? (
                  <div className="px-4 py-10 text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ink-50 text-ink-400">
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
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </div>
                    <p className="mt-3 text-sm text-ink-500">
                      Your cart is empty
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-72 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 border-b border-ink-50 px-4 py-3"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-12 w-12 shrink-0 rounded-lg bg-ink-50 object-contain p-1"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-ink-950">
                              {item.title}
                            </p>
                            <p className="text-xs text-ink-500">
                              Qty {item.quantity} · ₹
                              {item.price?.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <p className="shrink-0 text-sm font-bold text-ink-950">
                            ₹
                            {(item.price * item.quantity)?.toLocaleString(
                              "en-IN",
                            )}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm text-ink-500">Subtotal</span>
                      <span className="font-display text-lg font-extrabold text-ink-950">
                        ₹{cartTotal?.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </>
                )}

                <div className="px-4 pb-4">
                  <Link
                    to="/cart"
                    onClick={() => setOpenMenu(null)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink-950 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
                  >
                    View Cart
                    <svg
                      className="h-4 w-4"
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
            )}
          </div>

          {/* AUTH / PROFILE (desktop) */}
          {user ? (
            <div className="relative hidden lg:block">
              <button
                onClick={() =>
                  setOpenMenu((m) => (m === "profile" ? null : "profile"))
                }
                className="flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-ink-50"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={user.name}
                    className="h-8 w-8 rounded-lg object-cover"
                  />
                ) : (
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-300 to-brand-500 text-sm font-bold text-ink-950">
                    {initial}
                  </span>
                )}
                <span className="max-w-[100px] truncate text-sm font-medium text-ink-950">
                  {user.name}
                </span>
                <svg
                  className={`h-4 w-4 text-ink-400 transition-transform duration-200 ${
                    openMenu === "profile" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {openMenu === "profile" && (
                <div className="animate-dropdown absolute right-0 mt-2 w-60 origin-top-right overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-lift">
                  <div className="flex items-center gap-3 border-b border-ink-100 px-4 py-4">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={user.name}
                        className="h-11 w-11 rounded-xl object-cover"
                      />
                    ) : (
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 text-lg font-bold text-ink-950">
                        {initial}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-ink-950">
                        {user.name}
                      </p>
                      {user.email && (
                        <p className="truncate text-xs text-ink-500">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-1.5">
                    {[
                      {
                        to: "/profile",
                        label: "My Profile",
                        d: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
                      },
                      {
                        to: "/my-orders",
                        label: "My Orders",
                        d: "M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z",
                      },
                      {
                        to: "/profile",
                        label: "Settings",
                        d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.397-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
                      },
                    ].map((m) => (
                      <Link
                        key={m.label}
                        to={m.to}
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-950"
                      >
                        <svg
                          className="h-5 w-5 text-ink-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.7}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={m.d}
                          />
                        </svg>
                        {m.label}
                      </Link>
                    ))}

                    <div className="my-1.5 h-px bg-ink-100" />

                    <button
                      onClick={logoutHandler}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-950"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-ink-950 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* HAMBURGER (mobile / tablet) */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-xl text-ink-950 transition-colors hover:bg-ink-50 lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="relative h-5 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "top-2.5 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "top-2.5 -rotate-45" : "top-[18px]"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {menuOpen && (
        <div className="animate-slide-down border-t border-ink-100 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-5 py-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="relative mb-4 md:hidden">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-ink-200 bg-ink-50/70 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-ink-950 focus:bg-white"
              />
            </form>

            <nav className="flex flex-col gap-1">
              {[
                { to: "/", label: "Home", end: true },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
                { to: "/my-orders", label: "My Orders" },
                { to: "/admin/dashboard", label: "Admin" },
              ].map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-ink-950 text-white"
                        : "text-ink-700 hover:bg-ink-50 hover:text-ink-950"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="my-3 h-px bg-ink-100" />

            {user ? (
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-ink-50 p-3">
                <div className="flex min-w-0 items-center gap-3">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user.name}
                      className="h-10 w-10 rounded-xl object-cover"
                    />
                  ) : (
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 font-bold text-ink-950">
                      {initial}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink-950">
                      {user.name}
                    </p>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="text-xs font-medium text-ink-500"
                    >
                      View profile
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logoutHandler();
                  }}
                  className="shrink-0 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-xl border border-ink-200 px-4 py-3 text-center text-base font-medium text-ink-950"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-xl bg-ink-950 px-4 py-3 text-center text-base font-semibold text-white"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
