import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addToCart } from "../redux/features/cartSlice";
import { getSingleProduct } from "../services/productService";

const ProductDetails = () => {
  // GET ID FROM URL

  const { id } = useParams();

  // PRODUCT STATE

  const [product, setProduct] = useState(null);

  // LOADING STATE

  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      }),
    );

    console.log("Product Added 😎");
  };
  // INCREASE QUANTITY

  const increaseQuantityHandler = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // DECREASE QUANTITY

  const decreaseQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // FETCH SINGLE PRODUCT

  const fetchProduct = async () => {
    try {
      const data = await getSingleProduct(id);
      console.log("Product ID =", id);
      console.log("Product Data =", data);

      console.log(data);

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // RUN ON PAGE LOAD

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // LOADING UI

  if (loading) {
    return <h1 className="text-center text-3xl mt-10">Loading Product...</h1>;
  }
  if (!product) {
    return <h1 className="text-center text-3xl mt-10">Product Not Found 😔</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-3xl p-8">
        {/* IMAGE */}

        <div className="bg-gray-100 rounded-3xl flex items-center justify-center p-5">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[450px] object-contain rounded-2xl hover:scale-105 transition duration-300"
          />
        </div>

        {/* DETAILS */}

        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-5">{product.title}</h1>

          <p className="text-gray-600 text-lg mb-5">{product.description}</p>

          <h2 className="text-4xl font-bold text-black mb-5">
            ₹ {product.price}
          </h2>

          <p className="text-lg mb-3">
            Category:
            <span className="font-semibold ml-2">{product.category}</span>
          </p>

          <p className="text-lg mb-6">
            Stock:
            <span className="font-semibold ml-2">{product.stock}</span>
          </p>
          {/* QUANTITY SELECTOR */}

          <div className="flex items-center gap-5 mb-6">
            <button
              onClick={decreaseQuantityHandler}
              className="bg-gray-200 px-5 py-2 rounded-xl text-2xl font-bold"
            >
              -
            </button>

            <span className="text-2xl font-bold">{quantity}</span>

            <button
              onClick={increaseQuantityHandler}
              className="bg-black text-white px-5 py-2 rounded-xl text-2xl font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={addToCartHandler}
            className="bg-black text-white py-4 rounded-2xl text-lg hover:bg-gray-800 transition"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
