/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", 
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb", 
          light: "#3b82f6",
        },
        secondary: {
          dark: "#1e293b", 
        },
        accent: {
          DEFAULT: "#f97316", 
        },
      },
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.1)",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};