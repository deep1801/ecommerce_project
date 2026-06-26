import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { orders } = useSelector((state) => state.order);

  const statusStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("deliver"))
      return { wrap: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" };
    if (s.includes("ship") || s.includes("transit"))
      return { wrap: "bg-blue-100 text-blue-700", dot: "bg-blue-500" };
    if (s.includes("process") || s.includes("confirm"))
      return { wrap: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" };
    if (s.includes("cancel") || s.includes("fail"))
      return { wrap: "bg-red-100 text-red-700", dot: "bg-red-500" };
    return { wrap: "bg-amber-100 text-amber-700", dot: "bg-amber-500" };
  };

  return (
    <div className="min-h-screen py-10 px-5 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
              My Orders
            </h1>
            <p className="mt-2 text-ink-500">
              Track and manage all your purchases.
            </p>
          </div>
          {orders.length > 0 && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-soft">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-950 text-xs font-bold text-brand-400">
                {orders.length}
              </span>
              {orders.length === 1 ? "Order" : "Orders"} placed
            </span>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 bg-white py-20 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-ink-50">
              <svg
                className="h-9 w-9 text-ink-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76V21a.75.75 0 0 0 .75.75h18a.75.75 0 0 0 .75-.75v-8.24M2.25 12.76 4.06 5.5A1.5 1.5 0 0 1 5.51 4.4h12.98a1.5 1.5 0 0 1 1.45 1.1l1.81 7.26M2.25 12.76h6.4a3 3 0 0 0 5.7 0h7.4"
                />
              </svg>
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold text-ink-950">
              No orders yet
            </h2>
            <p className="mt-2 max-w-sm text-sm text-ink-500">
              Start shopping and place your first order — it'll show up here.
            </p>
            <Link
              to="/"
              className="mt-7 rounded-2xl bg-ink-950 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order, i) => {
              const st = statusStyle(order.status);
              return (
                <div
                  key={order.orderId}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-all duration-300 animate-fade-up hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span
                    className={`absolute inset-y-0 left-0 w-1 ${st.dot}`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-3 border-b border-ink-100 bg-ink-50/50 px-6 py-4 pl-7 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3.5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-950 text-brand-400 transition-transform duration-300 group-hover:scale-105">
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
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-ink-400">
                          Order
                        </p>
                        <h2 className="font-mono text-lg font-bold text-ink-950">
                          #{order.orderId}
                        </h2>
                      </div>
                    </div>
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${st.wrap}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                      {order.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 px-6 py-5 pl-7 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-x-10 gap-y-3">
                      <div>
                        <p className="text-xs text-ink-400">Payment Method</p>
                        <p className="font-semibold text-ink-950">
                          {order.paymentMethod}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-ink-400">Total Amount</p>
                        <p className="font-display text-xl font-extrabold text-ink-950">
                          ₹{order.totalPrice?.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    <button className="group/btn inline-flex items-center justify-center gap-2 rounded-xl border border-ink-200 px-6 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-950 hover:text-white">
                      View Details
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
