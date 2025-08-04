import { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      alert("Invalid login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-40 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="bg-white/5 backdrop-blur-md border border-gray-700/40 rounded-xl shadow-xl p-8 w-full max-w-md text-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">Sign in to DevBoard</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-gray-800/50 border border-gray-600 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-gray-800/50 border border-gray-600 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-2 rounded-md font-medium tracking-wide transition-all duration-200 shadow hover:shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="text-sm mt-6 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
