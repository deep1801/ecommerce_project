import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

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
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}

      <p className="text-gray-500 mt-3 text-lg">
        Showing {filteredProducts.length} Products
      </p>
      <div className="grid md:grid-cols-3 gap-5 mt-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h3 className="text-gray-500 text-lg">Total Products</h3>

          <h2 className="text-4xl font-bold mt-2">{products.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h3 className="text-gray-500 text-lg">Total Inventory Value</h3>

          <h2 className="text-4xl font-bold mt-2">₹ {totalPrice}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h3 className="text-gray-500 text-lg">Average Price</h3>

          <h2 className="text-4xl font-bold mt-2">₹ {averagePrice}</h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Manage Products 📦</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <p className="text-gray-500">Total Products</p>
                <h2 className="text-4xl font-bold mt-2">{products.length}</h2>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <p className="text-gray-500">Search Results</p>
                <h2 className="text-4xl font-bold mt-2">
                  {filteredProducts.length}
                </h2>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <p className="text-gray-500">Average Price</p>
                <h2 className="text-4xl font-bold mt-2">₹{averagePrice}</h2>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <p className="text-gray-500">Total Value</p>
                <h2 className="text-4xl font-bold mt-2">₹{totalPrice}</h2>
              </div>
            </div>

            <p className="text-gray-500 mt-2">
              Manage all your ecommerce products
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedProduct(null);
              setTitle("");
              setPrice("");
              setShowModal(true);
            }}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all"
          >
            + Add Product
          </button>
        </div>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 border rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl w-[500px] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedProduct ? "Update Product ✏️" : "Add Product 🚀"}
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedProduct(null);
                  setTitle("");
                  setPrice("");
                }}
                className="text-red-500 text-xl font-bold"
              >
                X
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Product Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-3 rounded-xl"
              />

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-3 rounded-xl"
              />
              <button
                onClick={submitHandler}
                disabled={loading}
                className="bg-black text-white py-3 rounded-xl"
              >
                {loading
                  ? "Saving..."
                  : selectedProduct
                    ? "Update Product"
                    : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Cards */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl w-[400px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Confirm Delete ⚠️</h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="flex-1 bg-gray-300 py-3 rounded-xl hover:bg-gray-400 transition-all"
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
                className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
              >
                Yes Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {filteredProducts.length === 0 && (
        <div className="bg-white p-10 rounded-3xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-red-500">
            No Products Found 😔
          </h2>

          <p className="text-gray-500 mt-3">
            Try searching with another keyword.
          </p>
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold">{product.title}</h2>

              <p className="text-2xl font-semibold mt-2">₹ {product.price}</p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => editHandler(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    console.log("SELECTED PRODUCT ID =", product._id);

                    setDeleteId(product._id);

                    setShowDeleteModal(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
