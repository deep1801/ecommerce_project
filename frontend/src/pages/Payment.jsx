import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { savePaymentMethod } from "../redux/features/paymentSlice";

const Payment = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("Saving Payment =>", paymentMethod);

    dispatch(savePaymentMethod(paymentMethod));

    navigate("/order-review");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-12 px-5">
      {/* HEADING */}

      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-3">Payment Method 💳</h1>

        <p className="text-gray-600 text-lg">
          Choose your preferred payment option
        </p>
      </div>

      {/* STEPS */}

      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <div className="bg-green-500 text-white px-5 py-2 rounded-full font-semibold">
          Cart ✓
        </div>

        <div className="bg-green-500 text-white px-5 py-2 rounded-full font-semibold">
          Shipping ✓
        </div>

        <div className="bg-black text-white px-5 py-2 rounded-full font-semibold">
          Payment
        </div>
      </div>

      {/* CARD */}

      <form
        onSubmit={submitHandler}
        className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-10"
      >
        <h2 className="text-3xl font-bold mb-8">Select Payment Method</h2>

        {/* COD */}

        <label className="flex items-center gap-4 border-2 p-5 rounded-2xl cursor-pointer mb-5 hover:border-black transition">
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <div>
            <h3 className="font-bold text-xl">Cash On Delivery</h3>

            <p className="text-gray-500">Pay when your order arrives</p>
          </div>
        </label>

        {/* UPI */}

        <label className="flex items-center gap-4 border-2 p-5 rounded-2xl cursor-pointer mb-5 hover:border-black transition">
          <input
            type="radio"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <div>
            <h3 className="font-bold text-xl">UPI Payment</h3>

            <p className="text-gray-500">Google Pay, PhonePe, Paytm</p>
          </div>
        </label>

        {/* CARD */}

        <label className="flex items-center gap-4 border-2 p-5 rounded-2xl cursor-pointer mb-8 hover:border-black transition">
          <input
            type="radio"
            value="CARD"
            checked={paymentMethod === "CARD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <div>
            <h3 className="font-bold text-xl">Credit / Debit Card</h3>

            <p className="text-gray-500">Visa, MasterCard, RuPay</p>
          </div>
        </label>

        <button
          type="submit"
          className="w-full bg-black text-white py-4 rounded-2xl text-lg font-bold hover:bg-gray-800 transition"
        >
          Continue To Review →
        </button>
      </form>
    </div>
  );
};

export default Payment;
