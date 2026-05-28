import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";

import { useNavigate } from "react-router-dom";

const Home = () => {
  // NAVIGATE

  const navigate = useNavigate();

  // PRODUCTS STATE

  const [products, setProducts] = useState([]);

  // LOADING STATE

  const [loading, setLoading] = useState(true);

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
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Products</h1>

      {loading ? (
        <h2 className="text-center text-2xl">Loading...</h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-2xl p-5"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />

              <h2 className="text-2xl font-bold">{product.title}</h2>

              <p className="text-gray-600 mt-2">{product.description}</p>

              <p className="text-xl font-semibold mt-3">₹ {product.price}</p>

              <button
                onClick={() => navigate(`/products/${product._id}`)}
                className="mt-4 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
