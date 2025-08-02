import { useState, useContext } from "react";
import { ethers } from "ethers";
import api from "../utils/api";
import { WalletContext } from "../context/WalletProvider";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "", description: "", skills: "", budget: "", location: "", tags: ""
  });
  const [loading, setLoading] = useState(false);
  const { walletAddress, connectWallet } = useContext(WalletContext);

  const handleSubmit = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: "0xbA391F0B052Eacdc3Bf9a2ee1ebD091f8f9c3828", 
        value: ethers.parseEther("0.01"),
      });

      await tx.wait();

      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
        tags: form.tags.split(",").map((t) => t.trim()),
      };

      await api.post("/job", payload);
      alert("Job posted successfully!");

      setForm({
        title: "", description: "", skills: "", budget: "", location: "", tags: ""
      });
    } catch (error) {
      console.error("Payment or job post failed:", error);
      alert("Transaction failed or rejected. Job not posted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Post a Job</h1>
      {["title", "description", "skills", "budget", "location", "tags"].map((f) => (
        <input
          key={f}
          placeholder={f}
          className="input mt-2 w-full border p-2"
          value={form[f]}
          onChange={(e) => setForm({ ...form, [f]: e.target.value })}
        />
      ))}

      <button
        onClick={handleSubmit}
        className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay & Post Job"}
      </button>
    </div>
  );
};

export default PostJob;
