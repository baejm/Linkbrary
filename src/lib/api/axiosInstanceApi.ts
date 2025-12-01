import axios from "axios";

export const proxy = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PROXY || "/api",
});

proxy.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
