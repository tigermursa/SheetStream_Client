/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "shadow-1": "0px 0px 60px 0px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        primary: "#70ad29",
        primaryDark: "#476e1a",
        primaryLight: "#94e636",
        secondary: "#2624a1",
        secondaryDark: "#0f0e3a",
        secondaryLight: "#3936e6",
        textMain: "#727272",
        textDark: "#16171A",
      },
    },
  },
  plugins: [],
};
