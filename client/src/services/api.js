import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL; // e.g. "https://your-backend.com/api"

const API = axios.create({
  baseURL: API_BASE,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export function getImageUrl(photo) {
  if (!photo) return "";
  // If it's already a full URL, just return it:
  if (photo.startsWith("http")) return photo;
  // Otherwise, strip the "/api" segment and point at /uploads
  const origin = API_BASE.replace(/\/api$/, "");
  return `${origin}/uploads/${photo}`;
}

export default API;
