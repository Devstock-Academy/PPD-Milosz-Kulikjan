const flowbiteReact = require('flowbite-react/plugin/tailwindcss')
const plugin = require('tailwindcss/plugin')

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
        lightGrayBg: '#444648',
        lightBlueBg: '#1185F1',
        darkBlueBg: '#0074F0',
        buttonBlue: '#0074F0',
        buttonRed: '#F74746',
        link: '#1C64F2',
        heroOverlay: '#1B2124',
        buttonOrange: '#F5A22E',
        sidebarDivider: '#374151',
        activeSidebarBg: '#F5A22E',
        iconDefault: '#ffffff',
      },
      spacing: {
        4.5: '1.125rem', // 18px
        6.5: '1.625rem', // 26px
        8.125: '2.03125rem', // 32.5px
        15: '3.75rem', // 60px
        30: '7.5rem', // 120px
        32: '8rem', // 128px
        8.1875: '2.0625rem', // 33px
        72: '18rem', // 288px
        120: '30rem', // 480px
        75: '18.75rem', // 300px
        55: '13.75rem', // 220px
        40: '10rem', // 160px
        'icon-sm': '0.75rem', // 12px
        'icon-base': '1.25rem', // 20px
        'icon-lg': '1.5rem', // 24px
        'icon-xl': '2rem', // 32px
      },
      width: {
        'sidebar-divider': 'calc(100% + 1.25rem)',
      },
      maxWidth: {
        container: '85.375rem', // 1366px
        videoMax: '40.1875rem', // 643px
        registerForm: '43.75rem', // 700px
        loginForm: '28rem', // 448px
      },
      maxHeight: {
        registerForm: '40.875rem', // 654px
      },
      boxShadow: {
        contentDiv: '0px 2px 4px -2px #0000000D, 0px 4px 6px -1px #0000001A',
        header: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        footer: '0px -4px 4px 0px rgba(0, 0, 0, 0.25)',
        videoShadow:
          '0px 10px 10px 0px #0000000A, 0px 20px 25px -5px #0000001A',
        formShadow: '0px 0px 10px 0px #00000099',
        activeTabShadow: 'inset 0px 4px 10px 0px #00000080',
        tabBarShadow: '0px 4px 4px 0px #00000040',
        inactiveTabShadow: '0px 4px 4px 0px #00000040',
      },
      fontSize: {
        'text-heading': [
          '64px',
          { lineHeight: '60px', letterSpacing: '-0.01em' },
        ],
      },
      backgroundImage: {
        hero: "url('/images/HeroImage.webp')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbiteReact,
    plugin(function ({ addBase }) {
      addBase({
        '::-webkit-scrollbar': { width: '6px', height: '6px' },
        '::-webkit-scrollbar-track': { background: '#222426' },
        '::-webkit-scrollbar-thumb': {
          background: '#ffffff',
          borderRadius: '8px',
          height: '66%',
          minHeight: '30px',
        },
        '::-webkit-scrollbar-thumb:hover': { background: '#f0f0f0' },
        '::-webkit-scrollbar-corner': { background: '#222426' },
      })
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.layout-grid': {
          display: 'grid',
          flex: '1',
          transition: 'grid-template-columns 300ms ease',
        },
        '.layout-sidebar-open': {
          gridTemplateColumns: '240px 1fr',
        },
        '.layout-sidebar-closed': {
          gridTemplateColumns: '0fr 1fr',
        },
        '.grid-fullscreen': {
          gridTemplateColumns: '0fr 1fr',
        },
        '.grid-normal': {
          gridTemplateColumns: '1fr 2fr',
        },
      })
    }),
  ],
  corePlugins: {
    scrollbarGutter: false,
  },
}
