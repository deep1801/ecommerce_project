import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../redux/features/orderSlice";

const OrderReview = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const { shippingAddress } = useSelector((state) => state.shipping);

  const { paymentMethod } = useSelector((state) => state.payment);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const placeOrderHandler = () => {
    const orderData = {
      orderItems: cartItems,

      shippingAddress,

      paymentMethod,

      totalPrice,

      status: "Pending",

      orderId: Date.now(),
    };

    dispatch(createOrder(orderData));

    console.log("Order Created 😎");

    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        {/* PAGE TITLE */}

        <h1 className="text-5xl font-extrabold text-center mb-10">
          Review Your Order 📦
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SECTION */}

          <div className="lg:col-span-2 space-y-6">
            {/* SHIPPING CARD */}

            <div className="bg-white shadow-xl rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4">📍 Shipping Address</h2>

              <p>
                <strong>Name:</strong> {shippingAddress.fullName}
              </p>
              <p>
                <strong>Phone:</strong> {shippingAddress.phone}
              </p>
              <p>
                <strong>Address:</strong> {shippingAddress.address}
              </p>
              <p>
                <strong>City:</strong> {shippingAddress.city}
              </p>
              <p>
                <strong>State:</strong> {shippingAddress.stateName}
              </p>
              <p>
                <strong>Pincode:</strong> {shippingAddress.pincode}
              </p>
            </div>

            {/* PAYMENT CARD */}

            <div className="bg-white shadow-xl rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4">💳 Payment Method</h2>

              <p className="text-lg font-semibold">{paymentMethod}</p>
            </div>

            {/* PRODUCTS CARD */}

            <div className="bg-white shadow-xl rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-5">🛒 Order Items</h2>

              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-5 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain bg-gray-100 rounded-xl p-2"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.title}</h3>

                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>

                    <h3 className="font-bold text-lg">
                      ₹ {item.price * item.quantity}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}

          <div>
            <div className="bg-white shadow-2xl rounded-3xl p-6 sticky top-5">
              <h2 className="text-3xl font-bold mb-6">Order Summary</h2>

              <div className="flex justify-between mb-4">
                <span>Items</span>

                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Shipping</span>

                <span className="text-green-600">Free</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>

                <span className="text-green-600">₹ {totalPrice}</span>
              </div>

              <button
                onClick={placeOrderHandler}
                className="w-full mt-8 bg-black text-white py-4 rounded-2xl text-lg font-bold hover:bg-gray-800 transition"
              >
                Place Order 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
