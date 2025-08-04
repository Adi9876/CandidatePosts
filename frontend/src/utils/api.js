import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const publicEndpoints = ["/skills/extract", "/auth/login", "/auth/register"];

  const isPublic = publicEndpoints.some((url) => config.url.includes(url));

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(
    "📡 Sending request to",
    config.url,
    "with headers",
    config.headers
  );

  return config;
});

export default api;
