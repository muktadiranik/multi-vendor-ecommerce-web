/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1366px",
      "2xl": "1440px",
      "3xl": "1536px",
      "4xl": "1666px",
      "5xl": "1920px",
      "6xl": "2200px",
      "7xl": "2560px",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "37px",
        lg: "5rem",
        xxl: "5rem",
        "2xl": "0rem",
      },
    },
    extend: {
      colors: {
        common: "#0071C2",
        white: "#ffffff",
        "custom-black": "#262626",
        gray: "#E2E2E2",
        "gray-light": "#F5F5F5",
        "gray-deep": "#7F7F7F",
        sky: "#EBF3FF",
        green: "#28A745",
        blue: "#ADD4EF",
        yellow: "#FEBA02",
        "black-light": "#282828",
        red: "#FF0000",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-16": "span 16 / span 16",
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
};
