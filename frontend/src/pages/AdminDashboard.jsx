import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const totalRevenue = products.reduce((total, product) => {
    return total + product.price;
  }, 0);
  const averagePrice =
    products.length > 0 ? Math.floor(totalRevenue / products.length) : 0;
  console.log("Revenue =", totalRevenue);
  console.log("Total Products =", products.length);
  console.log("Average Price =", averagePrice);
  console.log("Revenue =", totalRevenue);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      console.log(data);

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log("Products State =", products);

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      to: "/admin/products",
      tint: "from-brand-300 to-brand-500 text-ink-950",
      ring: "group-hover:ring-brand-300/40",
      d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
    },
    {
      label: "Total Orders",
      value: "12",
      accent: "text-ink-950",
      tint: "from-sky-400 to-blue-600 text-white",
      ring: "group-hover:ring-sky-300/40",
      d: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272",
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue}`,
      accent: "text-emerald-600",
      tint: "from-emerald-400 to-emerald-600 text-white",
      ring: "group-hover:ring-emerald-300/40",
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    },
    {
      label: "Total Users",
      value: "25",
      accent: "text-ink-950",
      tint: "from-violet-400 to-purple-600 text-white",
      ring: "group-hover:ring-violet-300/40",
      d: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
    },
  ];

  // ── Presentational-only helpers (no data logic) ───────────────
  const navItems = [
    {
      to: "/admin/dashboard",
      label: "Dashboard",
      d: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5",
    },
    {
      to: "/admin/products",
      label: "Products",
      d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
    },
    {
      to: "/my-orders",
      label: "Orders",
      d: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272",
    },
    {
      to: "/",
      label: "Storefront",
      d: "M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z",
    },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-ink-950 text-white shadow-soft"
        : "text-ink-600 hover:bg-ink-100/70 hover:text-ink-950"
    }`;

  const recentProducts = [...products].reverse().slice(0, 5);

  return (
    <div className="min-h-screen px-5 sm:px-6 py-8 sm:py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[256px_1fr]">
        {/* ── SIDEBAR ──────────────────────────────────────── */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft">
            <div className="flex items-center gap-3 px-1.5 pb-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 font-display text-lg font-extrabold text-ink-950 shadow-sm">
                S
              </span>
              <div>
                <p className="font-display text-sm font-bold leading-tight text-ink-950">
                  Admin Panel
                </p>
                <p className="text-xs text-ink-400">ShopEasy</p>
              </div>
            </div>

            <div className="my-1 h-px bg-ink-100" />

            <nav className="mt-2 flex flex-row gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin/dashboard"}
                  className={navLinkClass}
                >
                  <svg
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={item.d}
                    />
                  </svg>
                  <span className="whitespace-nowrap">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── MAIN ─────────────────────────────────────────── */}
        <div className="min-w-0">
          {/* HEADER */}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 animate-fade-up">
            <div>
              <nav className="flex items-center gap-1.5 text-xs font-medium text-ink-400">
                <span>Admin</span>
                <span className="text-ink-300">/</span>
                <span className="text-ink-600">Dashboard</span>
              </nav>
              <h1 className="mt-1.5 font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
                Welcome back 👋
              </h1>
              <p className="mt-1.5 text-sm text-ink-500">
                Here's what's happening with your store today.
              </p>
            </div>
            <Link
              to="/admin/products"
              className="group inline-flex items-center gap-2 rounded-xl bg-ink-950 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-400 hover:text-ink-950 hover:shadow-card"
            >
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Manage Products
            </Link>
          </div>

          {/* STAT CARDS */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s, i) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br shadow-sm ring-2 ring-transparent transition-all duration-300 group-hover:scale-110 ${s.tint} ${s.ring}`}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={s.d}
                        />
                      </svg>
                    </span>
                    {s.to && (
                      <svg
                        className="h-5 w-5 text-ink-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink-950"
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
                    )}
                  </div>
                  <p className="mt-5 text-sm font-medium text-ink-500">
                    {s.label}
                  </p>
                  <h2
                    className={`mt-1 font-display text-3xl font-extrabold ${s.accent || "text-ink-950"}`}
                  >
                    {s.value}
                  </h2>
                </>
              );

              const base =
                "group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 animate-fade-up hover:-translate-y-1.5 hover:border-ink-200 hover:shadow-lift";

              return s.to ? (
                <Link
                  key={s.label}
                  to={s.to}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className={base}
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={s.label}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className={base}
                >
                  {inner}
                </div>
              );
            })}
          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                to: "/admin/products",
                title: "Add a Product",
                desc: "Create and publish a new listing",
                d: "M12 4.5v15m7.5-7.5h-15",
              },
              {
                to: "/admin/products",
                title: "Manage Inventory",
                desc: "Edit, update or remove products",
                d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.397-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
              },
              {
                to: "/my-orders",
                title: "View Orders",
                desc: "Track and review customer orders",
                d: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272",
              },
            ].map((a) => (
              <Link
                key={a.title}
                to={a.to}
                className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-ink-200 hover:shadow-card"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-700 transition-colors duration-300 group-hover:bg-ink-950 group-hover:text-brand-400">
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
                      d={a.d}
                    />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink-950">{a.title}</p>
                  <p className="truncate text-xs text-ink-500">{a.desc}</p>
                </div>
                <svg
                  className="ml-auto h-5 w-5 shrink-0 text-ink-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            ))}
          </div>

          {/* RECENT PRODUCTS */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
            <div className="flex items-center justify-between gap-4 border-b border-ink-100 px-6 py-5">
              <div>
                <h2 className="font-display text-lg font-bold text-ink-950">
                  Recent Products
                </h2>
                <p className="mt-0.5 text-xs text-ink-500">
                  Your latest catalog additions
                </p>
              </div>
              <Link
                to="/admin/products"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
              >
                View all
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>

            {recentProducts.length === 0 ? (
              /* EMPTY STATE */
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink-50 text-ink-300">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink-950">
                  No products yet
                </h3>
                <p className="mt-1 max-w-xs text-sm text-ink-500">
                  Once you add products, they'll appear here for a quick
                  overview.
                </p>
                <Link
                  to="/admin/products"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink-950 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-400 hover:text-ink-950"
                >
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Add your first product
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left">
                  <thead>
                    <tr className="border-b border-ink-100 text-xs font-semibold uppercase tracking-wider text-ink-400">
                      <th className="px-6 py-3.5">Product</th>
                      <th className="px-6 py-3.5">Category</th>
                      <th className="px-6 py-3.5 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProducts.map((p) => (
                      <tr
                        key={p._id || p.name}
                        className="border-b border-ink-50 transition-colors last:border-0 hover:bg-ink-50/50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-ink-50 text-ink-400">
                              {p.image ? (
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="truncate font-medium text-ink-950">
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-600">
                            {p.category || "General"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-ink-950">
                          ₹{p.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
