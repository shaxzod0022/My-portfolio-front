"use client";
import { Logo2 } from "@/assets";
import Btn from "@/components/helper/Btn";
import { handleError } from "@/lib/handleError";
import { styles } from "@/styles/styles";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/login",
        form
      );
      sessionStorage.setItem("token", response.data.token);
      router.replace("/admin/dashboard");
    } catch (err) {
      const error = handleError(err);
      setError(error);
      setInterval(() => setError(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br bg-black flex items-center justify-center relative overflow-hidden">
      {/* dekoratsion gradient to‘qimalar */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 text-white shadow-2xl space-y-6"
      >
        <div className="flex flex-col items-center gap-3">
          <Image className="w-16" src={Logo2} alt="Logotip for shakhzod's" />
          <h2 className="text-3xl font-bold tracking-wide text-blue-100 drop-shadow-md">
            Admin Panel
          </h2>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-blue-100 text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="email"
            placeholder="example@gmail.com"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            className="text-blue-100 text-sm font-medium"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              required
              className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              onClick={() => setShowPassword((i) => !i)}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-blue-400 transition"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          <span className="text-xs text-blue-200">
            {showPassword ? "Password ko‘rinmoqda" : "Password yashirilgan"}
          </span>
        </div>

        <Btn
          disabled={loading}
          newClass="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 active:from-blue-600 active:to-indigo-600 text-white font-semibold shadow-lg transition"
          title={loading ? "Loading..." : "Login"}
        />

        {error && (
          <p className="text-red-400 text-sm text-center mt-2">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
