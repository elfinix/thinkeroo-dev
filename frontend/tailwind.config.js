/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
        extend: {
            fontFamily: {
              lexend: ['Lexend', 'sans-serif'],
            },
            colors: {
              primary: {
                1: 'var(--primary-1)',
                2: 'var(--primary-2)',
                3: 'var(--primary-3)',
              },
              secondary: {
                1: 'var(--secondary-1)',
                2: 'var(--secondary-2)',
              },
              accent: {
                1: 'var(--accent-1)',
                2: 'var(--accent-2)',
              },
              text: {
                1: 'var(--text-1)',
                2: 'var(--text-2)',
              },
              positive: 'var(--positive)',
              negative: 'var(--negative)',
            },
      
      },
  },
  plugins: [],
}
