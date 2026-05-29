import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* IMAGE SECTION */}

      <div className="bg-gray-100 overflow-hidden relative">
        {/* CATEGORY BADGE */}

        <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
          {product.category}
        </span>

        {/* PRODUCT IMAGE */}

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain p-4 group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* DETAILS */}

      <div className="p-5">
        {/* TITLE */}

        <h2 className="text-2xl font-bold mb-2 line-clamp-1">
          {product.title}
        </h2>

        {/* DESCRIPTION */}

        <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        {/* PRICE + STOCK */}

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-black">
            ₹ {product.price}
          </span>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            In Stock
          </span>
        </div>

        {/* BUTTON */}

        <button
          onClick={() => navigate(`/products/${product._id}`)}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 font-semibold"
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
