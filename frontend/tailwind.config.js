/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'border-l-red-500',
    'border-l-blue-500', 
    'border-l-green-500',
    'border-l-pink-500',
    'border-l-gray-400'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
