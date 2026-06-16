import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../redux/features/orderSlice";

const OrderReview = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const { shippingAddress } = useSelector((state) => state.shipping);

  const { paymentMethod } = useSelector((state) => state.payment);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const placeOrderHandler = () => {
    const orderData = {
      orderItems: cartItems,

      shippingAddress,

      paymentMethod,

      totalPrice,

      status: "Pending",

      orderId: Date.now(),
    };

    dispatch(createOrder(orderData));

    console.log("Order Created 😎");

    navigate("/order-success");
  };

  return (
    <div className="min-h-screen py-10 px-5 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* PAGE TITLE */}

        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
            Review Your Order
          </h1>
          <p className="mt-2 text-ink-500">
            Almost there — confirm your details and place your order.
          </p>
        </div>

        {/* STEPS */}

        <div className="mb-10 flex items-center justify-center gap-2 sm:gap-4">
          {["Cart", "Shipping", "Payment", "Review"].map((label, i, arr) => {
            const active = label === "Review";
            return (
              <div key={label} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${
                      active
                        ? "bg-ink-950 text-white"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {active ? i + 1 : "✓"}
                  </span>
                  <span className="hidden text-sm font-medium text-ink-950 sm:inline">
                    {label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <span className="h-px w-6 bg-emerald-500 sm:w-10" />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT SECTION */}

          <div className="space-y-6 lg:col-span-2">
            {/* SHIPPING CARD */}

            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-50 text-ink-700">
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
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </span>
                <h2 className="font-display text-lg font-bold text-ink-950">
                  Shipping Address
                </h2>
              </div>

              <div className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <p className="text-ink-500">
                  Name:{" "}
                  <span className="font-medium text-ink-950">
                    {shippingAddress.fullName}
                  </span>
                </p>
                <p className="text-ink-500">
                  Phone:{" "}
                  <span className="font-medium text-ink-950">
                    {shippingAddress.phone}
                  </span>
                </p>
                <p className="text-ink-500 sm:col-span-2">
                  Address:{" "}
                  <span className="font-medium text-ink-950">
                    {shippingAddress.address}
                  </span>
                </p>
                <p className="text-ink-500">
                  City:{" "}
                  <span className="font-medium text-ink-950">
                    {shippingAddress.city}
                  </span>
                </p>
                <p className="text-ink-500">
                  State:{" "}
                  <span className="font-medium text-ink-950">
                    {shippingAddress.stateName}
                  </span>
                </p>
                <p className="text-ink-500">
                  Pincode:{" "}
                  <span className="font-medium text-ink-950">
                    {shippingAddress.pincode}
                  </span>
                </p>
              </div>
            </div>

            {/* PAYMENT CARD */}

            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-50 text-ink-700">
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
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                </span>
                <h2 className="font-display text-lg font-bold text-ink-950">
                  Payment Method
                </h2>
              </div>

              <span className="inline-flex items-center rounded-xl bg-ink-50 px-4 py-2 text-sm font-semibold text-ink-950">
                {paymentMethod}
              </span>
            </div>

            {/* PRODUCTS CARD */}

            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-50 text-ink-700">
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </span>
                <h2 className="font-display text-lg font-bold text-ink-950">
                  Order Items
                </h2>
              </div>

              <div className="divide-y divide-ink-100">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 shrink-0 rounded-xl bg-ink-50 object-contain p-2"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-ink-950">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-ink-500">
                        Qty: {item.quantity} × ₹
                        {item.price?.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <span className="font-display font-bold text-ink-950">
                      ₹{(item.price * item.quantity)?.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}

          <div>
            <div className="sticky top-24 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl font-bold text-ink-950">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-ink-600">
                  <span>Items</span>
                  <span className="font-medium text-ink-950">
                    {cartItems.length}
                  </span>
                </div>

                <div className="flex justify-between text-ink-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>

                <div className="my-2 h-px bg-ink-100" />

                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-ink-950">
                    Total
                  </span>
                  <span className="font-display text-2xl font-extrabold text-ink-950">
                    ₹{totalPrice?.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                onClick={placeOrderHandler}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-950 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
              >
                Place Order
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </button>

              <p className="mt-4 text-center text-xs text-ink-400">
                By placing this order you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
