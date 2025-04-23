/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6B5B95", // Soft purple
        secondary: "#88BDBC", // Teal
        accent: "#F7CAC9", // Light pink (subtle)
      },
    },
  },
  plugins: [],
};
