import { useEffect, useState } from "react";
import { User, Save, Edit3 } from "lucide-react";
import api from "../utils/api";

const Profile = () => {
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.get("/profile").then(res => {
      const { __v, ...cleanData } = res.data; 
      setForm(cleanData);
    });
  }, []);

  const handleUpdate = () => {
    setIsLoading(true);
    api.put("/profile", form).then(() => {
      alert("Updated!");
      setIsLoading(false);
    });
  };

  const formatLabel = (key) => {
    const labels = {
      username: 'Username',
      email: 'Email Address',
      name: 'Full Name',
      bio: 'Biography',
      linkedInUrl: 'LinkedIn Profile',
      skills: 'Skills & Technologies',
      walletAddress: 'Wallet Address'
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  };

  const getPlaceholder = (key) => {
    const placeholders = {
      username: 'Enter your username',
      email: 'Enter your email address',
      name: 'Enter your full name',
      linkedInUrl: 'https://linkedin.com/in/yourprofile',
      walletAddress: '0x...'
    };
    return placeholders[key] || `Enter your ${key.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full mb-4 shadow-xl">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage your personal information</p>
        </div>

   
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-8 py-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <Edit3 className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-100">Edit Profile</h2>
            </div>
          </div>


          <div className="p-8 space-y-6 text-black">
            {Object.entries(form).map(([k, v]) => {

              if (k === 'createdAt' || k === '_id') return null;


              if (k === 'bio') {
                return (
                  <div key={k} className="group">
                    <label className="block text-sm font-medium text-white mb-2 transition-colors group-focus-within:text-blue-600">
                      {formatLabel(k)}
                    </label>
                    <div className="relative">
                      <textarea
                        value={v || ''}
                        placeholder="Tell us about yourself..."
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                 transition-all duration-200 placeholder-gray-400
                                 hover:bg-gray-50 hover:border-gray-300 resize-none"
                        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </div>
                );
              }

              if (k === 'skills') {
                return (
                  <div key={k} className="group">
                    <label className="block text-sm font-medium text-white mb-2 transition-colors group-focus-within:text-blue-600">
                      {formatLabel(k)}
                    </label>
                    <div className="relative">
                      <input
                        value={Array.isArray(v) ? v.join(', ') : v || ''}
                        placeholder="JavaScript, React, Node.js, etc..."
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                 transition-all duration-200 placeholder-gray-400
                                 hover:bg-gray-50 hover:border-gray-300"
                        onChange={(e) => setForm({ ...form, [k]: e.target.value.split(',').map(s => s.trim()) })}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <p className="text-xs text-white mt-1">Separate skills with commas</p>
                  </div>
                );
              }

              return (
                <div key={k} className="group">
                  <label className="block text-sm font-medium text-white mb-2 transition-colors group-focus-within:text-blue-600">
                    {formatLabel(k)}
                  </label>
                  <div className="relative">
                    <input
                      value={v || ''}
                      placeholder={getPlaceholder(k)}
                      type={k === 'email' ? 'email' : k === 'password' ? 'password' : 'text'}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl 
                               focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                               transition-all duration-200 placeholder-gray-400
                               hover:bg-gray-50 hover:border-gray-300"
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>


          <div className="px-8 py-6 bg-gray-900/50 border-t border-gray-700/50">
            <div className="flex gap-4 justify-end">
              <button
                className="px-6 py-2.5 text-gray-300 bg-gray-800 border border-gray-600 rounded-xl
                         hover:bg-gray-700 hover:border-gray-500 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-gray-500/30"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isLoading}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl
                         hover:from-blue-700 hover:to-indigo-800 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500/30
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5
                         flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>


        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Your information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;