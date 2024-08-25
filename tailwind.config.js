/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    'node_modules/preline/dist/*.js',
    './node_modules/vue-tailwind-wysiwyg-editor/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
}

