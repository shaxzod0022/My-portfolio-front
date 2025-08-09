// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js yoki React uchun
  ],
  theme: {
    extend: {
      colors: {
        myPrimary: "#000066",
      },
    },
  },
  plugins: [],
};
