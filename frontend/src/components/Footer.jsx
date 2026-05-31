import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* LOGO SECTION */}

          <div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">
              ShopEasy 😎
            </h2>

            <p className="text-gray-400 leading-7">
              Modern Ecommerce Platform built with React, Redux Toolkit, Node.js
              and MongoDB.
            </p>
          </div>

          {/* QUICK LINKS */}

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}

          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  Mobiles
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  Laptops
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  Accessories
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  Gaming
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}

          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 rounded-xl text-black border-2 border-transparent focus:border-yellow-400 outline-none transition"
            />

            <button className="mt-3 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 hover:scale-105 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* DIVIDER */}

        <hr className="my-8 border-gray-700" />

        {/* COPYRIGHT */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">© 2026 ShopEasy. All Rights Reserved.</p>

          <div className="flex gap-5">
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-400 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-yellow-400 transition"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-yellow-400 transition"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
