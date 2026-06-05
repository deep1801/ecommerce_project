import { useEffect, useState } from "react";
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
      const productData = {
        title,
        description: "Demo Description",
        price: Number(price),
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        category: "Demo Category",
        stock: 10,
      };

      console.log(productData);

      let data;

      if (selectedProduct) {
        data = await updateProduct(selectedProduct._id, productData);

        console.log("Product Updated 😎");
      } else {
        data = await createProduct(productData);

        console.log("Product Created 😎");
      }

      console.log(data);

      await fetchProducts();

      setTitle("");
      setPrice("");

      setSelectedProduct(null);
    } catch (error) {
      console.log(error);
    }
  };
  const editHandler = (product) => {
    console.log(product);
    setSelectedProduct(product);

    setTitle(product.title);

    setPrice(product.price);
  };
  const deleteHandler = async (id) => {
    try {
      const data = await deleteProduct(id);

      console.log(data);

      await fetchProducts();

      console.log("Product Deleted 😎");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}

      {/* Form */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Manage Products 📦</h1>
          <p className="text-gray-500 mt-2">
            Total Products: {products.length}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
        >
          Open Modal
        </button>
      </div>
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedProduct ? "Update Product ✏️" : "Add Product 🚀"}
        </h2>

        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 rounded-xl flex-1 min-w-[250px]"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-3 rounded-xl flex-1 min-w-[250px]"
          />

          <button
            onClick={submitHandler}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
          >
            {selectedProduct ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
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
                  onClick={() => deleteHandler(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                >
                  Delete
                </button>

                <button onClick={() => setShowModal(true)}>Open Modal</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
