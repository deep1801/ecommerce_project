import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const { orders } = useSelector((state) => state.order);

  const latestOrder = orders[orders.length - 1];

  if (!latestOrder) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-ink-50 text-3xl">
          📦
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold text-ink-950">
          No order found
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5 py-12">
      <div className="w-full max-w-xl animate-fade-up rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-card sm:p-10">
        {/* Success mark */}
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </span>
        </div>

        <h1 className="mt-6 font-display text-2xl font-extrabold text-ink-950 sm:text-3xl">
          Order placed successfully!
        </h1>

        <p className="mt-2 text-ink-500">
          Thank you for shopping with us. A confirmation has been sent to your
          email.
        </p>

        <div className="mt-8 rounded-2xl border border-ink-100 bg-ink-50/50 p-6 text-left">
          <div className="flex items-center justify-between border-b border-ink-100 pb-3">
            <span className="text-sm text-ink-500">Order ID</span>
            <span className="font-mono text-sm font-semibold text-ink-950">
              #{latestOrder.orderId}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-ink-100 py-3">
            <span className="text-sm text-ink-500">Payment</span>
            <span className="text-sm font-semibold text-ink-950">
              {latestOrder.paymentMethod}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-ink-100 py-3">
            <span className="text-sm text-ink-500">Status</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              {latestOrder.status}
            </span>
          </div>
          <div className="flex items-center justify-between pt-3">
            <span className="text-sm text-ink-500">Total Paid</span>
            <span className="font-display text-lg font-extrabold text-ink-950">
              ₹{latestOrder.totalPrice?.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="flex-1 rounded-2xl bg-ink-950 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
          >
            Continue Shopping
          </Link>

          <Link
            to="/my-orders"
            className="flex-1 rounded-2xl border border-ink-200 py-3.5 text-center text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-50"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
