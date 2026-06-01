import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../redux/features/productSlice";

const AdminProducts = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
    console.log("Product Deleted 😎");
  };

  const editHandler = (product) => {
    setSelectedProduct(product);

    setTitle(product.title);

    setPrice(product.price);

    setStock(product.stock);

    setCategory(product.category || "");

    setImage(product.image || "");

    setDescription(product.description || "");

    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const submitHandler = () => {
    const productData = {
      _id: selectedProduct ? selectedProduct._id : Date.now().toString(),

      title,
      price: Number(price),
      stock: Number(stock),
      category,
      image,
      description,
    };

    if (selectedProduct) {
      dispatch(updateProduct(productData));
      console.log("Product Updated 😎");
    } else {
      dispatch(addProduct(productData));
      console.log("Product Added 😎");
    }

    setShowModal(false);

    setTitle("");
    setPrice("");
    setStock("");
    setCategory("");
    setImage("");
    setDescription("");

    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-5 mb-8">
        <div>
          <h1 className="text-5xl font-extrabold">Manage Products 📦</h1>

          <p className="text-gray-500 mt-2 text-lg">
            Total Products: {products.length}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 hover:bg-gray-800 transition-all"
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-5 text-left">Image</th>
              <th className="p-5 text-left">Product</th>
              <th className="p-5 text-left">Price</th>
              <th className="p-5 text-left">Stock</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-5">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-2xl shadow-md"
                  />
                </td>

                <td className="p-5 font-semibold">{product.title}</td>

                <td className="p-5">₹ {product.price}</td>

                <td className="p-5">{product.stock}</td>

                <td className="p-5 text-center">
                  <button
                    onClick={() => editHandler(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl mr-3 hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteHandler(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No Products Found
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                {selectedProduct ? "Edit Product ✏️" : "Add New Product 📦"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-3xl font-bold hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
                />
              </div>

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition resize-none"
              />

              <button
                onClick={submitHandler}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-800 hover:scale-[1.02] transition-all"
              >
                {selectedProduct ? "Save Changes ✅" : "Add Product 🚀"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
