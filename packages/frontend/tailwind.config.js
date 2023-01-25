const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
