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

  const options = [
    {
      value: "COD",
      title: "Cash On Delivery",
      sub: "Pay when your order arrives",
      icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
    },
    {
      value: "UPI",
      title: "UPI Payment",
      sub: "Google Pay, PhonePe, Paytm",
      icon: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
    },
    {
      value: "CARD",
      title: "Credit / Debit Card",
      sub: "Visa, MasterCard, RuPay",
      icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-5 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* HEADING */}

        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
            Payment Method
          </h1>
          <p className="mt-2 text-ink-500">Choose how you'd like to pay</p>
        </div>

        {/* STEPS */}

        <div className="mb-10 flex items-center justify-center gap-2 sm:gap-4">
          {[
            { label: "Cart", done: true },
            { label: "Shipping", done: true },
            { label: "Payment", active: true },
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

        {/* CARD */}

        <form
          onSubmit={submitHandler}
          className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-9"
        >
          <h2 className="mb-6 font-display text-lg font-bold text-ink-950">
            Select payment method
          </h2>

          <div className="space-y-3">
            {options.map((opt) => {
              const selected = paymentMethod === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all ${
                    selected
                      ? "border-ink-950 bg-ink-50/60 shadow-soft"
                      : "border-ink-100 hover:border-ink-300"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition ${
                      selected
                        ? "bg-ink-950 text-white"
                        : "bg-ink-50 text-ink-500"
                    }`}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.6}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={opt.icon}
                      />
                    </svg>
                  </span>

                  <div className="flex-1">
                    <h3 className="font-semibold text-ink-950">{opt.title}</h3>
                    <p className="text-sm text-ink-500">{opt.sub}</p>
                  </div>

                  <input
                    type="radio"
                    value={opt.value}
                    checked={selected}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full border-2 transition ${
                      selected ? "border-ink-950" : "border-ink-300"
                    }`}
                  >
                    {selected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-ink-950" />
                    )}
                  </span>
                </label>
              );
            })}
          </div>

          <button
            type="submit"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-950 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
          >
            Continue To Review
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

export default Payment;
