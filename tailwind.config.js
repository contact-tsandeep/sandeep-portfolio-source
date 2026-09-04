/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        space: {
          950: "#03050b",
          900: "#070a12",
          800: "#0b1020",
          700: "#11182b",
        },

        neon: {
          blue: "#38bdf8",
          cyan: "#22d3ee",
          purple: "#8b5cf6",
          violet: "#a78bfa",
        },

        glass: {
          border: "rgba(255,255,255,0.10)",
          surface: "rgba(255,255,255,0.045)",
          strong: "rgba(255,255,255,0.075)",
        },
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },

      boxShadow: {
        glow: "0 0 60px rgba(56,189,248,0.15)",
        "glow-purple": "0 0 70px rgba(139,92,246,0.16)",
        glass:
          "0 24px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
      },

      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(56,189,248,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.055) 1px, transparent 1px)",
      },
    },
  },

  plugins: [],
};
