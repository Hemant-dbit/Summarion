/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: 'oklch(0.88 0.03 10)',
        ring: 'oklch(0.45 0.15 15)',
        background: 'oklch(0.98 0.02 10)',
        foreground: 'oklch(0.15 0.03 10)',
      },
    },
  },
  plugins: [],
};
