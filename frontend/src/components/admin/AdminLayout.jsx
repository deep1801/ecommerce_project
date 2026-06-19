import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/features/userSlice";

const navItems = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    d: "M2.25 12 11.204 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  },
  {
    to: "/admin/products",
    label: "Products",
    d: "M20.25 7.5 12 3 3.75 7.5m16.5 0L12 12m8.25-4.5v9L12 21m0-9L3.75 7.5M12 12v9m0-9L3.75 7.5",
  },
];

// Secondary (UI-only) navigation — links to existing pages or placeholders
const secondaryItems = [
  {
    to: "/my-orders",
    label: "Orders",
    d: "M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z",
  },
  {
    to: "/",
    label: "Storefront",
    d: "M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z",
  },
];

const AdminLayout = ({ title = "Dashboard", subtitle, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const profileImage =
    user?.profileImage || user?.avatar || user?.image || user?.photo || null;
  const initial = user?.name?.charAt(0)?.toUpperCase() || "A";

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-brand-400 text-ink-950 shadow-soft"
        : "text-ink-300 hover:bg-white/5 hover:text-white"
    }`;

  const renderSidebar = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <Link
        to="/admin/dashboard"
        className="flex items-center gap-2.5 px-2 py-1"
        onClick={() => setSidebarOpen(false)}
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 font-display text-lg font-extrabold text-ink-950">
          S
        </span>
        <div className="leading-tight">
          <span className="block font-display text-lg font-extrabold tracking-tight text-white">
            Shop<span className="text-brand-400">Easy</span>
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wider text-ink-400">
            Admin Panel
          </span>
        </div>
      </Link>

      {/* Nav */}
      <nav className="mt-8 flex-1 space-y-1">
        <p className="px-3.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
          Menu
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={linkClass}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={item.d} />
            </svg>
            {item.label}
          </NavLink>
        ))}

        <p className="px-3.5 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
          Shortcuts
        </p>
        {secondaryItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            end
            className={linkClass}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={item.d} />
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Upgrade card */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 p-4 text-ink-950">
        <p className="font-display text-sm font-bold">Need help?</p>
        <p className="mt-1 text-xs text-ink-900/80">
          Check the docs or contact support for assistance.
        </p>
        <Link
          to="/contact"
          onClick={() => setSidebarOpen(false)}
          className="mt-3 inline-block rounded-lg bg-ink-950 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-ink-900"
        >
          Get Support
        </Link>
      </div>

      {/* User */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
        {profileImage ? (
          <img
            src={profileImage}
            alt={user?.name}
            className="h-9 w-9 rounded-lg object-cover"
          />
        ) : (
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-300 to-brand-500 text-sm font-bold text-ink-950">
            {initial}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {user?.name || "Admin"}
          </p>
          <p className="truncate text-xs text-ink-400">
            {user?.email || "Administrator"}
          </p>
        </div>
        <button
          onClick={logoutHandler}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          aria-label="Logout"
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
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas">
      {/* DESKTOP SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-ink-950 p-4 lg:flex">
        {renderSidebar()}
      </aside>

      {/* MOBILE SIDEBAR + OVERLAY */}
      {sidebarOpen && (
        <div className="lg:hidden">
          <div
            className="animate-fade-in fixed inset-0 z-40 bg-ink-950/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="animate-slide-in fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-ink-950 p-4">
            {renderSidebar()}
          </aside>
        </div>
      )}

      {/* MAIN */}
      <div className="lg:pl-64">
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl text-ink-700 transition-colors hover:bg-ink-50 lg:hidden"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
            </button>

            <div className="min-w-0">
              <h1 className="truncate font-display text-lg font-extrabold text-ink-950">
                {title}
              </h1>
              {subtitle && (
                <p className="truncate text-xs text-ink-500">{subtitle}</p>
              )}
            </div>

            {/* Topbar search */}
            <div className="relative ml-auto hidden md:block">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
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
                placeholder="Search..."
                className="w-56 rounded-full border border-ink-200 bg-ink-50/70 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/5"
              />
            </div>

            <button
              className="relative ml-auto grid h-10 w-10 place-items-center rounded-xl text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-950 md:ml-0"
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

            <div className="flex items-center gap-2.5 rounded-full border border-ink-100 py-1 pl-1 pr-3">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={user?.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-brand-500 text-sm font-bold text-ink-950">
                  {initial}
                </span>
              )}
              <span className="hidden text-sm font-medium text-ink-950 sm:block">
                {user?.name || "Admin"}
              </span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
