/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.css",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./stacks/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#FFFFFF",
        text: "#000000",
        accent: "#D1E4FF",
        background: "#F5F5F5",
        jetblack: "#2C2C2E",
        midnightblue: "#003366",
        lightgrey: "#D3D3D3",
        darkgrey: "#808080",
        error: "#D0021B",
        success: "#28A745"
      },

      fontFamily: {
        poppins_bold: ['Poppins-Bold'],
        poppins_extra_bold: ['Poppins-ExtraBold'],
        poppins_regular: ['Poppins-Regular'],
        poppins_italic: ['Poppins-Italic'],
        poppins_bold_italic: ['Poppins-BoldItalic'],
        sfpro_black_italic: ['SFPRODISPLAYBLACKITALIC'],
        sfpro_bold: ['SFPRODISPLAYBOLD'],
        sfpro_heavy_italic: ['SFPRODISPLAYHEAVYITALIC'],
        sfpro_light_italic: ['SFPRODISPLAYLIGHTITALIC'],
        sfpro_medium: ['SFPRODISPLAYMEDIUM'],
        sfpro_regular: ['SFPRODISPLAYREGULAR'],
        sfpro_semi_bold_italic: ['SFPRODISPLAYSEMIBOLDITALIC'],
        sfpro_thin_italic: ['SFPRODISPLAYTHINITALIC'],
        sfpro_ultra_light_italic: ['SFPRODISPLAYULTRALIGHTITALIC']
      }
    },
  },
  plugins: [],
}