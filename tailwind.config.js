/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html",  // Django templates
    "./static/js/**/*.js",    // JavaScript files if any
    "./static/css/**/*.css",],
  theme: {
    extend: {
      colors: {
        'background': '#eff2f9',
        'container': '#fffefe',
        'primary-text': '#3b3b3b',
        'input-box': '#eff2f9',
      },
      fontFamily: {
        lato: ["Lato", 'serif'],
      },
    },
  },
  plugins: [],
}

