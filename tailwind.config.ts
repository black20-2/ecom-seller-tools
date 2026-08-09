import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F8FA",
        surface: "#FFFFFF",
        ink: "#161B22",
        muted: "#5B6472",
        navy: {
          DEFAULT: "#1D2B4F",
          light: "#2C3E6B",
        },
        profit: {
          DEFAULT: "#0F7A5C",
          dark: "#0B5C45",
          light: "#E7F4EF",
        },
        rust: {
          DEFAULT: "#B4501E",
          dark: "#8F3E17",
          light: "#FBEDE3",
        },
        line: "#E2E5EA",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(22, 27, 34, 0.04), 0 1px 12px rgba(22, 27, 34, 0.04)",
        cardHover: "0 4px 20px rgba(22, 27, 34, 0.08)",
      },
      borderRadius: {
        xl: "0.875rem",
      },
    },
  },
  plugins: [],
};

export default config;
