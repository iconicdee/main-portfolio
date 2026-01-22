/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    // keep legacy folders if you ever use them
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0,0,0,0.5)",
      DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.6)",
      md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.6)",
      lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.5)",
      xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.4)",
      t: "0 -1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.6)",
      orange: "0 10px 15px -3px rgba(245,56,56,0.81)",
      "green-md": "0px 20px 40px -15px rgba(13,183,96,0.81)",
      none: "none",
    },
    colors: {
      transparent: "transparent",
      black: {
        900: "#000000",
        500: "#4F5665",
        600: "#08132A",
      },
      orange: {
        100: "#ffecec",
        500: "#f53855",
      },
      green: {
        500: "#2fa873",
        main: "#0db760",
      },
      white: {
        300: "#f8f8f8",
        500: "#fff",
      },
      gray: {
        100: "#eeeff2",
        400: "#afb5c0",
        500: "#dddddd",
      },
    },
    extend: {},
  },
  plugins: [],
};
