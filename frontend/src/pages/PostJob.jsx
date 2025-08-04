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
  const [filters, setFilters] = useState({ skill: "", location: "", tag: "" });

  const { walletAddress } = useContext(WalletContext);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await api.get("/job");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Job Board
          </h1>
          <button
            onClick={() => setFormVisible(!formVisible)}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl
                       hover:from-blue-700 hover:to-indigo-800 transition-all duration-200
                       shadow-md hover:shadow-xl"
          >
            {formVisible ? "Cancel" : "Post a Job"}
          </button>
        </div>

        {formVisible && (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Post a Job</h2>

            {["title", "description", "skills", "budget", "location", "tags"].map((f) => (
              <div key={f} className="mb-4 group">
                <label className="block text-sm font-medium text-white mb-2 transition-colors group-focus-within:text-blue-600">
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </label>
                <input
                  placeholder={`Enter ${f}`}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                             transition-all duration-200 placeholder-gray-400
                             hover:bg-gray-50 hover:border-gray-300"
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                />
              </div>
            ))}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-4 flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl
                         hover:from-green-700 hover:to-emerald-800 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-green-500/30
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay & Post Job"
              )}
            </button>
          </div>
        )}


        <div className="mb-6 grid sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Filter by Skill"
            className="px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={filters.skill}
            onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
          />
          <input
            type="text"
            placeholder="Filter by Location"
            className="px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Filter by Tag"
            className="px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={filters.tag}
            onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
          />
        </div>

        {loading ? (
          <div className="text-gray-400 text-center">Loading...</div>
        ) : (
          <div className="space-y-6">
            {jobs
              .filter((job) => {
                const skillMatch = filters.skill
                  ? job.skills?.some((s) =>
                      s.toLowerCase().includes(filters.skill.toLowerCase())
                    )
                  : true;
                const locationMatch = filters.location
                  ? job.location?.toLowerCase().includes(filters.location.toLowerCase())
                  : true;
                const tagMatch = filters.tag
                  ? job.tags?.some((t) =>
                      t.toLowerCase().includes(filters.tag.toLowerCase())
                    )
                  : true;
                return skillMatch && locationMatch && tagMatch;
              })
              .map((job) => (
                <div
                  key={job._id}
                  className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 
               backdrop-blur-lg shadow-2xl rounded-2xl p-6 transition-all duration-300 
               hover:-translate-y-1 hover:shadow-blue-500/30 hover:border-blue-600/40"
                >
                  <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-gray-300 mb-4">{job.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                    <div>
                      <span className="font-medium text-white">📍 Location:</span>{" "}
                      {job.location || "Remote / N/A"}
                    </div>
                    <div>
                      <span className="font-medium text-white">💰 Budget:</span>{" "}
                      ${job.budget || "N/A"}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-white">🛠️ Skills:</span>{" "}
                      {job.skills && job.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {job.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="bg-blue-600/20 text-blue-300 px-2 py-0.5 rounded-lg text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-white">🏷️ Tags:</span>{" "}
                      {job.tags && job.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {job.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-indigo-600/20 text-indigo-300 px-2 py-0.5 rounded-lg text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>

                  <div className="text-right text-xs text-gray-500 mt-4">
                    📅 Posted on {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
