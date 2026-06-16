import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const goToProduct = () => navigate(`/products/${product._id}`);

  // Reflect real stock data (UI display only)
  const inStock = product.stock === undefined || product.stock > 0;
  const lowStock = product.stock !== undefined && product.stock > 0 && product.stock <= 5;

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
      </div>

      {/* DETAILS */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-1 font-display text-lg font-bold text-ink-950">
          {product.title}
        </h2>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-xs text-ink-400">Price</span>
            <p className="font-display text-2xl font-extrabold text-ink-950">
              ₹{product.price?.toLocaleString("en-IN")}
            </p>
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

        {/* CTA */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToProduct();
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink-950 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-400 hover:text-ink-950"
        >
          View Product
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
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
};

export default ProductCard;
