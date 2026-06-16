import { useState } from "react";

import { loginUser } from "../services/authService";

import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { loginSuccess } from "../redux/features/userSlice";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // LOGIN FUNCTION

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // START LOADING

      setLoading(true);

      // API CALL

      const data = await loginUser({
        email,
        password,
      });

      console.log(data);

      // UPDATE REDUX STATE

      dispatch(
        loginSuccess({
          user: data.user,
          token: data.token,
        }),
      );

      // SUCCESS MESSAGE

      setMessage(data.message);

      // CLEAR INPUTS

      setEmail("");

      setPassword("");

      // REDIRECT HOME PAGE

      navigate("/");
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Something Went Wrong");
    } finally {
      // STOP LOADING

      setLoading(false);
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
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-ink-500">
              Sign in to continue to ShopEasy
            </p>
          </div>

          {/* MESSAGE */}

          {message && (
            <div className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* EMAIL */}

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-ink-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-3 text-sm text-ink-950 outline-none transition placeholder:text-ink-400 focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/10"
              />
            </div>

            {/* PASSWORD */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-ink-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-3 text-sm text-ink-950 outline-none transition placeholder:text-ink-400 focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/10"
              />
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink-950 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400 hover:text-ink-950 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink-950 disabled:hover:text-white"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-ink-950 underline-offset-4 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
