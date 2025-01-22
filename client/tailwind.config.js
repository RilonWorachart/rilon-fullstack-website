/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add all source files here
  ],
  theme: {
    extend: {
      fontFamily: {
        'plex-sans-thai': ['IBM Plex Sans Thai', 'sans-serif'], // Add IBM Plex Sans Thai font here
      },
    },
  },
  plugins: [],
}



