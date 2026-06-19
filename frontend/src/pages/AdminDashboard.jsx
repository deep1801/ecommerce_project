import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/productService";
import AdminLayout from "../components/admin/AdminLayout";

const AdminDashboard = () => {
  // Dashboard Stats
  const [dashboardStats, setDashboardStats] = useState(null);

  // Category Stats
  const [categoryStats, setCategoryStats] = useState([]);

  // Fetch Dashboard API
  const fetchDashboardStats = async () => {
    try {
      const data = await getDashboardStats();

      console.log(data);

      setDashboardStats(data.stats);

      setCategoryStats(data.categoryStats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  console.log("Dashboard Stats =", dashboardStats);

  console.log("Category Stats =", categoryStats);

  // Prevent crash before API loads — modern skeleton
  if (!dashboardStats) {
    return (
      <AdminLayout title="Dashboard" subtitle="Loading your store overview...">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft"
            >
              <div className="skeleton h-10 w-10 rounded-xl" />
              <div className="skeleton mt-4 h-4 w-24 rounded-md" />
              <div className="skeleton mt-3 h-8 w-32 rounded-md" />
            </div>
          ))}
        </div>
        <div className="skeleton mt-6 h-80 w-full rounded-2xl" />
      </AdminLayout>
    );
  }

  const stats = [
    {
      label: "Total Products",
      value: dashboardStats.totalProducts,
      to: "/admin/products",
      accent: "bg-sky-50 text-sky-600",
      d: "M20.25 7.5 12 3 3.75 7.5m16.5 0L12 12m8.25-4.5v9L12 21m0-9L3.75 7.5M12 12v9m0-9L3.75 7.5",
      trend: "Live inventory",
    },
    {
      label: "Total Revenue",
      value: `₹${Number(dashboardStats.totalRevenue).toLocaleString("en-IN")}`,
      accent: "bg-emerald-50 text-emerald-600",
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
      trend: "All-time sales",
    },
    {
      label: "Average Price",
      value: `₹${Math.floor(dashboardStats.averagePrice).toLocaleString("en-IN")}`,
      accent: "bg-brand-50 text-brand-600",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
      trend: "Per product",
    },
    {
      label: "Categories",
      value: categoryStats.length,
      accent: "bg-violet-50 text-violet-600",
      d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25Zm9.75-9.75A2.25 2.25 0 0 1 15.75 3.75H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
      trend: "Product groups",
    },
  ];

  const maxCategory = Math.max(
    ...categoryStats.map((c) => c.totalProducts),
    1,
  );

  const barColors = [
    "bg-brand-400",
    "bg-sky-400",
    "bg-emerald-400",
    "bg-violet-400",
    "bg-rose-400",
    "bg-amber-400",
  ];

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Welcome back — here's your store at a glance"
    >
      {/* STAT CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, i) => {
          const card = (
            <div
              className={`animate-fade-up stagger-${i} group h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl ${item.accent}`}
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
                      d={item.d}
                    />
                  </svg>
                </span>
                {item.to && (
                  <svg
                    className="h-5 w-5 text-ink-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink-950"
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
              <p className="mt-4 text-sm text-ink-500">{item.label}</p>
              <h2 className="mt-1 font-display text-3xl font-extrabold text-ink-950">
                {item.value}
              </h2>
              <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {item.trend}
              </p>
            </div>
          );

          return item.to ? (
            <Link key={item.label} to={item.to} className="block">
              {card}
            </Link>
          ) : (
            <div key={item.label}>{card}</div>
          );
        })}
      </div>

      {/* CHART + QUICK ACTIONS */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* CATEGORY BREAKDOWN */}
        <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-ink-950">
                Products by Category
              </h2>
              <p className="text-sm text-ink-500">
                Distribution across your catalog
              </p>
            </div>
            <Link
              to="/admin/products"
              className="rounded-xl border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-950 hover:text-white"
            >
              Manage
            </Link>
          </div>

          {categoryStats.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-400">
              No category data available.
            </p>
          ) : (
            <div className="space-y-5">
              {categoryStats.map((category, i) => (
                <div key={category._id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink-950">
                      {category._id}
                    </span>
                    <span className="font-semibold text-ink-500">
                      {category.totalProducts} product
                      {category.totalProducts !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-ink-50">
                    <div
                      className={`h-full rounded-full ${
                        barColors[i % barColors.length]
                      } transition-all duration-700`}
                      style={{
                        width: `${(category.totalProducts / maxCategory) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold text-ink-950">
            Quick Actions
          </h2>
          <p className="text-sm text-ink-500">Jump straight to a task</p>

          <div className="mt-5 space-y-3">
            {[
              {
                to: "/admin/products",
                label: "Manage Products",
                sub: "Add, edit or remove items",
                d: "M20.25 7.5 12 3 3.75 7.5m16.5 0L12 12m8.25-4.5v9L12 21m0-9L3.75 7.5M12 12v9m0-9L3.75 7.5",
              },
              {
                to: "/my-orders",
                label: "View Orders",
                sub: "Track recent purchases",
                d: "M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z",
              },
              {
                to: "/",
                label: "Visit Storefront",
                sub: "See your live shop",
                d: "M2.25 12 11.204 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75",
              },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="group flex items-center gap-3 rounded-xl border border-ink-100 p-3 transition-all duration-200 hover:border-ink-950 hover:bg-ink-50"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink-950 text-brand-400">
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
                      d={action.d}
                    />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-950">
                    {action.label}
                  </p>
                  <p className="truncate text-xs text-ink-500">{action.sub}</p>
                </div>
                <svg
                  className="h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-0.5"
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
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
