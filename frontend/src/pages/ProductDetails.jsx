import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addToCart } from "../redux/features/cartSlice";
import { getSingleProduct } from "../services/productService";
import { addRecentlyViewed } from "../utils/helpers";

const ProductDetails = () => {
  // GET ID FROM URL

  const { id } = useParams();

  // PRODUCT STATE

  const [product, setProduct] = useState(null);

  // LOADING STATE

  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      }),
    );

    console.log("Product Added 😎");
  };
  // INCREASE QUANTITY

  const increaseQuantityHandler = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // DECREASE QUANTITY

  const decreaseQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // FETCH SINGLE PRODUCT

  const fetchProduct = async () => {
    try {
      const data = await getSingleProduct(id);
      console.log("Product ID =", id);
      console.log("Product Data =", data);

      console.log(data);

      setProduct(data.product);

      // Track as recently viewed (UI-only, localStorage)
      addRecentlyViewed(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // RUN ON PAGE LOAD

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // LOADING UI — skeleton

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-10">
        <div className="grid grid-cols-1 gap-10 rounded-3xl border border-ink-100 bg-white p-6 shadow-card md:grid-cols-2 md:p-8">
          <div className="skeleton aspect-square w-full rounded-2xl" />
          <div className="space-y-5 py-4">
            <div className="skeleton h-5 w-28 rounded-md" />
            <div className="skeleton h-10 w-3/4 rounded-lg" />
            <div className="skeleton h-4 w-full rounded-md" />
            <div className="skeleton h-4 w-5/6 rounded-md" />
            <div className="skeleton h-12 w-40 rounded-lg" />
            <div className="skeleton h-14 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-ink-50 text-3xl">
          🔍
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold text-ink-950">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          The product you're looking for may have been removed or is
          unavailable.
        </p>
      </div>
    );
  }

  const inStock = product.stock === undefined || product.stock > 0;

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6 py-10">
      {/* BREADCRUMB */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink-400">
        <Link to="/" className="hover:text-ink-950 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-ink-500">{product.category}</span>
        <span>/</span>
        <span className="truncate font-medium text-ink-950">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* IMAGE */}

        <div className="group relative flex items-center justify-center overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-card lg:sticky lg:top-24 lg:self-start">
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-700 shadow-sm backdrop-blur">
            {product.category}
          </span>
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[460px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* DETAILS */}

        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex text-brand-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.34 4.12a1 1 0 0 0 .95.69h4.33c.97 0 1.37 1.24.59 1.81l-3.5 2.54a1 1 0 0 0-.37 1.12l1.34 4.12c.3.92-.76 1.69-1.54 1.12l-3.5-2.54a1 1 0 0 0-1.18 0l-3.5 2.54c-.78.57-1.84-.2-1.54-1.12l1.34-4.12a1 1 0 0 0-.37-1.12L1.69 9.55c-.78-.57-.38-1.81.59-1.81h4.33a1 1 0 0 0 .95-.69L9.05 2.93Z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-ink-400">(128 reviews)</span>
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink-950 sm:text-4xl">
            {product.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-ink-500">
            {product.description}
          </p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl font-extrabold text-ink-950">
              ₹{product.price?.toLocaleString("en-IN")}
            </span>
            <span className="mb-1.5 text-sm text-ink-400">Inclusive of all taxes</span>
          </div>

          {/* meta chips */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-3.5 py-2 text-sm font-medium text-ink-700">
              Category: {product.category}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold ${
                inStock
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  inStock ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
              {inStock ? `In Stock (${product.stock})` : "Out of Stock"}
            </span>
          </div>

          {/* QUANTITY + CART */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-1 rounded-2xl border border-ink-200 bg-white p-1.5">
              <button
                onClick={decreaseQuantityHandler}
                className="grid h-11 w-11 place-items-center rounded-xl text-xl font-bold text-ink-700 transition hover:bg-ink-50 disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center text-lg font-bold text-ink-950">
                {quantity}
              </span>
              <button
                onClick={increaseQuantityHandler}
                className="grid h-11 w-11 place-items-center rounded-xl text-xl font-bold text-ink-700 transition hover:bg-ink-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={addToCartHandler}
              className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-ink-950 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-brand-400 hover:text-ink-950"
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Add To Cart
            </button>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-ink-100 pt-8 sm:grid-cols-3">
            {[
              {
                title: "Free Delivery",
                sub: "On all orders",
                d: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-5.25m0-11.25h1.5",
              },
              {
                title: "Secure Payment",
                sub: "100% protected",
                d: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
              },
              {
                title: "Easy Returns",
                sub: "7-day policy",
                d: "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3",
              },
            ].map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-700">
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
                      d={b.d}
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-950">
                    {b.title}
                  </p>
                  <p className="text-xs text-ink-400">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
