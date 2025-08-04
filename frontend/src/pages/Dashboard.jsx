import { useEffect, useState } from "react";
import api from "../utils/api";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/dashboard");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await api.post("/dashboard", {
        content,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      });

      setContent("");
      setTags("");
      setShowForm(false);
      fetchPosts(); // Refresh feed
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl mb-4 font-semibold">User Feed</h2>

      <div className="mb-4">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {showForm ? "Cancel" : "Make Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 border rounded shadow mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border p-2 mb-2 rounded resize-none"
            rows={4}
            required
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full border p-2 mb-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Post
          </button>
        </form>
      )}

      {posts.map((post) => (
        <div key={post._id} className="p-4 mb-3 bg-gray-100 rounded">
          <p className="mb-1">{post.content}</p>
          <small className="text-sm text-gray-600">{post.tags.join(", ")}</small>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
