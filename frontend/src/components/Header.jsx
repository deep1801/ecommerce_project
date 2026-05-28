import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  // TOKEN

  const token = localStorage.getItem("token");

  // LOGOUT

  const logoutHandler = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}

        <Link to="/" className="text-3xl font-extrabold tracking-wide">
          ShopEasy 😎
        </Link>

        {/* NAV LINKS */}

        <nav className="flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link
            to="/cart"
            className="hover:text-yellow-400 transition relative"
          >
            Cart
            <span className="ml-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
              {cartItems.length}
            </span>
          </Link>

          <Link to="/about" className="hover:text-yellow-400 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-yellow-400 transition">
            Contact
          </Link>

          {token ? (
            <>
              <Link
                to="/profile"
                className="bg-white text-black px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Profile
              </Link>

              <button
                onClick={logoutHandler}
                className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400 transition">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
