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

  // UI-only: toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card lg:grid-cols-2">
        {/* ===== BRAND SHOWCASE PANEL ===== */}
        <div className="relative hidden overflow-hidden bg-ink-950 p-10 text-white lg:flex lg:flex-col xl:p-12">
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl" />
          {/* Grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Logo */}
          <Link to="/" className="relative flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 font-display text-lg font-extrabold text-ink-950">
              S
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Shop<span className="text-brand-400">Easy</span>
            </span>
          </Link>

          {/* Headline */}
          <div className="relative mt-auto">
            <h2 className="font-display text-3xl font-extrabold leading-tight xl:text-4xl">
              Welcome back to a
              <br />
              <span className="bg-gradient-to-r from-brand-200 via-brand-300 to-brand-500 bg-clip-text text-transparent">
                smarter way to shop.
              </span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300">
              Sign in to track orders, save your favourites and check out faster
              with a premium, secure experience.
            </p>

            {/* Feature list */}
            <ul className="mt-8 space-y-3">
              {[
                "Lightning-fast secure checkout",
                "Exclusive members-only deals",
                "Real-time order tracking",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-400/20 text-brand-300">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <span className="text-ink-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust footer */}
          <div className="relative mt-10 flex items-center gap-6 border-t border-white/10 pt-6">
            {[
              { value: "10K+", label: "Customers" },
              { value: "500+", label: "Products" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-ink-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== FORM PANEL ===== */}
        <div className="flex items-center justify-center p-6 sm:p-10 xl:p-12">
          <div className="w-full max-w-sm animate-fade-up">
            {/* Mobile brand mark */}
            <div className="mb-8 text-center lg:text-left">
              <Link
                to="/"
                className="mb-6 inline-flex items-center gap-2.5 lg:hidden"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-950 font-display text-lg font-extrabold text-brand-400">
                  S
                </span>
                <span className="font-display text-xl font-extrabold tracking-tight text-ink-950">
                  Shop<span className="text-brand-500">Easy</span>
                </span>
              </Link>
              <h1 className="font-display text-2xl font-extrabold text-ink-950 sm:text-3xl">
                Welcome back
              </h1>
              <p className="mt-1.5 text-sm text-ink-500">
                Sign in to continue to your account
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
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-ink-200 bg-ink-50/60 py-3 pl-12 pr-4 text-sm text-ink-950 outline-none transition placeholder:text-ink-400 focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/10"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="mb-2 block text-sm font-semibold text-ink-700">
                  Password
                </label>
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-ink-200 bg-ink-50/60 py-3 pl-12 pr-12 text-sm text-ink-950 outline-none transition placeholder:text-ink-400 focus:border-ink-950 focus:bg-white focus:ring-4 focus:ring-ink-950/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER / FORGOT */}
              <div className="mb-6 flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-ink-300 text-ink-950 accent-ink-950"
                  />
                  Remember me
                </label>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-ink-950 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
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
                  <>
                    Sign In
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
                  </>
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-ink-100" />
              <span className="text-xs font-medium uppercase tracking-wider text-ink-400">
                or
              </span>
              <div className="h-px flex-1 bg-ink-100" />
            </div>

            {/* SOCIAL (UI-only) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white py-3 text-sm font-semibold text-ink-700 transition hover:border-ink-300 hover:bg-ink-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.7-2.6C16.9 2.7 14.7 1.8 12 1.8 6.9 1.8 2.8 5.9 2.8 11s4.1 9.2 9.2 9.2c5.3 0 8.8-3.7 8.8-9 0-.6-.1-1.1-.2-1.6H12z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white py-3 text-sm font-semibold text-ink-700 transition hover:border-ink-300 hover:bg-ink-50"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3.01-.85.97-2.24 1.72-3.4 1.63-.14-1.11.4-2.27 1.06-3 .73-.82 2.02-1.45 3.1-1.5.04.29.36.21.36-.14zM20.5 17.13c-.55 1.27-.82 1.84-1.53 2.96-.99 1.57-2.39 3.52-4.12 3.54-1.54.01-1.93-1-4.02-.99-2.09.01-2.52.99-4.06.97-1.73-.02-3.05-1.78-4.04-3.35C-.27 16.43-.78 11.1 1.27 8.32c1.04-1.43 2.69-2.27 4.24-2.27 1.58 0 2.57 1 3.87 1 1.27 0 2.04-1 3.87-1 1.39 0 2.86.76 3.91 2.06-3.44 1.88-2.88 6.79.34 8.02z" />
                </svg>
                Apple
              </button>
            </div>

            {/* SIGN UP LINK */}
            <p className="mt-7 text-center text-sm text-ink-500">
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
      </div>
    </div>
  );
};

export default Login;
