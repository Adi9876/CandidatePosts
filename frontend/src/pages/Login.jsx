import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      // window.location.reload();
      // navigate("/dashboard");
      window.location.href = "/";
    } catch (err) {
      alert("Invalid login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <input type="email" placeholder="Email" className="input" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" className="input mt-2" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button
        onClick={handleLogin}
        className="btn mt-4"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
