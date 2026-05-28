import { useSelector, useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/features/cartSlice";

const Cart = () => {
  // GET CART DATA FROM REDUX

  const { cartItems } = useSelector((state) => state.cart);

  // DISPATCH FUNCTION

  const dispatch = useDispatch();

  // TOTAL PRICE CALCULATION

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  console.log(cartItems);

  return (
    <div className="max-w-6xl mx-auto p-5">
      {/* PAGE TITLE */}

      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2 className="text-2xl text-gray-600">Cart is Empty</h2>
      ) : (
        <>
          {/* CART ITEMS */}

          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-lg rounded-2xl p-5"
              >
                {/* IMAGE */}

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-40 h-40 object-contain rounded-xl bg-gray-100 p-3"
                />

                {/* DETAILS */}

                <div className="flex-1 w-full">
                  <h2 className="text-2xl font-bold">{item.title}</h2>

                  <p className="text-gray-600 mt-2">{item.description}</p>

                  <h3 className="text-2xl font-semibold mt-3">
                    ₹ {item.price}
                  </h3>

                  {/* QUANTITY SECTION */}

                  <div className="flex items-center gap-4 mt-5">
                    {/* DECREASE BUTTON */}

                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-xl font-bold transition"
                    >
                      -
                    </button>

                    {/* QUANTITY */}

                    <span className="text-xl font-semibold">
                      {item.quantity}
                    </span>

                    {/* INCREASE BUTTON */}

                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-xl font-bold transition"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE BUTTON */}

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="mt-5 bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CART SUMMARY */}

          <div className="bg-white shadow-xl rounded-2xl p-6 mt-10">
            <h2 className="text-3xl font-bold mb-5">Cart Summary</h2>

            <div className="flex justify-between items-center text-2xl font-semibold border-t pt-4">
              <span>Total Price:</span>

              <span className="text-green-600">₹ {totalPrice}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
