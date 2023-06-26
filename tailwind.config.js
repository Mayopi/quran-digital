/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        primary: {
          100: "#EDE9F8",
          200: "#DDD3F1",
          300: "#CBBDEA",
          400: "#A987DD",
          500: "#8E5DD0",
          600: "#7C4DB8",
          700: "#6A3C9F",
          800: "#582C87",
          900: "#461C6E",
        },
        secondary: {
          100: "#E4F6F8",
          200: "#C9EDF1",
          300: "#ADE4EA",
          400: "#84D3DD",
          500: "#5BC3D0",
          600: "#52AEB8",
          700: "#46999F",
          800: "#3B8487",
          900: "#2F6F6E",
        },
        accent: {
          100: "#F7EBE9",
          200: "#EFD6D3",
          300: "#E7C0BD",
          400: "#D4988F",
          500: "#CB6F61",
          600: "#B86157",
          700: "#9D514B",
          800: "#84413F",
          900: "#6A3133",
        },
      },

      container: {
        padding: "3.5rem",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: true, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
