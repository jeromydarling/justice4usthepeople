import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — earthy, dignified, hopeful.
        // Indigo (justice/wisdom), ember (light/hope), terra (humanity/earth),
        // bone (paper/quiet ground), ink (text). Tweak the indigo + ember to
        // match the colors pulled from the logo once it's dropped in.
        indigo: {
          50: "#f3f4f8",
          100: "#e2e5ee",
          200: "#bcc3d4",
          300: "#8a96b2",
          400: "#586a91",
          500: "#3a4d77",
          600: "#2b3a5e",
          700: "#22304d",
          800: "#1a2540",
          900: "#121b32"
        },
        ember: {
          50: "#fdf6ec",
          100: "#f8e6c5",
          200: "#f1cf8e",
          300: "#e7b257",
          400: "#dc972f",
          500: "#c47c1a",
          600: "#9d6014",
          700: "#754811",
          800: "#4f320d",
          900: "#2c1c08"
        },
        terra: {
          50: "#fbf3ee",
          100: "#f3dccc",
          200: "#e6b699",
          300: "#d68c64",
          400: "#c46a3f",
          500: "#a8512a",
          600: "#854020",
          700: "#623019",
          800: "#3f1f10",
          900: "#231108"
        },
        bone: {
          50: "#fbf8f2",
          100: "#f5f0e3",
          200: "#ebe2cc",
          300: "#d9ccab",
          400: "#bdae87"
        },
        ink: {
          DEFAULT: "#15171c",
          soft: "#2a2d35",
          muted: "#5a5f6b"
        }
      },
      fontFamily: {
        serif: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      maxWidth: {
        prose: "68ch"
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20,23,28,.06), 0 8px 24px -12px rgba(20,23,28,.18)"
      }
    }
  },
  plugins: []
};

export default config;
