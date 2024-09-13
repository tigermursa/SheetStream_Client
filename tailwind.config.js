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
        primary: "#8210ed",
        primaryDark: "#5f07b7",
        primaryLight: "#9642e5",
        primaryLightest: "#995bd3",
        secondary: "#13daf4",
        secondaryDark: "#075660",
        secondaryLight: "#40cbdd",
        textMain: "#727272",
        textDark: "#16171A",
      },
    },
  },
  plugins: [],
};
