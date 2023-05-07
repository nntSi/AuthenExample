/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'labtop': '1600px',
      },
      colors: {
        'blue-deep': '#063049',
        'mint-low-green': '#E7FFF7',
        'mint': '#44EDC7',
        'gray-doc': '#EBEBEB',
        'yellow-ped': '#F7C03D',
        'azur-l': '#7F7FD5',
        'azur-m' : '#86A8E7',
        'azur-r': '#91EAE4',
        'dusk-l': '#FF5F6D',
        'dusk-r': '#FFC371',
        'deep-blue-700': '#1D435A'
      }
    },
  },
  plugins: [],
}

