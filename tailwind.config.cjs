/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        principal: {
          100: '#cd550034',
          200: '#cd550051',
          300: '#cd550068',
          400: '#cd550085',
          500: '#cd5500a2',
          600: '#cd5500b9',
          700: '#cd5500c6',
          800: '#cd5500d3',
          900: '#cd5500ff',
          DEFAULT: '#cd5500'
        },
        'principal-dark': '#ff6900'
      },
      fontSize: {
        xxs: '.625rem'
      },
      fontFamily: {
        body: ['Archivo', 'system-ui', 'sans-serif'],
        title: ['Archivo Black', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
