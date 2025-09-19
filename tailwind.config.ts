// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // qo‘shimcha
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
