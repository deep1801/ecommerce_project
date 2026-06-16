import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { orders } = useSelector((state) => state.order);

  return (
    <div className="min-h-screen py-10 px-5 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
            My Orders
          </h1>
          <p className="mt-2 text-ink-500">
            Track and manage all your purchases.
          </p>
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
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="flex flex-col gap-3 border-b border-ink-100 bg-ink-50/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ink-400">
                      Order
                    </p>
                    <h2 className="font-mono text-lg font-bold text-ink-950">
                      #{order.orderId}
                    </h2>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1.5 text-xs font-semibold text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    {order.status}
                  </span>
                </div>

                <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
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

                  <button className="rounded-xl border border-ink-200 px-6 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-950 hover:text-white">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
