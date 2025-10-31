/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: "#8FBC8F",
        secondary: "#F0FFF4",
        accent: "#66CDAA",
        surface: "#FAFFFA",
        background: "#F5FFF5",
        success: "#2d6a4f",
        warning: "#f59e0b",
        error: "#dc2626",
        info: "#64748b"
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}