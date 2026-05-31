import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-extrabold mb-10">Admin Dashboard 🛠️</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* PRODUCTS */}

        <Link
          to="/admin/products"
          className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition block"
        >
          <h2 className="text-gray-500 mb-2">Total Products</h2>

          <h1 className="text-4xl font-bold">5</h1>

          <p className="mt-4 text-blue-600 font-semibold">Manage Products →</p>
        </Link>

        {/* ORDERS */}

        <div className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition">
          <h2 className="text-gray-500 mb-2">Total Orders</h2>

          <h1 className="text-4xl font-bold">12</h1>
        </div>

        {/* REVENUE */}

        <div className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition">
          <h2 className="text-gray-500 mb-2">Total Revenue</h2>

          <h1 className="text-4xl font-bold text-green-600">₹ 8,40,000</h1>
        </div>

        {/* USERS */}

        <div className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition">
          <h2 className="text-gray-500 mb-2">Total Users</h2>

          <h1 className="text-4xl font-bold">25</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
