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
    <div className={`${styles.flexCenter} w-screen h-screen`}>
      <form
        onSubmit={handleSubmit}
        className={`${styles.flexCenter} xl:w-[400px] md:w-[400px] mx-4 sm:w-[80%] w-full rounded-2xl backdrop-blur-2xl p-5 text-white bg-slate-500 space-y-4`}
      >
        <Image className="w-14 mr-5" src={Logo2} alt="Logotip for shakhzod's" />
        <h2 className={`${styles.h2} text-center`}>Adimin panel</h2>
        <div className={`${styles.flexCol} gap-2 w-full`}>
          <label className={`${styles.h3}`} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className={`w-full outline-none text-lg border-white border-2 rounded-xl p-3`}
            type="email"
            placeholder="example@gmail.com"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className={`${styles.flexCol} gap-2 w-full`}>
          <label className={`${styles.h3}`} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            required
            className={`w-full outline-none text-lg border-white border-2 rounded-xl p-3`}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className={`${styles.flex} gap-2`}>
            <span>Show password</span>
            <button onClick={() => setShowPassword((i) => !i)} type="button">
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
        <Btn disabled={loading} newClass="w-full" title="Submit" />
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
