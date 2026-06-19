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

  // TRENDING — top priced products as a quick "trending" highlight (UI only)

  const trendingProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 4);

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

  // Visual cards for the categories section
  const categoryCards = [
    {
      name: "Mobile",
      tagline: "Latest smartphones",
      icon: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
      grad: "from-sky-500/15 to-blue-500/5",
      ring: "group-hover:border-sky-300",
    },
    {
      name: "Laptop",
      tagline: "Work & play",
      icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h17.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125H3.375A1.125 1.125 0 0 1 2.25 16.875v-9.75ZM1.5 19.5h21",
      grad: "from-violet-500/15 to-purple-500/5",
      ring: "group-hover:border-violet-300",
    },
    {
      name: "Accessories",
      tagline: "Complete your kit",
      icon: "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25",
      grad: "from-emerald-500/15 to-teal-500/5",
      ring: "group-hover:border-emerald-300",
    },
    {
      name: "All",
      tagline: "Browse everything",
      icon: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25Zm9.75-9.75A2.25 2.25 0 0 1 15.75 3.75H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
      grad: "from-brand-500/15 to-amber-500/5",
      ring: "group-hover:border-brand-300",
    },
  ];

  const scrollToProducts = (cat) => {
    setCategory(cat);
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10">
      {/* HERO SECTION */}

      <HeroSection />

      {/* PERKS STRIP */}

      <div className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            title: "Free Shipping",
            sub: "On all orders",
            d: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
          },
          {
            title: "Secure Payment",
            sub: "100% protected",
            d: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.285Z",
          },
          {
            title: "Easy Returns",
            sub: "7-day policy",
            d: "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3",
          },
          {
            title: "24/7 Support",
            sub: "Always here",
            d: "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
          },
        ].map((perk) => (
          <div
            key={perk.title}
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
                <path strokeLinecap="round" strokeLinejoin="round" d={perk.d} />
              </svg>
            </span>
            <div>
              <p className="text-sm font-bold text-ink-950">{perk.title}</p>
              <p className="text-xs text-ink-500">{perk.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CATEGORIES SECTION */}

      <section id="categories" className="mb-16 scroll-mt-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Shop by Category
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-ink-950">
              Browse Categories
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categoryCards.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => scrollToProducts(cat.name)}
              className={`group animate-fade-up stagger-${i} relative flex flex-col items-start overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${cat.ring}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cat.grad} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-ink-50 text-ink-950 transition-colors duration-300 group-hover:bg-ink-950 group-hover:text-brand-400">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={cat.icon}
                  />
                </svg>
              </span>
              <h3 className="relative mt-5 font-display text-lg font-bold text-ink-950">
                {cat.name}
              </h3>
              <p className="relative mt-1 text-sm text-ink-500">{cat.tagline}</p>
              <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink-950">
                Shop now
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* HEADING */}

      <div id="products" className="mb-8 scroll-mt-24 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
          Featured Collection
        </span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-ink-950">
          Featured Products
        </h2>
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

      {/* TRENDING SECTION */}

      {!loading && trendingProducts.length > 0 && (
        <section id="trending" className="mt-20 scroll-mt-24">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-brand-600">
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
                    d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                  />
                </svg>
                Hot Right Now
              </span>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-ink-950">
                Trending Products
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trendingProducts.map((product, i) => (
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

export default Home;
