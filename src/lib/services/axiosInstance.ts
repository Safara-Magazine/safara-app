import axios from "axios";
import { BACKEND_BASE_URL } from "@/auth/lib/backendConfig";
import { useAuthStore } from "@/auth/store";

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

// This runs before every request — reads the token fresh each time
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;