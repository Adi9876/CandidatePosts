import { useEffect, useState } from "react";
import api from "../utils/api";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/dashboard").then(res => setPosts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">User Feed</h2>
      {posts.map((post) => (
        <div key={post._id} className="p-4 mb-2 bg-gray-100">
          <p>{post.content}</p>
          <small>{post.tags.join(", ")}</small>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
