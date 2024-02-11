/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "480px" },
        sm: { min: "481px" },
        md: { min: "768px" },
        lg: { min: "992px" },
        xl: { min: "1200px" },
        xxl: { min: "1920px" },
      },
      colors: {
        neutral: "#F5F5F5",
        lightGray: "#EAEAEA",
        purplePrimary: "#9A11D9",
        bkgBlack: "#0A0A0A",
        bkgGray: "#141414",
      },
      fontFamily: {
        vt323: ["VT323", "monospace"],
        zenKaku: ["Zen Kaku Gothic New", "sans-serif"],
      },
    },
  },
  plugins: [],
};
