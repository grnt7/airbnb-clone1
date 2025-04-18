/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // If using src directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


  /*
px-4 py-2 border 
        rounded-full 
        cursor-pointer hover:shadow-lg 
        active:scale-95
         active:bg-gray-100
         transition transform duration-100 
         ease-out

  */