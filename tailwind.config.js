/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#FF5000'
      },
      backgroundColor: {
        'main-color': '#FF5000',
        'banner-bg-color': '#EAE8EB'
      }
    }
  },
  plugins: []
}
