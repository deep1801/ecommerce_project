import { useSelector } from "react-redux";

const MyOrders = () => {
  const { orders } = useSelector((state) => state.order);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-10">My Orders 📦</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-3">No Orders Yet</h2>

            <p className="text-gray-500">
              Start shopping and place your first order.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white shadow-xl rounded-3xl p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Order #{order.orderId}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Payment: {order.paymentMethod}
                    </p>
                  </div>

                  <div>
                    <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                      {order.status}
                    </span>
                  </div>
                </div>

                <hr className="my-5" />

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500">Total Amount</p>

                    <h3 className="text-3xl font-bold text-green-600">
                      ₹ {order.totalPrice}
                    </h3>
                  </div>

                  <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
