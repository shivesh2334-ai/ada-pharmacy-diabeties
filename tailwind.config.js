module.exports = {
  content: ['./app/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ink: '#14262b', teal: { DEFAULT: '#0f6b73', soft: '#e3f1f2' }, paper: '#f6f8f8', amber: { DEFAULT: '#b45309', soft: '#fdf0dc' }, rose: { DEFAULT: '#a12a3a', soft: '#fbe8ea' }, leaf: { DEFAULT: '#1d6b45', soft: '#e4f3ea' } },
    fontFamily: { serif: ['Georgia', 'serif'], sans: ['system-ui', 'sans-serif'] }
  } },
  plugins: []
};
