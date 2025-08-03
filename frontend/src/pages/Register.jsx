import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/WalletProvider";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { walletAddress, connectWallet } = useContext(WalletContext);
  const [form, setForm] = useState({
    username: "", email: "", password: "", name: "", bio: "", linkedInUrl: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    setForm((prev) => ({ ...prev, walletAddress }));
  }, [walletAddress]);

  const handleRegister = async () => {
    if (!walletAddress || walletAddress.trim() === "") {
      alert("Please connect wallet before registering !!");
      return;
    }
    try {
      await api.post("/auth/register", { ...form, walletAddress });
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };


  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Register</h1>

      {["username", "email", "password", "name", "bio", "linkedInUrl"].map((f) => (
        <input key={f} placeholder={f} className="input mt-2"
          onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
      ))}

      <button onClick={handleRegister} className="btn mt-4">Register</button>
    </div>
  );
};

export default Register;
