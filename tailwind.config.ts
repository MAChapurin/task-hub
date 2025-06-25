export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'sidebar-message': "url('/message-bg.jpg')",
      },
    },
  },
  plugins: [],
};
