import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/WalletProvider";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

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
      alert("Please connect wallet before registering!");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="bg-white/5 backdrop-blur-md border border-gray-700/40 rounded-xl shadow-xl p-8 w-full max-w-xl text-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">Create Your DevBoard Account</h2>

        <div className="space-y-4">
          {["username", "email", "password", "name", "bio", "linkedInUrl"].map((f) => (
            <input
              key={f}
              type={f === "password" ? "password" : "text"}
              placeholder={f === "linkedInUrl" ? "LinkedIn URL" : f.charAt(0).toUpperCase() + f.slice(1)}
              className="w-full px-4 py-2 rounded-md bg-gray-800/50 border border-gray-600 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            />
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-400">Upload Resume (PDF/DOCX)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 hover:file:bg-blue-700"
            />
            <button
              onClick={handleSkillExtraction}
              disabled={loadingSkills}
              className="mt-3 w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-2 rounded-md font-medium tracking-wide transition-all duration-200 shadow hover:shadow-lg"
            >
              {loadingSkills ? "Extracting..." : "Extract Skills from Resume"}
            </button>
          </div>

          {form.skills.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-300">Extracted Skills:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.skills.map((skill, idx) => (
                  <span key={idx} className="bg-blue-600/20 border border-blue-600 text-blue-300 text-xs px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleRegister}
            className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-2 rounded-md font-medium tracking-wide transition-all duration-200 shadow hover:shadow-lg"
          >
            Register
          </button>

          {!walletAddress && (
            <div className="text-sm text-center text-red-400 mt-4">
              Wallet not connected.{" "}
              <button
                onClick={connectWallet}
                className="underline hover:text-red-300 transition"
              >
                Connect Wallet
              </button>{" "}
              to proceed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
