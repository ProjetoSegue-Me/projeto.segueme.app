import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundFormColor: "#894A2A4D",
        bodyColor: "#F9CDA3",
        colorStep: "#FFB718",
      },
      backgroundImage: {
        landing: "url('/public/images/Landing.jpg')",
        loginfundo: "url('/public/images/FundoLogin.png')",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
