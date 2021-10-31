const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'flash-red': {
          '0%, 100%': {
            color: 'black',
          },
          '25%, 75%': {
            color: 'red',
          },
        },
        'flash-green': {
          '0%, 100%': {
            color: 'black',
          },
          '25%, 75%': {
            color: 'green',
          },
        },
      },
      animation: {
        'flash-red': 'flash-red 1.5s ease-in-out',
        'flash-green': 'flash-green 1.5s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const noScrollbar = {
        /* Hide scrollbar for Chrome, Safari and Opera */
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },

        /* Hide scrollbar for IE, Edge and Firefox */
        '.no-scrollbar': {
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
        },
      };

      addUtilities(noScrollbar);
    }),
  ],
};
