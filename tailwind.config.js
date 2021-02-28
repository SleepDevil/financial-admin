module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        "1/2": "50%"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
