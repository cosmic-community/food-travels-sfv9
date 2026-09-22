/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FBF7F0',
        sand: '#EFE4D2',
        charcoal: '#2B2A28',
        terracotta: {
          DEFAULT: '#C8553D',
          light: '#E07A5F',
          dark: '#A3402B',
        },
        saffron: '#F2A541',
        olive: '#6B7F3A',
        sage: '#9CAF88',
        paprika: '#B23A2B',
        spice: '#8C4A2F',
      },
      fontFamily: {
        sans: ['Inter', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
