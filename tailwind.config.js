/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainColor: '#CCD47C',
        darkGray: '#4F4F4F',
        black: '#000000',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        tablet: '768px',
        'lg-md': '992px',
        laptop: '1024px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
};
