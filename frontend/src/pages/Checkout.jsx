import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { saveShippingAddress } from "../redux/features/shippingSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const shippingData = {
      fullName,
      phone,
      address,
      city,
      stateName,
      pincode,
    };

    dispatch(saveShippingAddress(shippingData));

    console.log("Shipping Saved 😎");

    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-12 px-5">
      {/* TITLE */}

      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-3">Shipping Details 🚚</h1>

        <p className="text-gray-600 text-lg">Enter your delivery information</p>
      </div>

      {/* STEPS */}

      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <div className="bg-green-500 text-white px-5 py-2 rounded-full font-semibold shadow">
          Cart ✓
        </div>

        <div className="bg-black text-white px-5 py-2 rounded-full font-semibold shadow">
          Shipping
        </div>

        <div className="bg-gray-300 px-5 py-2 rounded-full font-semibold">
          Payment
        </div>
      </div>

      {/* FORM */}

      <form
        onSubmit={submitHandler}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
          />

          <input
            type="text"
            placeholder="State"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
            className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
            className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
          />
        </div>

        <textarea
          rows="5"
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full mt-6 border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
        />

        <button
          type="submit"
          className="w-full mt-8 bg-black text-white py-4 rounded-2xl text-lg font-bold hover:bg-gray-800 transition"
        >
          Continue To Payment →
        </button>
      </form>
    </div>
  );
};

export default Checkout;
