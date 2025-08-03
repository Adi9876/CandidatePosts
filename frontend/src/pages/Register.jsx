import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/WalletProvider";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { walletAddress, connectWallet } = useContext(WalletContext);
  const [form, setForm] = useState({
    username: "", email: "", password: "", name: "", bio: "", linkedInUrl: "", skills: []
  });
  const [resume, setResume] = useState(null);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setForm((prev) => ({ ...prev, walletAddress }));
  }, [walletAddress]);

  const handleSkillExtraction = async () => {
    if (!resume) return alert("Upload a resume first.");
    setLoadingSkills(true);
    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const res = await api.post("/skills/extract", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, skills: res.data.skills }));
    } catch (err) {
      console.error(err);
      alert("Skill extraction failed");
    } finally {
      setLoadingSkills(false);
    }
  };

  const handleRegister = async () => {
    if (!walletAddress || walletAddress.trim() === "") {
      alert("Please connect wallet before registering !!");
      return;
    }
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

      {["username", "email", "password", "name", "bio", "linkedInUrl"].map((f) => (
        <input key={f} placeholder={f} className="input mt-2"
          onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
      ))}

      <div className="mt-4">
        <label className="block mb-2 text-sm">Upload Resume (PDF/DOCX)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
        />
        <button onClick={handleSkillExtraction} className="btn mt-2">
          {loadingSkills ? "Extracting..." : "Extract Skills from Resume"}
        </button>
      </div>

      {form.skills.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold">Extracted Skills:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.skills.map((skill, idx) => (
              <span key={idx} className="bg-gray-200 px-2 py-1 rounded">{skill}</span>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleRegister} className="btn mt-6">Register</button>
    </div>
  );
};

export default Register;
