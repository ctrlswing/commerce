/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        freude: ['var(--font-freude)'],
        gothic: ['var(--font-gothic-a1)'],
      },
      colors: {
        // Custom palette colors
        'flamingo-pink': '#DB33AF',
        'off-white': '#F9FCFF',
        'bright-yellow': '#F9E000',
        'light-pink': '#FF8AD0',
        'pink-fucsia': '#C6107C',
        'dark-pink': '#8E2B72',
        'text-dark': '#1C1C1C',
        
        // Override default Tailwind colors as needed
        neutral: {
          50: '#F9FCFF',  // Off White instead of default light gray
          900: '#1C1C1C', // Dark text color
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries')
  ],
}; 