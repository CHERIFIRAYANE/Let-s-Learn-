/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",
  'node_modules/flowbite-react/lib/esm/**/*.js',],
  theme: {
    extend: { 
      colors: {
        custom: '#1cc5b4',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['hover'],
      backgroundColor: ['hover'],
      textColor: ['hover'],
    },
  },
  plugins: [require('flowbite/plugin')],
}

