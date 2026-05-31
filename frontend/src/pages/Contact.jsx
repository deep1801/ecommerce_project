const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-16 px-5">
      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}

        <div className="text-center mb-14">
          <h1 className="text-6xl font-extrabold mb-5">Contact Us 📞</h1>

          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Have questions, suggestions or business inquiries? We'd love to hear
            from you.
          </p>
        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-2 gap-10">
          {/* CONTACT FORM */}

          <div className="bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition">
            <h2 className="text-3xl font-bold mb-8">Send Message 🚀</h2>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition resize-none"
              />

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 hover:scale-[1.02] transition duration-300"
              >
                Send Message →
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-3">📍</div>

              <h3 className="text-2xl font-bold mb-2">Address</h3>

              <p className="text-gray-600">Lucknow, Uttar Pradesh, India</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-3">📞</div>

              <h3 className="text-2xl font-bold mb-2">Phone</h3>

              <p className="text-gray-600">+91 9876543210</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-3">📧</div>

              <h3 className="text-2xl font-bold mb-2">Email</h3>

              <p className="text-gray-600">support@shopeasy.com</p>
            </div>

            <div className="bg-black text-white rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">
              <h3 className="text-2xl font-bold mb-3">Customer Support</h3>

              <p className="text-gray-300">Available Monday - Saturday</p>

              <p className="text-yellow-400 font-bold mt-3">
                9:00 AM - 8:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
