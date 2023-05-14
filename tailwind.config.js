/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'default-text': '#141414',
        'ghost-white': '#F8F8FF',
        'light-blue': '#4169E1',
        'light-pink': '#FFD9E0',
        'light-purple': '#FAD9FF',
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.045em',
      },
      lineHeight: {
        tight: 1.2,
      },
      dropShadow: {
        'image': '0 3px 10px rgba(0, 0, 0, 0.3)',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
    },
  },
  plugins: [],
}
