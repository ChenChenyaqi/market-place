/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#496FF2'
      },
      backgroundColor: {
        'main-color': '#496FF2',
        'banner-bg-color': '#EAE8EB'
      },
      width: {
        'phone-w': '49%'
      }
    }
  },
  plugins: []
}
