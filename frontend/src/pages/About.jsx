const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-16 px-5">
      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}

        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold mb-6">About ShopEasy 🚀</h1>

          <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-9">
            ShopEasy is a modern ecommerce platform designed to provide seamless
            shopping experiences with secure payments, fast delivery and premium
            quality products.
          </p>
        </div>

        {/* FEATURES */}

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition duration-300">
            <div className="text-5xl mb-5">⚡</div>

            <h2 className="text-2xl font-bold mb-4">Fast Delivery</h2>

            <p className="text-gray-600 leading-7">
              Lightning-fast delivery network ensuring your products reach you
              quickly and safely.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition duration-300">
            <div className="text-5xl mb-5">🔒</div>

            <h2 className="text-2xl font-bold mb-4">Secure Payments</h2>

            <p className="text-gray-600 leading-7">
              Multiple secure payment options with complete transaction
              protection.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition duration-300">
            <div className="text-5xl mb-5">⭐</div>

            <h2 className="text-2xl font-bold mb-4">Premium Quality</h2>

            <p className="text-gray-600 leading-7">
              Carefully selected products with high quality standards and
              customer satisfaction.
            </p>
          </div>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-black text-white rounded-3xl p-8 text-center hover:scale-105 transition">
            <h2 className="text-4xl font-bold mb-2">10K+</h2>
            <p>Customers</p>
          </div>

          <div className="bg-black text-white rounded-3xl p-8 text-center hover:scale-105 transition">
            <h2 className="text-4xl font-bold mb-2">5K+</h2>
            <p>Orders</p>
          </div>

          <div className="bg-black text-white rounded-3xl p-8 text-center hover:scale-105 transition">
            <h2 className="text-4xl font-bold mb-2">500+</h2>
            <p>Products</p>
          </div>

          <div className="bg-black text-white rounded-3xl p-8 text-center hover:scale-105 transition">
            <h2 className="text-4xl font-bold mb-2">99%</h2>
            <p>Happy Customers</p>
          </div>
        </div>

        {/* MISSION & VISION */}

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition">
            <h2 className="text-3xl font-bold mb-5">🎯 Our Mission</h2>

            <p className="text-gray-600 leading-8">
              Our mission is to simplify online shopping by providing a secure,
              reliable and user-friendly platform where customers can find
              everything they need.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition">
            <h2 className="text-3xl font-bold mb-5">🌍 Our Vision</h2>

            <p className="text-gray-600 leading-8">
              To become one of the most trusted ecommerce brands by delivering
              exceptional customer experiences and innovative shopping
              solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
