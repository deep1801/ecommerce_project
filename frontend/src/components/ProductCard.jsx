import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { addToCart } from "../redux/features/cartSlice";
import { getPricing } from "../utils/helpers";

// Stable, deterministic display rating derived from the product id.
// (UI-only — does not change any product data.)
const deriveRating = (id = "") => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 1000;
  const rating = 3.8 + (hash % 13) / 10; // 3.8 – 5.0
  const reviews = 24 + (hash % 480); // 24 – 503
  return { rating: Math.min(5, rating), reviews };
};

const Stars = ({ value }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`h-3.5 w-3.5 ${
              filled || isHalf ? "text-brand-400" : "text-ink-200"
            }`}
            fill="currentColor"
          >
            {isHalf ? (
              <>
                <defs>
                  <linearGradient id={`half-${i}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${i})`}
                  stroke="currentColor"
                  strokeWidth="0"
                  d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5z"
                />
              </>
            ) : (
              <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5z" />
            )}
          </svg>
        );
      })}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToProduct = () => navigate(`/products/${product._id}`);

  // Reflect real stock data (UI display only)
  const inStock = product.stock === undefined || product.stock > 0;
  const lowStock =
    product.stock !== undefined && product.stock > 0 && product.stock <= 5;

  const { rating, reviews } = deriveRating(product._id);
  const { percent, original } = getPricing(product);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!inStock) return;
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div
      onClick={goToProduct}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-200 hover:shadow-lift"
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-ink-50">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink-700 shadow-sm backdrop-blur">
          {product.category}
        </span>

        {percent > 0 && (
          <span className="absolute left-3 top-11 z-10 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            {percent}% OFF
          </span>
        )}

        {lowStock && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-brand-400 px-3 py-1 text-[11px] font-bold text-ink-950 shadow-sm">
            Only {product.stock} left
          </span>
        )}

        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick add overlay button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="absolute bottom-3 right-3 z-10 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-ink-950 text-white opacity-0 shadow-lift transition-all duration-300 hover:bg-brand-400 hover:text-ink-950 group-hover:translate-y-0 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-0"
          aria-label="Add to cart"
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
        </button>
      </div>

      {/* DETAILS */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-1 font-display text-lg font-bold text-ink-950">
          {product.title}
        </h2>

        {/* RATING */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <Stars value={rating} />
          <span className="text-xs font-semibold text-ink-700">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-ink-400">({reviews})</span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-xs text-ink-400">Price</span>
            <p className="font-display text-2xl font-extrabold text-ink-950">
              ₹{product.price?.toLocaleString("en-IN")}
            </p>
            {percent > 0 && (
              <p className="text-xs text-ink-400 line-through">
                ₹{original?.toLocaleString("en-IN")}
              </p>
            )}
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              inStock
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {inStock ? "In Stock" : "Sold Out"}
          </span>
        </div>

        {/* CTA — Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink-950 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-400 hover:text-ink-950 disabled:cursor-not-allowed disabled:bg-ink-200 disabled:text-ink-400"
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          {inStock ? "Add to Cart" : "Sold Out"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
