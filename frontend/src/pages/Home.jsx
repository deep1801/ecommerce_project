import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";

import ProductCard from "../components/ProductCard";

import HeroSection from "../components/HeroSection";

const Home = () => {
  // PRODUCTS STATE

  const [products, setProducts] = useState([]);

  // SEARCH STATE

  const [search, setSearch] = useState("");

  // CATEGORY STATE

  const [category, setCategory] = useState("All");

  // SORT STATE

  const [sortOption, setSortOption] = useState("");

  // PAGINATION STATE

  const [visibleProducts, setVisibleProducts] = useState(4);

  // LOADING STATE

  const [loading, setLoading] = useState(true);

  // FILTER PRODUCTS

  const filteredProducts = products.filter((product) => {
    // SEARCH MATCH

    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // CATEGORY MATCH

    const matchesCategory = category === "All" || product.category === category;

    // FINAL RESULT

    return matchesSearch && matchesCategory;
  });

  // SORT PRODUCTS

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // LOW TO HIGH

    if (sortOption === "lowToHigh") {
      return a.price - b.price;
    }

    // HIGH TO LOW

    if (sortOption === "highToLow") {
      return b.price - a.price;
    }

    return 0;
  });

  // PAGINATION PRODUCTS

  const displayedProducts = sortedProducts.slice(0, visibleProducts);

  // FETCH PRODUCTS

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      console.log(data);

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // RUN ON PAGE LOAD

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ["All", "Mobile", "Laptop", "Accessories"];

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10">
      {/* HERO SECTION */}

      <HeroSection />

      {/* HEADING */}

      <div id="products" className="mb-8 scroll-mt-24 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
          Featured Collection
        </span>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-ink-950">
          Latest Products
        </h1>
        <p className="mt-3 text-ink-500">
          Handpicked premium products, updated daily.
        </p>
      </div>

      {/* TOOLBAR: search + sort */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-ink-200 bg-white py-3.5 pl-12 pr-4 text-sm shadow-soft outline-none transition focus:border-ink-950 focus:ring-4 focus:ring-ink-950/10"
          />
        </div>

        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-2xl border border-ink-200 bg-white py-3.5 pl-4 pr-11 text-sm font-medium shadow-soft outline-none transition focus:border-ink-950 sm:w-auto"
          >
            <option value="">Sort by: Featured</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>

      {/* CATEGORY PILLS */}

      <div className="mb-10 flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              category === cat
                ? "bg-ink-950 text-white shadow-soft"
                : "border border-ink-200 bg-white text-ink-600 hover:border-ink-950 hover:text-ink-950"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOADING — skeleton grid */}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft"
            >
              <div className="skeleton aspect-square w-full" />
              <div className="space-y-3 p-5">
                <div className="skeleton h-5 w-3/4 rounded-md" />
                <div className="skeleton h-4 w-full rounded-md" />
                <div className="skeleton h-4 w-2/3 rounded-md" />
                <div className="skeleton h-11 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* NO PRODUCTS — empty state */}

          {sortedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 bg-white py-20 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-ink-50">
                <svg
                  className="h-8 w-8 text-ink-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <h2 className="mt-5 font-display text-xl font-bold text-ink-950">
                No products found
              </h2>
              <p className="mt-2 max-w-sm text-sm text-ink-500">
                We couldn't find anything matching your search. Try a different
                keyword or category.
              </p>
            </div>
          ) : (
            <>
              {/* PRODUCTS GRID */}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedProducts.map((product, i) => (
                  <div
                    key={product._id}
                    className={`animate-fade-up stagger-${Math.min(i, 8)}`}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* LOAD MORE */}

              {visibleProducts < sortedProducts.length && (
                <div className="mt-14 flex flex-col items-center gap-3">
                  <p className="text-sm text-ink-400">
                    Showing {displayedProducts.length} of {sortedProducts.length}{" "}
                    products
                  </p>
                  <button
                    onClick={() => setVisibleProducts(visibleProducts + 4)}
                    className="rounded-2xl border border-ink-950 bg-white px-8 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-950 hover:text-white"
                  >
                    Load More Products
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
