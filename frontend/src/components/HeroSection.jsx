const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-3xl px-10 py-20 mb-16 shadow-2xl">
      <div className="max-w-4xl">
        <h1 className="text-6xl font-extrabold leading-tight mb-6">
          Discover The Best <br />
          Products For You 😎
        </h1>

        <p className="text-gray-300 text-xl mb-8">
          Shop premium mobiles, laptops, accessories and much more with amazing
          deals.
        </p>

        <button className="bg-yellow-400 text-black px-8 py-4 rounded-2xl text-lg font-bold hover:bg-yellow-300 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
