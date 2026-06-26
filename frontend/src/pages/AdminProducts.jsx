import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import AdminLayout from "../components/admin/AdminLayout";

const AdminProducts = () => {
  console.log("AdminProducts Rendered");
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      console.log(data);

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler = async () => {
    try {
      setLoading(true);

      const productData = {
        title,
        description: "Demo Description",
        price: Number(price),
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        category: "Demo Category",
        stock: 10,
      };

      let data;

      if (selectedProduct) {
        data = await updateProduct(selectedProduct._id, productData);

        toast.success("Product updated Successfully");
      } else {
        data = await createProduct(productData);
        toast.success("Product Created Successfully");
      }

      console.log(data);

      await fetchProducts();

      setTitle("");
      setPrice("");
      setSelectedProduct(null);

      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  const editHandler = (product) => {
    setSelectedProduct(product);
    setTitle(product.title);
    setPrice(product.price);

    setShowModal(true);
  };
  const deleteHandler = async (id) => {
    try {
      const data = await deleteProduct(id);

      console.log(data);

      await fetchProducts();
      toast.success("Product Deleted Successfully");
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPrice = products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  const averagePrice =
    products.length > 0 ? Math.floor(totalPrice / products.length) : 0;
  console.log("Total Price =", totalPrice);
  console.log("Average Price =", averagePrice);

  const stockBadge = (stock) => {
    if (stock === undefined) return "bg-ink-50 text-ink-500";
    if (stock <= 0) return "bg-red-50 text-red-600";
    if (stock <= 5) return "bg-amber-50 text-amber-600";
    return "bg-emerald-50 text-emerald-600";
  };

  const stockLabel = (stock) => {
    if (stock === undefined) return "—";
    if (stock <= 0) return "Out of stock";
    if (stock <= 5) return `Low · ${stock}`;
    return `In stock · ${stock}`;
  };

  return (
    <AdminLayout
      title="Products"
      subtitle="Create, edit and manage your catalog"
    >
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-950">
            Manage Products
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedProduct(null);
            setTitle("");
            setPrice("");
            setShowModal(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Product
        </button>
      </div>

      {/* STATS */}
      <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Products",
            value: products.length,
            accent: "text-ink-950",
            chip: "bg-ink-950 text-brand-400",
            icon: "M20.25 7.5 12 3 3.75 7.5m16.5 0L12 12m8.25-4.5v9L12 21m0-9L3.75 7.5M12 12v9m0-9L3.75 7.5",
          },
          {
            label: "Search Results",
            value: filteredProducts.length,
            accent: "text-ink-950",
            chip: "bg-brand-100 text-brand-600",
            icon: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
          },
          {
            label: "Average Price",
            value: `₹${averagePrice.toLocaleString("en-IN")}`,
            accent: "text-ink-950",
            chip: "bg-indigo-50 text-indigo-600",
            icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
          },
          {
            label: "Inventory Value",
            value: `₹${totalPrice.toLocaleString("en-IN")}`,
            accent: "text-emerald-600",
            chip: "bg-emerald-50 text-emerald-600",
            icon: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-ink-50/70 blur-2xl transition-opacity duration-300 group-hover:opacity-0" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-ink-500">{s.label}</p>
                <h2
                  className={`mt-1.5 font-display text-3xl font-extrabold ${s.accent}`}
                >
                  {s.value}
                </h2>
              </div>
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${s.chip} transition-transform duration-300 group-hover:scale-110`}
              >
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
                    d={s.icon}
                  />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH */}
      <div className="relative mb-6">
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
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-ink-200 bg-white py-3.5 pl-12 pr-12 text-sm shadow-soft outline-none transition focus:border-ink-950 focus:ring-4 focus:ring-ink-950/10"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-ink-400 transition hover:bg-ink-50 hover:text-ink-950"
          >
            <svg
              className="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-lift animate-scale-in">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-ink-950">
                {selectedProduct ? "Update Product" : "Add Product"}
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedProduct(null);
                  setTitle("");
                  setPrice("");
                }}
                className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 transition hover:bg-ink-50 hover:text-ink-950"
                aria-label="Close"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
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

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">
                  Product Title
                </label>
                <input
                  type="text"
                  placeholder="Enter product title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-3 text-sm outline-none transition focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-3 text-sm outline-none transition focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/10"
                />
              </div>

              <button
                onClick={submitHandler}
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-ink-950 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </>
                ) : selectedProduct ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-lift animate-scale-in">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-ink-950">
              Delete product?
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              This action cannot be undone. The product will be permanently
              removed.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="flex-1 rounded-xl border border-ink-200 py-3 text-sm font-semibold text-ink-950 transition hover:bg-ink-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  console.log("DELETE ID =", deleteId);

                  if (!deleteId) {
                    toast.error("Delete Id Missing");
                    return;
                  }

                  await deleteHandler(deleteId);

                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DATA TABLE */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white py-20 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-ink-50 text-ink-400">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5 12 3 3.75 7.5m16.5 0L12 12m8.25-4.5v9L12 21m0-9L3.75 7.5M12 12v9m0-9L3.75 7.5"
              />
            </svg>
          </div>
          <h2 className="mt-5 font-display text-xl font-bold text-ink-950">
            No products found
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            Try searching with another keyword or add a new product.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-ink-100 bg-ink-50/60 text-xs font-semibold uppercase tracking-wider text-ink-500">
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, i) => (
                  <tr
                    key={product._id}
                    className={`group animate-fade-up stagger-${Math.min(
                      i,
                      8,
                    )} border-b border-ink-50 transition-colors last:border-0 hover:bg-brand-50/40`}
                  >
                    {/* PRODUCT */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50 ring-1 ring-transparent transition group-hover:ring-brand-300">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-1 font-semibold text-ink-950 transition-colors group-hover:text-brand-600">
                            {product.title}
                          </p>
                          <p className="line-clamp-1 text-xs text-ink-400">
                            ID: {product._id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-700">
                        {product.category || "—"}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td className="px-5 py-4">
                      <span className="font-display text-base font-bold text-ink-950">
                        ₹{product.price?.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* STOCK */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${stockBadge(
                          product.stock,
                        )}`}
                      >
                        {stockLabel(product.stock)}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => editHandler(product)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-sm font-semibold text-ink-950 transition hover:bg-ink-950 hover:text-white"
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
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                            />
                          </svg>
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            console.log("SELECTED PRODUCT ID =", product._id);

                            setDeleteId(product._id);

                            setShowDeleteModal(true);
                          }}
                          className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                          aria-label="Delete product"
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
