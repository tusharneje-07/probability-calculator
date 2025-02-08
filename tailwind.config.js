/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html",  // Django templates
    "./static/js/**/*.js",    // JavaScript files if any
    "./static/css/**/*.css",],
  theme: {
    extend: {},
  },
  plugins: [],
}

