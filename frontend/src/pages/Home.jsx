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

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* HERO SECTION */}

      <HeroSection />

      {/* HEADING */}

      <h1 className="text-5xl font-extrabold text-center mb-12">
        Latest Products 🔥
      </h1>

      {/* SEARCH INPUT */}

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl border-2 border-gray-200 focus:border-black outline-none px-6 py-4 rounded-2xl shadow-sm text-lg"
        />
      </div>

      {/* SORT DROPDOWN */}

      <div className="flex justify-end mb-10">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border-2 border-gray-200 px-5 py-3 rounded-2xl outline-none focus:border-black"
        >
          <option value="">Sort By</option>

          <option value="lowToHigh">Price: Low to High</option>

          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* CATEGORY BUTTONS */}

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setCategory("All")}
          className={`px-6 py-3 rounded-2xl font-semibold transition ${
            category === "All"
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setCategory("Mobile")}
          className={`px-6 py-3 rounded-2xl font-semibold transition ${
            category === "Mobile"
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Mobile
        </button>

        <button
          onClick={() => setCategory("Laptop")}
          className={`px-6 py-3 rounded-2xl font-semibold transition ${
            category === "Laptop"
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Laptop
        </button>

        <button
          onClick={() => setCategory("Accessories")}
          className={`px-6 py-3 rounded-2xl font-semibold transition ${
            category === "Accessories"
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Accessories
        </button>
      </div>

      {/* LOADING */}

      {loading ? (
        <h2 className="text-center text-2xl font-semibold">
          Loading Products...
        </h2>
      ) : (
        <>
          {/* NO PRODUCTS */}

          {sortedProducts.length === 0 ? (
            <h2 className="text-center text-2xl font-semibold text-red-500">
              No Products Found 😢
            </h2>
          ) : (
            <>
              {/* PRODUCTS GRID */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {displayedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* LOAD MORE */}

              {visibleProducts < sortedProducts.length && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setVisibleProducts(visibleProducts + 4)}
                    className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 transition"
                  >
                    Load More 😎
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
