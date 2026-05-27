import { useState } from "react";

import { loginUser } from "../services/authService";

const Login = () => {
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

      // SAVE TOKEN

      localStorage.setItem("token", data.token);

      // SUCCESS MESSAGE

      setMessage(data.message);

      // CLEAR INPUTS

      setEmail("");

      setPassword("");
    } catch (error) {
      console.log(error);

      setMessage(error.response.data.message);
    } finally {
      // STOP LOADING

      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {message && (
          <p className="text-center mb-4 text-green-600 font-semibold">
            {message}
          </p>
        )}

        {/* EMAIL */}

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg outline-none"
          />
        </div>

        {/* PASSWORD */}

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Password</label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 transition text-white py-3 rounded-lg"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
