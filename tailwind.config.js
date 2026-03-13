/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Add paths to all of your project files (HTML, JS, JSX, TSX, etc.)
    './**/*.{html,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      // 1. COLORS
      colors: {
        // Primary / Accent Colors
        'primary': '#00FF66',
        'primary-btn': '#00FF66',
        'primary-hover': '#f05c17', // Mapped from --primary-btn-hover
        'third': '#16a085',
        'red': '#F74032',
        
        // Backgrounds & Surfaces
        'body-bg': '#101010', // Mapped from --body-bg-color, --black
        'sidebar-bg': '#1E1E1E',
        'table-bg': '#1E1E1E',
        'header-bg': '#252525',
        'grey': '#313131',
        'light-grey': '#2C2C2C',
        'border': '#454545', // Mapped from --border-color
        
        // Text Colors
        'text-base': '#f1f1f1', // Mapped from --text-color
        'body-text': '#fff',    // Mapped from --body-text-color, --white

        // Secondary Button Colors
        'secondary-btn': '#3c3c3c',
        'secondary-hover': '#f05c17', // Mapped from --secondary-btn-hover
      },
      
      // 2. TYPOGRAPHY (Fonts)
      fontFamily: {
        'manrope': ['"Manrope"', 'sans-serif'], // Mapped from --first-font
        'inter': ['"Inter"', 'sans-serif'],     // Mapped from --second-font (default)
      },

      // 3. TYPOGRAPHY (Font Sizes - Mapping H1-H6)
      fontSize: {
        // Example use: text-h1
        'h1': ['64px', { lineHeight: '1.3', fontWeight: '500' }],
        'h2': ['42px', { lineHeight: '1.3', fontWeight: '500' }],
        'h3': ['30px', { lineHeight: '1.3', fontWeight: '500' }],
        'h4': ['26px', { lineHeight: '1.3', fontWeight: '500' }],
        'h5': ['22px', { lineHeight: '1.3', fontWeight: '500' }],
        'h6': ['18px', { lineHeight: '1.3', fontWeight: '500' }],
        'common': ['16px', { lineHeight: '1.3', fontWeight: '400' }], // Mapped from --common-text
      },
    },
  },
  plugins: [],
}
