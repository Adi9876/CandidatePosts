import { useState } from "react";
import api from "../utils/api";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "", description: "", skills: "", budget: "", location: "", tags: ""
  });

  const handleSubmit = async () => {
    const payload = {
      ...form,
      skills: form.skills.split(",").map(s => s.trim()),
      tags: form.tags.split(",").map(t => t.trim())
    };
    await api.post("/job", payload);
    alert("Job posted!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Post a Job</h1>
      {["title", "description", "skills", "budget", "location", "tags"].map(f => (
        <input key={f} placeholder={f} className="input mt-2"
          onChange={e => setForm({ ...form, [f]: e.target.value })} />
      ))}
      <button onClick={handleSubmit} className="btn mt-4">Submit</button>
    </div>
  );
};

export default PostJob;
