import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const { orders } = useSelector((state) => state.order);

  const latestOrder = orders[orders.length - 1];

  if (!latestOrder) {
    return <h1 className="text-center text-3xl mt-20">No Order Found</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-2xl w-full text-center">
        <div className="text-7xl mb-5">✅</div>

        <h1 className="text-4xl font-extrabold mb-4 text-green-600">
          Order Placed Successfully
        </h1>

        <p className="text-gray-500 mb-8">Thank you for shopping with us.</p>

        <div className="bg-gray-100 rounded-2xl p-6 text-left space-y-3">
          <p>
            <strong>Order ID:</strong> {latestOrder.orderId}
          </p>

          <p>
            <strong>Payment:</strong> {latestOrder.paymentMethod}
          </p>

          <p>
            <strong>Status:</strong> {latestOrder.status}
          </p>

          <p>
            <strong>Total:</strong> ₹{latestOrder.totalPrice}
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/my-orders"
            className="flex-1 border border-black py-4 rounded-2xl font-bold hover:bg-gray-100 transition text-center"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
