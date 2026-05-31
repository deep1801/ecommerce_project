import { useSelector } from "react-redux";

const AdminProducts = () => {
  const { products } = useSelector((state) => state.product);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-extrabold">Manage Products 📦</h1>

          <p className="text-gray-500 mt-2">
            Total Products: {products.length}
          </p>
        </div>

        <button className="bg-black text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition">
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
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                </td>

                <td className="p-5 font-semibold">{product.title}</td>

                <td className="p-5">₹ {product.price}</td>

                <td className="p-5">{product.stock}</td>

                <td className="p-5 text-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-xl mr-3 hover:bg-blue-600 transition">
                    Edit
                  </button>

                  <button className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition">
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
    </div>
  );
};

export default AdminProducts;
