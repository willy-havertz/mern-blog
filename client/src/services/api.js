// client/src/services/api.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((config) => {
  const stored = localStorage.getItem("token");
  // Only parse if stored is a non-null string
  let token = null;
  if (typeof stored === "string") {
    try {
      token = JSON.parse(stored);
    } catch {
      // Bad JSON in storage—fall back to null
      token = null;
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
