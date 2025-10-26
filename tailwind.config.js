const flowbiteReact = require('flowbite-react/plugin/tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    '.flowbite-react/class-list.json',
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#121415',
        grayBg: '#222426',
        buttonBlue: '#0074F0',
        buttonRed: '#F74746',
        link: '#1C64F2'
      },
      spacing: {
        4.5: '1.125rem', // 18px
        6.5: '1.625rem', // 26px
        8.125: '2.03125rem', // 32.5px
        15: '3.75rem', // 60px
        30: '7.5rem', // 120px
        8.1875: '2.0625rem', // 33px
        72: '18rem', // 288px
      },
      boxShadow: {
        contentDiv: '0px 2px 4px -2px #0000000D, 0px 4px 6px -1px #0000001A',
        header: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        footer: '0px -4px 4px 0px rgba(0, 0, 0, 0.25)',
        videoShadow:
          '0px 10px 10px 0px #0000000A, 0px 20px 25px -5px #0000001A',
      },
      fontSize: {
        'text-heading': [
          '64px',
          { lineHeight: '60px', letterSpacing: '-0.01em' },
        ],
      },
    },
  },
  plugins: [require('flowbite/plugin'), flowbiteReact],
}
