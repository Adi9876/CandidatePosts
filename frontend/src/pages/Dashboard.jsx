import { useEffect, useState } from "react";
import api from "../utils/api";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/dashboard");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }finally{
      setLoading(false);
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
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
          User Feed
        </h2>

        <div className="mb-6 text-right">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl
                       hover:from-blue-700 hover:to-indigo-800 transition-all duration-200
                       shadow-md hover:shadow-xl"
          >
            {showForm ? "Cancel" : "Make Post"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 mb-10 shadow-2xl"
          >
            <label className="block text-sm font-medium text-white mb-2">
              What's on your mind?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write something meaningful..."
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                         transition-all duration-200 placeholder-gray-400 resize-none mb-4 text-gray-800"
              rows={4}
              required
            />

            <label className="block text-sm font-medium text-white mb-2">Tags</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. blockchain, web3, ux"
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                         transition-all duration-200 placeholder-gray-400 mb-4 text-gray-800"
            />

            <button
              type="submit"
              className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl
                         hover:from-green-700 hover:to-emerald-800 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-green-500/30
                         shadow-lg hover:shadow-2xl"
            >
              Post
            </button>
          </form>
        )}

        {loading ? <div className="text-gray-400 text-center">Loading ...</div> : <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="group bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/50 
                           backdrop-blur-md rounded-2xl p-6 shadow-xl transition-all hover:-translate-y-1 
                           hover:shadow-blue-500/30 hover:border-blue-600/40"
              >
                <p className="text-gray-100 mb-3">{post.content}</p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-600/20 text-blue-300 px-2 py-0.5 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="text-right text-xs text-gray-500 mt-4">
                  📅 {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>}
      </div>
    </div>
  );
};

export default Dashboard;
