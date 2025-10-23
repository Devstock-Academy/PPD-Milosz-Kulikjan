const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#121415', 
        grayBg: '#222426',
        buttonDefault: '#0074F0',
      },
      spacing: {
        '4.5': '1.125rem', // 18px
        '8.125': '2.03125rem', // 32.5px
      },
      boxShadow: {
        'custom': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require('flowbite/plugin'), flowbiteReact],
};
