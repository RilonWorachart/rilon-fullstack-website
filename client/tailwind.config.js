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
      screens: {
        'category1':'760px',
        'category2':'1160px',
        '2sm': '840px',
        '2md': '1240px',
        'category3': '1450px',
        '3xl': '1600px',  // Or whatever value you want for your 3xl breakpoint
        '4xl': '1800px',
      },
    },
  },
  plugins: [],
}



