import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f7f5",
        foreground: "#111111",
        accent: "#ff7a00",
        muted: "#eaeaea",
        "off-white": "#f7f7f5",
        carbon: "#111111",
        "soft-gray": "#eaeaea",
        chrome: "#cccccc",
        "electric-yellow": "#ff7a00",
        "electric-blue": "#005eff",
        ink: "rgba(17, 17, 17, 0.7)",
      },
      boxShadow: {
        floating: "0 8px 24px rgba(17, 17, 17, 0.12)",
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
