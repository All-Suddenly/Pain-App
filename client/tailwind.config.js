/* eslint-disable no-undef */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        white: '#fff',
        black: '#111',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
