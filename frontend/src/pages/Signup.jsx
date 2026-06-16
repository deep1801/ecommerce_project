import { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "../components/InputField";

import { signupUser } from "../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // SUBMIT FUNCTION

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signupUser(formData);

      console.log(data);

      setMessage(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);

      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-5 py-12">
      <div className="w-full max-w-md animate-fade-up">
        <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-card sm:p-10">
          {/* Brand mark */}
          <div className="mb-7 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-ink-950 font-display text-xl font-extrabold text-brand-400">
              S
            </span>
            <h1 className="mt-5 font-display text-2xl font-extrabold text-ink-950">
              Create your account
            </h1>
            <p className="mt-1.5 text-sm text-ink-500">
              Join ShopEasy and start shopping today
            </p>
          </div>

          {message && (
            <div className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-ink-950 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950"
            >
              Create Account
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-ink-950 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
