/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#F4F4F4",
        primary: "#F2C94C",
        secondary: "#2F80ED",
        secondaryRed: "#FF4F4F",
        primaryLight: "#FFE79E",
        btnBg: "#270F36",
      },
      fontFamily: {
        bilbo: ["Bilbo", "cursive"],
      },
    },
  },
  plugins: [],
};
