import { useEffect, useState } from "react";
import api from "../utils/api";

const Profile = () => {
  const [form, setForm] = useState({});

  useEffect(() => {
    api.get("/profile").then(res => setForm(res.data));
  }, []);

  const handleUpdate = () => {
    api.put("/profile", form).then(() => alert("Updated!"));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Profile</h1>
      {Object.entries(form).map(([k, v]) => (
        <input key={k} value={v} placeholder={k} className="input mt-2"
          onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
      ))}
      <button onClick={handleUpdate} className="btn mt-4">Update</button>
    </div>
  );
};

export default Profile;
