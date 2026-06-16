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

  const inputClass =
    "w-full rounded-2xl border border-ink-200 bg-ink-50/60 px-4 py-3.5 text-sm text-ink-950 outline-none transition placeholder:text-ink-400 focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/10";

  return (
    <div className="min-h-screen py-12 px-5 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* TITLE */}

        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
            Shipping Details
          </h1>
          <p className="mt-2 text-ink-500">
            Where should we deliver your order?
          </p>
        </div>

        {/* STEPS */}

        <div className="mb-10 flex items-center justify-center gap-2 sm:gap-4">
          {[
            { label: "Cart", done: true },
            { label: "Shipping", active: true },
            { label: "Payment" },
            { label: "Review" },
          ].map((step, i, arr) => (
            <div key={step.label} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold transition ${
                    step.done
                      ? "bg-emerald-500 text-white"
                      : step.active
                        ? "bg-ink-950 text-white"
                        : "bg-ink-100 text-ink-400"
                  }`}
                >
                  {step.done ? "✓" : i + 1}
                </span>
                <span
                  className={`hidden text-sm font-medium sm:inline ${
                    step.active || step.done ? "text-ink-950" : "text-ink-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <span
                  className={`h-px w-6 sm:w-10 ${
                    step.done ? "bg-emerald-500" : "bg-ink-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* FORM */}

        <form
          onSubmit={submitHandler}
          className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-9"
        >
          <h2 className="mb-6 font-display text-lg font-bold text-ink-950">
            Delivery information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">
                State
              </label>
              <input
                type="text"
                placeholder="State"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">
                Pincode
              </label>
              <input
                type="text"
                placeholder="000000"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium text-ink-700">
              Full Address
            </label>
            <textarea
              rows="4"
              placeholder="House no, street, landmark..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-950 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
          >
            Continue To Payment
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
