import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import api from "../utils/api";
import { WalletContext } from "../context/WalletProvider";

const Jobs = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", skills: "", budget: "", location: "", tags: ""
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { walletAddress } = useContext(WalletContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/job");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

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
      setFormVisible(false);

      const res = await api.get("/job");
      setJobs(res.data);
    } catch (error) {
      console.error("Payment or job post failed:", error);
      alert("Transaction failed or rejected. Job not posted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {formVisible ? "Cancel" : "Post a Job"}
        </button>
      </div>

      {formVisible && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="text-lg font-medium mb-2">Post a Job</h2>
          {["title", "description", "skills", "budget", "location", "tags"].map((f) => (
            <input
              key={f}
              placeholder={f}
              className="input mt-2 w-full border p-2 rounded"
              value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            />
          ))}
          <button
            onClick={handleSubmit}
            className="btn mt-4 bg-green-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay & Post Job"}
          </button>
        </div>
      )}

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="border p-4 rounded shadow-sm">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.description}</p>
              <div className="mt-2 text-sm">
                <strong>Skills:</strong> {job.skills.join(", ")}<br />
                <strong>Tags:</strong> {job.tags.join(", ")}<br />
                <strong>Location:</strong> {job.location || "N/A"}<br />
                <strong>Budget:</strong> ${job.budget || "N/A"}<br />
                <span className="text-gray-500 text-xs">Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
