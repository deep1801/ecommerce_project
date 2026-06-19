import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/features/cartSlice";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { getPricing, formatINR, getRecentlyViewed } from "../utils/helpers";

const SAVED_KEY = "savedForLater";

const PROMOS = {
  SAVE10: { type: "percent", value: 10, label: "10% off" },
  WELCOME5: { type: "percent", value: 5, label: "5% off" },
  FLAT100: { type: "flat", value: 100, label: "₹100 off" },
};

const TRUST_BADGES = [
  {
    title: "Secure Payment",
    sub: "256-bit SSL encrypted",
    d: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  },
  {
    title: "Fast Delivery",
    sub: "Free express shipping",
    d: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
  },
  {
    title: "Easy Returns",
    sub: "7-day return policy",
    d: "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3",
  },
  {
    title: "24/7 Support",
    sub: "Dedicated help team",
    d: "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
  },
];

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SAVE FOR LATER (UI-only, localStorage)
  const [savedItems, setSavedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
    } catch {
      return [];
    }
  });

  // PROMO CODE (UI-only display discount)
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  // RECOMMENDED PRODUCTS
  const [allProducts, setAllProducts] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  // RECENTLY VIEWED (read once)
  const [recentlyViewed] = useState(() => getRecentlyViewed());

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data.products || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRecs(false);
      }
    };
    fetchRecs();
  }, []);

  const persistSaved = (items) => {
    setSavedItems(items);
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  // ---- Save for later actions ----
  const saveForLater = (item) => {
    const next = [
      item,
      ...savedItems.filter((s) => s._id !== item._id),
    ];
    persistSaved(next);
    dispatch(removeFromCart(item._id));
    toast.success("Saved for later");
  };

  const moveToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: item.quantity || 1 }));
    persistSaved(savedItems.filter((s) => s._id !== item._id));
    toast.success("Moved to cart");
  };

  const removeSaved = (id) => {
    persistSaved(savedItems.filter((s) => s._id !== id));
  };

  // ---- Promo ----
  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const promo = PROMOS[code];
    if (!promo) {
      toast.error("Invalid promo code");
      return;
    }
    setAppliedPromo({ code, ...promo });
    toast.success(`Promo ${code} applied`);
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoInput("");
  };

  // ---- Totals ----
  const totalItems = cartItems.reduce((t, i) => t + i.quantity, 0);

  const subtotalMRP = cartItems.reduce((t, item) => {
    const { original } = getPricing(item);
    return t + original * item.quantity;
  }, 0);

  const cartTotal = cartItems.reduce(
    (t, item) => t + item.price * item.quantity,
    0,
  );

  const productDiscount = subtotalMRP - cartTotal;

  const promoDiscount = appliedPromo
    ? Math.min(
        cartTotal,
        appliedPromo.type === "percent"
          ? Math.round((cartTotal * appliedPromo.value) / 100)
          : appliedPromo.value,
      )
    : 0;

  const finalTotal = Math.max(0, cartTotal - promoDiscount);

  // ---- Derived product sections ----
  const cartIds = new Set(cartItems.map((i) => i._id));
  const available = allProducts.filter((p) => !cartIds.has(p._id));
  const recommended = available.slice(0, 4);
  const bundle = available.slice(4, 7);
  const bundleTotal = bundle.reduce((t, p) => t + (p.price || 0), 0);
  const recentList = recentlyViewed
    .filter((p) => !cartIds.has(p._id))
    .slice(0, 4);

  const addBundleToCart = () => {
    bundle.forEach((p) => dispatch(addToCart({ ...p, quantity: 1 })));
    toast.success("Bundle added to cart");
  };

  const sectionHeader = (eyebrow, title) => (
    <div className="mb-6">
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
        {eyebrow}
      </span>
      <h2 className="mt-1.5 font-display text-2xl font-extrabold text-ink-950">
        {title}
      </h2>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* BREADCRUMB */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink-400">
        <Link to="/" className="transition-colors hover:text-ink-950">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium text-ink-950">Shopping Cart</span>
      </nav>

      {/* PAGE TITLE */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
            Shopping Cart
          </h1>
          {cartItems.length > 0 && (
            <p className="mt-2 text-sm text-ink-500">
              {totalItems} item{totalItems !== 1 ? "s" : ""} ready for checkout
            </p>
          )}
        </div>
        <Link
          to="/"
          className="hidden items-center gap-1.5 text-sm font-semibold text-ink-600 transition-colors hover:text-ink-950 sm:inline-flex"
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Continue shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        /* ---------- EMPTY STATE ---------- */
        <div className="animate-fade-up overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
          <div className="relative flex flex-col items-center justify-center px-6 py-16 text-center sm:py-20">
            <div className="pointer-events-none absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-100/50 blur-3xl" />
            <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-100 to-brand-50 text-brand-500 animate-float">
              <svg
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.4}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
            <h2 className="relative mt-7 font-display text-2xl font-bold text-ink-950">
              Your cart is empty
            </h2>
            <p className="relative mt-2 max-w-sm text-sm text-ink-500">
              Looks like you haven't added anything yet. Explore our premium
              collection and find something you'll love.
            </p>
            <Link
              to="/"
              className="relative mt-7 inline-flex items-center gap-2 rounded-2xl bg-ink-950 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
            >
              Start Shopping
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
      ) : (
        /* ---------- CART GRID ---------- */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* LEFT: ITEMS */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item, idx) => {
              const { percent, original } = getPricing(item);
              const lineTotal = item.price * item.quantity;
              const variants = [item.size, item.color, item.variant].filter(
                Boolean,
              );

              return (
                <div
                  key={item._id}
                  className={`animate-fade-up stagger-${Math.min(
                    idx,
                    8,
                  )} group flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-4 shadow-soft transition-all duration-300 hover:border-ink-200 hover:shadow-card sm:flex-row sm:gap-5 sm:p-5`}
                >
                  {/* IMAGE */}
                  <Link
                    to={`/products/${item._id}`}
                    className="relative shrink-0 self-center overflow-hidden rounded-xl bg-ink-50 sm:self-start"
                  >
                    {percent > 0 && (
                      <span className="absolute left-1.5 top-1.5 z-10 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        {percent}% OFF
                      </span>
                    )}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-32 w-32 object-contain p-2 transition-transform duration-500 group-hover:scale-105 sm:h-28 sm:w-28"
                    />
                  </Link>

                  {/* DETAILS */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        {item.category && (
                          <span className="mb-1.5 inline-block rounded-full bg-ink-50 px-2.5 py-0.5 text-[11px] font-semibold text-ink-500">
                            {item.category}
                          </span>
                        )}
                        <h3 className="font-display text-base font-bold leading-snug text-ink-950 sm:text-lg">
                          <Link
                            to={`/products/${item._id}`}
                            className="transition-colors hover:text-brand-600"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        {item.description && (
                          <p className="mt-1 line-clamp-1 text-sm text-ink-500">
                            {item.description}
                          </p>
                        )}
                        {variants.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {variants.map((v) => (
                              <span
                                key={v}
                                className="rounded-md border border-ink-200 px-2 py-0.5 text-xs font-medium text-ink-600"
                              >
                                {v}
                              </span>
                            ))}
                          </div>
                        )}
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

                    {/* PRICE */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="font-display text-lg font-extrabold text-ink-950">
                        {formatINR(item.price)}
                      </span>
                      {percent > 0 && (
                        <>
                          <span className="text-sm text-ink-400 line-through">
                            {formatINR(original)}
                          </span>
                          <span className="text-xs font-bold text-emerald-600">
                            {percent}% off
                          </span>
                        </>
                      )}
                    </div>

                    {/* CONTROLS ROW */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {/* QUANTITY */}
                        <div className="flex items-center gap-1 rounded-xl border border-ink-200 bg-white p-1">
                          <button
                            onClick={() =>
                              dispatch(decreaseQuantity(item._id))
                            }
                            disabled={item.quantity <= 1}
                            className="grid h-9 w-9 place-items-center rounded-lg text-lg font-bold text-ink-700 transition hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-9 text-center font-bold text-ink-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(increaseQuantity(item._id))
                            }
                            className="grid h-9 w-9 place-items-center rounded-lg text-lg font-bold text-ink-700 transition hover:bg-ink-50"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* SAVE FOR LATER */}
                        <button
                          onClick={() => saveForLater(item)}
                          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-ink-600 transition hover:bg-ink-50 hover:text-ink-950"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                            />
                          </svg>
                          <span className="hidden sm:inline">Save for later</span>
                          <span className="sm:hidden">Save</span>
                        </button>
                      </div>

                      {/* LINE SUBTOTAL */}
                      <div className="text-right">
                        <p className="text-xs text-ink-400">Subtotal</p>
                        <p className="font-display text-xl font-extrabold text-ink-950">
                          {formatINR(lineTotal)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* SAVED FOR LATER */}
            {savedItems.length > 0 && (
              <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
                <h3 className="mb-4 font-display text-lg font-bold text-ink-950">
                  Saved for later ({savedItems.length})
                </h3>
                <div className="space-y-3">
                  {savedItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 rounded-xl border border-ink-100 p-3 transition hover:bg-ink-50/50"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 shrink-0 rounded-lg bg-ink-50 object-contain p-1"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-ink-950">
                          {item.title}
                        </p>
                        <p className="text-sm font-bold text-ink-950">
                          {formatINR(item.price)}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          onClick={() => moveToCart(item)}
                          className="rounded-lg bg-ink-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-400 hover:text-ink-950"
                        >
                          Move to cart
                        </button>
                        <button
                          onClick={() => removeSaved(item._id)}
                          className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 transition hover:bg-red-50 hover:text-red-500"
                          aria-label="Remove saved item"
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
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
                <h2 className="font-display text-xl font-bold text-ink-950">
                  Order Summary
                </h2>

                {/* PROMO CODE */}
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold text-ink-700">
                    Have a promo code?
                  </label>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        <span className="text-sm font-bold text-emerald-700">
                          {appliedPromo.code}
                        </span>
                        <span className="text-xs text-emerald-600">
                          ({appliedPromo.label})
                        </span>
                      </div>
                      <button
                        onClick={removePromo}
                        className="text-xs font-semibold text-ink-500 underline-offset-2 hover:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                        placeholder="Enter code (e.g. SAVE10)"
                        className="w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-2.5 text-sm uppercase outline-none transition placeholder:normal-case placeholder:text-ink-400 focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/10"
                      />
                      <button
                        onClick={applyPromo}
                        className="shrink-0 rounded-xl bg-ink-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400 hover:text-ink-950"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="mt-5 space-y-3 border-t border-ink-100 pt-5 text-sm">
                  <div className="flex justify-between text-ink-600">
                    <span>Total Items</span>
                    <span className="font-medium text-ink-950">
                      {totalItems}
                    </span>
                  </div>
                  <div className="flex justify-between text-ink-600">
                    <span>Subtotal (MRP)</span>
                    <span className="font-medium text-ink-950">
                      {formatINR(subtotalMRP)}
                    </span>
                  </div>
                  {productDiscount > 0 && (
                    <div className="flex justify-between text-ink-600">
                      <span>Product Discount</span>
                      <span className="font-semibold text-emerald-600">
                        −{formatINR(productDiscount)}
                      </span>
                    </div>
                  )}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-ink-600">
                      <span>Promo ({appliedPromo.code})</span>
                      <span className="font-semibold text-emerald-600">
                        −{formatINR(promoDiscount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-ink-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between text-ink-600">
                    <span>Taxes</span>
                    <span className="font-medium text-ink-950">Included</span>
                  </div>

                  <div className="my-1 h-px bg-ink-100" />

                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-ink-950">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="font-display text-2xl font-extrabold text-ink-950">
                        {formatINR(finalTotal)}
                      </span>
                      {productDiscount + promoDiscount > 0 && (
                        <p className="text-xs font-semibold text-emerald-600">
                          You save{" "}
                          {formatINR(productDiscount + promoDiscount)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA BUTTONS */}
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

                <Link
                  to="/"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-ink-200 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-50"
                >
                  Continue Shopping
                </Link>

                {/* SECURE BADGE */}
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

                {/* PAYMENT METHODS */}
                <div className="mt-4 flex items-center justify-center gap-2 border-t border-ink-100 pt-4">
                  {["VISA", "MC", "UPI", "AmEx"].map((m) => (
                    <span
                      key={m}
                      className="rounded-md border border-ink-200 bg-ink-50 px-2.5 py-1 text-[10px] font-bold text-ink-500"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRUST INDICATORS */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {TRUST_BADGES.map((b) => (
          <div
            key={b.title}
            className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-950 text-brand-400">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={b.d} />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink-950">{b.title}</p>
              <p className="truncate text-xs text-ink-500">{b.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FREQUENTLY BOUGHT TOGETHER */}
      {!loadingRecs && bundle.length >= 2 && (
        <section className="mt-16">
          {sectionHeader("Save more", "Frequently Bought Together")}
          <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                {bundle.map((p, i) => (
                  <div key={p._id} className="flex items-center gap-3">
                    {i > 0 && (
                      <span className="text-2xl font-light text-ink-300">
                        +
                      </span>
                    )}
                    <Link
                      to={`/products/${p._id}`}
                      className="group flex w-28 flex-col items-center gap-2 rounded-xl border border-ink-100 p-2 transition hover:border-ink-300 hover:shadow-soft"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="line-clamp-1 w-full text-center text-xs font-medium text-ink-600">
                        {p.title}
                      </span>
                      <span className="text-sm font-bold text-ink-950">
                        {formatINR(p.price)}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex shrink-0 flex-col items-start gap-3 border-t border-ink-100 pt-4 lg:items-end lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <div>
                  <p className="text-xs text-ink-400">Bundle price</p>
                  <p className="font-display text-2xl font-extrabold text-ink-950">
                    {formatINR(bundleTotal)}
                  </p>
                </div>
                <button
                  onClick={addBundleToCart}
                  className="inline-flex items-center gap-2 rounded-xl bg-ink-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 hover:text-ink-950"
                >
                  Add all to cart
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RECOMMENDED PRODUCTS */}
      <section className="mt-16">
        {sectionHeader("Just for you", "Recommended Products")}
        {loadingRecs ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft"
              >
                <div className="skeleton aspect-square w-full" />
                <div className="space-y-3 p-5">
                  <div className="skeleton h-5 w-3/4 rounded-md" />
                  <div className="skeleton h-4 w-1/2 rounded-md" />
                  <div className="skeleton h-11 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : recommended.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {recommended.map((product, i) => (
              <div
                key={product._id}
                className={`animate-fade-up stagger-${Math.min(i, 8)}`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-400">No recommendations available.</p>
        )}
      </section>

      {/* RECENTLY VIEWED */}
      {recentList.length > 0 && (
        <section className="mt-16">
          {sectionHeader("Pick up where you left off", "Recently Viewed")}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {recentList.map((product, i) => (
              <div
                key={product._id}
                className={`animate-fade-up stagger-${Math.min(i, 8)}`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;
