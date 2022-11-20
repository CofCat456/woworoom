/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#6A33F8',
      },
      maxWidth: {
        container: '1110px',
      },
      width: {
        container: '1110px',
      },
      backgroundImage: {
        banner: 'url(./assets/banner.png)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
