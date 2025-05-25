/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'green': {
          50: '#f0f9f0',
          100: '#dcf0dc',
          200: '#bfe3bf',
          300: '#94d094',
          400: '#65b865',
          500: '#4CAF50',
          600: '#3f9443',
          700: '#347537',
          800: '#2d5e2f',
          900: '#274d29',
          950: '#112b13',
        },
        'blue': {
          50: '#f0f7fe',
          100: '#deedfb',
          200: '#c4e1f9',
          300: '#99cef5',
          400: '#68b5ef',
          500: '#4299e9',
          600: '#2979dc',
          700: '#2264cb',
          800: '#2153a3',
          900: '#204881',
          950: '#172c51',
        },
        'brown': {
          50: '#f9f6f3',
          100: '#f0e9e4',
          200: '#e2d5cc',
          300: '#d0b9ab',
          400: '#b9988a',
          500: '#A1887F',
          600: '#96756a',
          700: '#7c5d56',
          800: '#664e48',
          900: '#56423e',
          950: '#2e2320',
        },
      },
      animation: {
        'sway': 'sway 5s ease-in-out infinite alternate',
        'bloom': 'bloom 8s ease-in-out infinite alternate',
      },
      keyframes: {
        sway: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(5deg)' },
        },
        bloom: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};