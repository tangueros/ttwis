module.exports = {
  content: [
    "./docs/**/*.{vue,md}",
    "./vue/**/*.{vue,md}",
    "./.vitepress/theme/**/*.{vue,js}",
  ],
  plugins: [
    require('daisyui'),
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {},
}
