/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Matches your existing setup
    prefix: 'tw-',      // Matches your existing setup
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          // Extracted from your index.html and CSS
          light: {
            background: '#fcfcfc',
            text: '#000000',
            card: '#f6f7fb',
            'gray-text': '#4a5568', // Corresponds to tw-text-gray-700
          },
          dark: {
            background: '#000000',
            text: '#ffffff',
            card: '#171717',
            'gray-text': '#d1d5db', // Corresponds to tw-text-gray-300
          },
          accent: {
            DEFAULT: '#2563eb', // blue-600
            hover: '#1d4ed8',   // blue-700
          },
        },
        animation: {
            scroll: 'scroll 30s linear infinite',
        },
        keyframes: {
            scroll: {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-86%)' },
            }
        }
      },
    },
    plugins: [],
  };