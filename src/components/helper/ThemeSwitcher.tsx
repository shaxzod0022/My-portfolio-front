// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { styles } from "@/styles/styles";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration muammosini oldini olish uchun
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-2 relative overflow-hidden w-10 h-10 rounded-full transition duration-400 bg-gray-200 dark:bg-gray-800 hover:scale-110`}
      aria-label="Toggle theme"
    >
      <div
        className={`${
          styles.flex
        } gap-5 absolute transition duration-400 left-0 top-1/2 -translate-1/2 ${
          theme === "dark" ? "rotate-180" : "rotate-0"
        } `}
      >
        <Sun className={`h-5 w-5 text-yellow-400`} />
        <Moon className={`h-5 w-5 text-blue-400`} />
      </div>
    </button>
  );
}
