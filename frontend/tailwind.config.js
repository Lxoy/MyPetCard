/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./screens/**/*.{js,jsx,ts,tsx}", "./styles/**/*.css"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          primary: "#3F72AF",   // A strong blue shade
          secondary: "#112D4E", // A deep navy blue
          accent: "#DBE2EF",    // A light grayish-blue
          background: "#F9F7F7" // A soft off-white
        },

        fontFamily: {
          poppins_bold: ['Poppins-Bold'],
          poppins_extra_bold: ['Poppins-ExtraBold'],
          poppins_regular: ['Poppins-Regular'],
          poppins_italic:['Poppins-Italic'],
          poppins_bold_italic:['Poppins-BoldItalic']
        }
      },
    },
    plugins: [],
}