// src/lib/axios.ts
import { AuthService } from "@/services/auth.service";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Har bir request oldidan token qo‘shamiz
api.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Agar token muddati tugagan bo‘lsa → login sahifasiga redirect
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      AuthService.clearToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login"; // redirect
      }
    }
    return Promise.reject(error);
  }
);

export default api;
