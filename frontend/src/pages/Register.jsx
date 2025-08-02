import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "", email: "", password: "", name: "", bio: "", linkedInUrl: "", walletAddress: ""
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Register</h1>
      {["username", "email", "password", "name", "bio", "linkedInUrl", "walletAddress"].map((f) => (
        <input key={f} placeholder={f} className="input mt-2"
          onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
      ))}
      <button onClick={handleRegister} className="btn mt-4">Register</button>
    </div>
  );
};

export default Register;
