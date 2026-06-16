import { useSelector, useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/features/cartSlice";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  // GET CART DATA FROM REDUX

  const { cartItems } = useSelector((state) => state.cart);

  // DISPATCH FUNCTION

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TOTAL PRICE CALCULATION

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  console.log(cartItems);
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6 py-10">
      {/* PAGE TITLE */}

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
            Shopping Cart
          </h1>
          {cartItems.length > 0 && (
            <p className="mt-2 text-sm text-ink-500">
              {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
            </p>
          )}
        </div>
        <Link
          to="/"
          className="hidden text-sm font-medium text-ink-500 hover:text-ink-950 transition-colors sm:inline-flex sm:items-center sm:gap-1"
        >
          ← Continue shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold text-ink-950">
            Your cart is empty
          </h2>
          <p className="mt-2 max-w-sm text-sm text-ink-500">
            Looks like you haven't added anything yet. Explore our products and
            find something you love.
          </p>
          <Link
            to="/"
            className="mt-7 rounded-2xl bg-ink-950 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* CART ITEMS */}

          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-5 rounded-2xl border border-ink-100 bg-white p-4 shadow-soft transition-shadow hover:shadow-card sm:flex-row sm:items-center"
              >
                {/* IMAGE */}

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-28 w-28 shrink-0 rounded-xl bg-ink-50 object-contain p-2"
                />

                {/* DETAILS */}

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-lg font-bold text-ink-950">
                        {item.title}
                      </h2>
                      <p className="mt-1 line-clamp-1 text-sm text-ink-500">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    {/* QUANTITY SECTION */}
                    <div className="flex items-center gap-1 rounded-xl border border-ink-200 p-1">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                        className="grid h-9 w-9 place-items-center rounded-lg text-lg font-bold text-ink-700 transition hover:bg-ink-50"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-9 text-center font-bold text-ink-950">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item._id))}
                        className="grid h-9 w-9 place-items-center rounded-lg text-lg font-bold text-ink-700 transition hover:bg-ink-50"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-ink-400">
                        ₹{item.price?.toLocaleString("en-IN")} each
                      </p>
                      <p className="font-display text-xl font-bold text-ink-950">
                        ₹{(item.price * item.quantity)?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CART SUMMARY */}

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl font-bold text-ink-950">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-ink-600">
                  <span>Total Items</span>
                  <span className="font-medium text-ink-950">{totalItems}</span>
                </div>

                <div className="flex justify-between text-ink-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-ink-950">
                    ₹{totalPrice?.toLocaleString("en-IN")}
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
                onClick={() => navigate("/checkout")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-950 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
              >
                Proceed To Checkout
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
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
                Secure checkout · SSL encrypted
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
